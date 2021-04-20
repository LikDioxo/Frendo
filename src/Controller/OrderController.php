<?php

namespace App\Controller;

use App\Entity\Order;
use App\Repository\ChoiceRepository;
use App\Repository\OrderRepository;
use App\Repository\PizzeriaRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\ORMException;
use ErrorException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\JsonException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Domain\OrderStatus;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class OrderController extends AbstractController
{

    public function create(
        Request $request,
        PizzeriaRepository $pizzeriaRepository,
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
                JsonResponse::HTTP_BAD_REQUEST
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
                JsonResponse::HTTP_BAD_REQUEST
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

        return new JsonResponse();
    }

    public function getAll(
        Request $request,
        OrderRepository $orderRepository,
        ChoiceRepository $choiceRepository,
        SerializerInterface $serializer
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

        return new JsonResponse(
            $result,
            JsonResponse::HTTP_OK
        );
    }

    public function getStatuses(): JsonResponse
    {
        return new JsonResponse(
            OrderStatus::getAllStatuses(),
            JsonResponse::HTTP_OK
        );
    }
}
