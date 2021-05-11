<?php

namespace App\Controller;

use App\Domain\IngredientStatus;
use App\Entity\Choice;
use App\Entity\ChoiceEvent;
use App\Entity\Order;
use App\Repository\ChoiceEventRepository;
use App\Repository\ChoiceRepository;
use App\Repository\IngredientRepository;
use App\Repository\OrderRepository;
use App\Repository\PizzaIngredientRepository;
use App\Repository\PizzaRepository;
use App\Repository\PizzeriaPizzaRepository;
use App\Repository\PizzeriaRepository;
use App\Service\ChoiceEventFilter;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\ORMException;
use ErrorException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\JsonException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Domain\OrderStatus;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class OrderController extends AbstractController
{

    public function create(
        Request $request,
        PizzeriaRepository $pizzeriaRepository,
        ChoiceRepository $choiceRepository,
        ChoiceEventRepository $choiceEventRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse
    {
        try {
            $data = $request->toArray();
        }
        catch (JsonException $exception) {
            return new JsonResponse(
                ['message' => $exception->getMessage()],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        try {
            $customersPhoneNumber = $data['customers_phone_number'];
            $deliveryAddress = $data['delivery_address'];
            $totalPrice = $data['total_price'];
            $pizzeriaId = $data['pizzeria_id'];
        }
        catch (ErrorException) {
            return new JsonResponse(
                ['message' => 'Request body not provide some of this parameters:
                 customers_phone_number, delivery_address, total_price, pizzeria_id!'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        if (!preg_match("/^\+\d{12}/", $customersPhoneNumber))
        {
            return new JsonResponse(
                ['message' => 'Invalid phone number!'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $pizzeria = $pizzeriaRepository->findOneBy(['id' => $pizzeriaId]);
        if ($pizzeria === null)
        {
            return new JsonResponse(
                ['message' => "Pizzeria with id: $pizzeriaId does not exists!"],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        $newOrder = new Order($customersPhoneNumber, $deliveryAddress, $totalPrice, $pizzeria, OrderStatus::CREATED);

        $entityManager->persist($newOrder);
        $entityManager->flush();

        return new JsonResponse(
            ['id' => $newOrder->getId()],
            JsonResponse::HTTP_CREATED
        );
    }

    public function updateStatus(
        Request $request,
        OrderRepository $orderRepository,
        EntityManagerInterface $entityManager
    ): Response
    {
        try {
            $data = $request->toArray();
        }
        catch (JsonException $exception) {
            return new JsonResponse(
                ['message' => $exception->getMessage()],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        try {
            $orderId = $data['order_id'];
            $status = $data['status'];
        }
        catch (ErrorException) {
            return new JsonResponse(
                ['message' => 'Request body not provide some of this parameters: order_id, status!'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $order = $orderRepository->findOneBy(['id' => $orderId]);
        if ($order === null)
        {
            return new JsonResponse(
                ['message' => "Order with id: $orderId does not exists!"],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        if (OrderStatus::isStatus($status))
        {
            return new JsonResponse(
                ['message' => "Invalid status: $status!"],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $order->setStatus($status);

        $entityManager->persist($order);
        $entityManager->flush();

        return new Response();
    }

    public function getAll(
        Request $request,
        OrderRepository $orderRepository,
        ChoiceRepository $choiceRepository,
        NormalizerInterface $serializer
    ): JsonResponse
    {
        $requestQuery = $request->query->all();

        try {
            $objects = $orderRepository->findBy($requestQuery);
        }
        catch (ORMException $exception)
        {
            return new JsonResponse(
                ['message' => $exception->getMessage()],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }
        $result = [];

        foreach ($objects as $object)
        {
            $serializedOrder = $serializer->normalize(
                $object,
                context: [AbstractNormalizer::ATTRIBUTES => [
                    'id',
                    'customersPhoneNumber',
                    'deliveryAddress',
                    'totalPrice',
                    'pizzeria' => ['id']
                ]]
            );

            $serializedOrder['pizzeria_id'] = $serializedOrder['pizzeria']['id'];
            unset($serializedOrder['pizzeria']);

            $serializedOrder['choices'] = [];

            $orderChoices = $choiceRepository->findBy(['order' => $object->getId()]);
            foreach ($orderChoices as $choice)
            {
                $serializedChoice = $serializer->normalize(
                    $choice,
                    context: [AbstractNormalizer::ATTRIBUTES => ['id']]
                );

                $serializedOrder['choices'][] = $serializedChoice;
            }

            $result[] = $serializedOrder;
        }

        return new JsonResponse($result);
    }

    public function getQueuePosition(
        Request $request,
        $pizzeriaId,
        OrderRepository $orderRepository
    ): JsonResponse
    {
        $phoneNumber = $request->get('phone_number');

        if ($phoneNumber === null)
        {
            return new JsonResponse(
                ['message' => "Request not provide parameter: phone_number!"],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $targetOrder = $orderRepository->findOneBy(['customersPhoneNumber' => $phoneNumber]);
        if ($targetOrder === null) {
            return new JsonResponse(
                ['message' => "Order with customer's phone number: $phoneNumber does not exists!"],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $orders = $orderRepository->getRelatedOrders($pizzeriaId);
        $position = 0;

        foreach ($orders as $order) {
            $position += 1;

            if ($targetOrder->getCustomersPhoneNumber() === $phoneNumber) {
                return new JsonResponse(['order_position' => $position]);
            }
        }

        return new JsonResponse(['order_position' => $position]);
    }

    public function getStatuses(): JsonResponse
    {
        return new JsonResponse(OrderStatus::getAllStatuses());
    }

    public function getPizzeriaOrders(
        $pizzeriaId,
        ChoiceEventFilter $eventFilter,
        NormalizerInterface $normalizer,
        PizzeriaRepository $pizzeriaRepository,
        OrderRepository $orderRepository,
        ChoiceRepository $choiceRepository,
        ChoiceEventRepository $choiceEventRepository
    ): JsonResponse
    {
        $pizzeria = $pizzeriaRepository->find($pizzeriaId);
        if ($pizzeria === null) {
            return new JsonResponse(
                ['message' => "Pizzeria with id: $pizzeriaId does not exists!"],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        $orders = $orderRepository->findBy(['pizzeria' => $pizzeria]);

        $result = [];
        foreach ($orders as $order) {

            $normalizedOrder = $normalizer->normalize(
                $order,
                context: ['ignored_attributes' => ['pizzeria']]
            );

            $choices = $choiceRepository->findBy(['order' => $order]);
            foreach ($choices as $choice) {

                $normalizedChoice = $normalizer->normalize(
                    $choice,
                    context: ['attributes' => ['pizza' => ['name']]]
                );

                $choiceEvents = $choiceEventRepository->findBy(['choice' => $choice]);
                $filteredEvents = $eventFilter->filter($choiceEvents);

                foreach ($filteredEvents as $event) {
                    $normalizedEvent = $normalizer->normalize(
                        $event
                    );


                    $normalizedChoice['pizza']['events'][] = [
                        'ingredient' =>$normalizedEvent['ingredient']['name'],
                        'is_enabled' => $normalizedEvent['is_enabled']
                    ];

                }

                $normalizedOrder['choices'][] = $normalizedChoice['pizza'];
            }

            $result[] = $normalizedOrder;
        }

        return new JsonResponse($result);
    }

    public function makeOrder(
        Request $request,
        $pizzeriaId,
        PizzeriaRepository $pizzeriaRepository,
        PizzeriaPizzaRepository $pizzeriaPizzaRepository,
        PizzaRepository $pizzaRepository,
        IngredientRepository $ingredientRepository,
        PizzaIngredientRepository $pizzaIngredientRepository,
        EntityManagerInterface $entityManager
    ):
    JsonResponse
    {
        $pizzeria = $pizzeriaRepository->find($pizzeriaId);
        if ($pizzeria === null) {
            return new JsonResponse(
                ['message' => "Pizzeria with id: $pizzeriaId does not exists!"],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        try {
            $data = $request->toArray();
        }
        catch (JsonException $exception) {
            return new JsonResponse(
                ['message' => $exception->getMessage()],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        try {
            $customersPhoneNumber = $data['customers_phone_number'];
            $deliveryAddress = $data['delivery_address'];
            $totalPrice = $data['total_price'];
            $choices = $data['choices'];
        }
        catch (ErrorException) {
            return new JsonResponse(
                ['message' => 'Request body not provide some of this parameters:
                 customers_phone_number, delivery_address, total_price, choices!'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        if (!preg_match("/^\+\d{12}/", $customersPhoneNumber))
        {
            return new JsonResponse(
                ['message' => 'Invalid phone number!'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $newOrder = new Order(
            $customersPhoneNumber,
            $deliveryAddress,
            $totalPrice,
            $pizzeria,
            OrderStatus::CREATED
        );
        $entityManager->persist($newOrder);

        foreach ($choices as $choice) {
            try {
                $pizzaId = $choice['pizza_id'];
                $quantity = $choice['quantity'];
                $events = $choice['events'];
            }
            catch (ErrorException) {
                return new JsonResponse(
                    ['message' => 'Request body choice not provide some of this parameters: pizza_id, quantity, events!'],
                    JsonResponse::HTTP_BAD_REQUEST
                );
            }

            $pizza = $pizzaRepository->find($pizzaId);
            if ($pizza === null) {
                return new JsonResponse(
                    ['message' => "Pizza with id: $pizzaId does not exists!"],
                    JsonResponse::HTTP_NOT_FOUND
                );
            }

            $pizzeriaPizza = $pizzeriaPizzaRepository->findOneBy(['pizzeria' => $pizzeria, 'pizza' => $pizza]);
            if (!$pizzeriaPizza->getIsAvailable()) {
                return new JsonResponse(
                    ['message' => "Can't order unavailable pizza with id: $pizzaId!"],
                    JsonResponse::HTTP_BAD_REQUEST
                );
            }

            $newChoice = new Choice($newOrder, $pizza, $quantity);
            $entityManager->persist($newChoice);

            foreach ($events as $event) {
                try {
                    $ingredientId = $event['ingredient_id'];
                    $isEnabled = $event['is_enabled'];
                    $creationTime = $event['creation_time'];
                }
                catch (ErrorException) {
                    return new JsonResponse(
                        ['message' => 'Request body event not provide some of this parameters: 
                        ingredient_id, is_enabled, creation_time!'],
                        JsonResponse::HTTP_BAD_REQUEST
                    );
                }

                $ingredient = $ingredientRepository->find($ingredientId);
                $pizzaIngredient = $pizzaIngredientRepository->findOneBy(
                    ['pizza' => $pizza, 'ingredient' => $ingredient]
                );

                if (IngredientStatus::REQUIRED == $pizzaIngredient->getStatus()) {
                    return new JsonResponse(
                        ['message' => "Can't create choice event for required ingredient with id: $ingredientId!"],
                        JsonResponse::HTTP_BAD_REQUEST
                    );
                }

                $newChoiceEvent = new ChoiceEvent(
                    $newChoice,
                    $ingredient,
                    $isEnabled,
                    DateTime::createFromFormat('Y-m-d G:i:s', $creationTime)
                );

                $entityManager->persist($newChoiceEvent);
            }
        }

        $entityManager->flush();

        return new JsonResponse(status: JsonResponse::HTTP_CREATED);
    }

}

