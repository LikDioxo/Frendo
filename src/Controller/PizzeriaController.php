<?php

namespace App\Controller;

use App\Entity\Pizzeria;
use App\Entity\PizzeriaPizza;
use App\Repository\ClientRepository;
use App\Repository\IngredientRepository;
use App\Repository\OrderRepository;
use App\Repository\PizzaIngredientRepository;
use App\Repository\PizzaRepository;
use App\Repository\PizzeriaPizzaRepository;
use App\Repository\PizzeriaRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\ORMException;
use ErrorException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\JsonException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class PizzeriaController extends AbstractController
{

    public function create(
        Request $request,
        ClientRepository $clientRepository,
        PizzeriaRepository $pizzeriaRepository,
        PizzaRepository $pizzaRepository,
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
            $address = $data['address'];
            $operatorId = $data['operator_id'];
        }
        catch (ErrorException) {
            return new JsonResponse(
                ['message' => 'Request body not provide some of this parameters: address, operator_id !'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $pizzeria = $pizzeriaRepository->findOneBy(['address' => $address]);
        if ($pizzeria !== null)
        {
            return new JsonResponse(
                ['message' => "Pizzeria with address: $address already exists!"],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $pizzeria = $pizzeriaRepository->findOneBy(['operator' => $operatorId]);
        if ($pizzeria !== null)
        {
            return new JsonResponse(
                ['message' => "Pizzeria with operator: $operatorId already exists!"],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $operator = $clientRepository->findOneBy(['id' => $operatorId]);
        if ($operator === null)
        {
            return new JsonResponse(
                ['message' => "Operator with id: $operatorId does not exists!"],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        $newPizzeria = new Pizzeria($address, $operator);

        $pizzas = $pizzaRepository->findAll();

        foreach ($pizzas as $pizza)
        {
            $pizzeriaPizza = new PizzeriaPizza($newPizzeria, $pizza, true);
            $entityManager->persist($pizzeriaPizza);
        }

        $entityManager->persist($newPizzeria);
        $entityManager->flush();

        return new JsonResponse(
            ['id' => $newPizzeria->getId()],
            JsonResponse::HTTP_CREATED
        );
    }

    public function getAll(
        Request $request,
        PizzeriaRepository $pizzeriaRepository,
        OrderRepository $orderRepository,
        SerializerInterface $serializer
    ): JsonResponse
    {
        $requestQuery = $request->query->all();

        try {
            $objects = $pizzeriaRepository->findBy($requestQuery);
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
            $serializedPizzeria = $serializer->normalize(
                $object,
                context: [AbstractNormalizer::ATTRIBUTES => ['id', 'address', 'operator' => ['id']]]
            );

            $serializedPizzeria['operator_id'] = $serializedPizzeria['operator']['id'];
            unset($serializedPizzeria['operator']);

            $orders = $orderRepository->getRelatedOrders($serializedPizzeria['id']);
            $serializedPizzeria['workload'] = sizeof($orders);

            $result[] = $serializedPizzeria;
        }

        return new JsonResponse($result);
    }

    public function getWorkload(
        Request $request,
        int $id,
        PizzeriaRepository $pizzeriaRepository,
        OrderRepository $orderRepository
    ): JsonResponse
    {
        $pizzeria = $pizzeriaRepository->find($id);

        if ($pizzeria === null) {
            return new JsonResponse(
                ['message' => "Pizzeria with id: $id does not exists!"],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        $orders = $orderRepository->getRelatedOrders($id);

        return new JsonResponse(['workload' => sizeof($orders)]);
    }

    public function getAvailablePizzas(
        Request $request,
        $id,
        SerializerInterface $serializer,
        IngredientRepository $ingredientRepository,
        PizzaRepository $pizzaRepository,
        PizzeriaRepository $pizzeriaRepository,
        PizzeriaPizzaRepository $pizzeriaPizzaRepository,
        PizzaIngredientRepository $pizzaIngredientRepository
    ): JsonResponse
    {

        $pizzeria = $pizzeriaRepository->find($id);
        if ($pizzeria === null)
        {
            return new JsonResponse(
                ['message' => "Pizzeria with id: $id does not exists!"],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        $objects = $pizzeriaPizzaRepository->findBy(['pizzeria' => $pizzeria, 'is_available' => true]);
        $result = [];

        foreach ($objects as $object)
        {
            $pizzaId = $serializer->normalize(
                $object,
                context: [AbstractNormalizer::ATTRIBUTES => ['pizza'=> ['id']]]
            )['pizza']['id'];

            $pizza = $pizzaRepository->find($pizzaId);

            $normalizedPizza = $serializer->normalize($pizza);

            unset($normalizedPizza['__initializer__']);
            unset($normalizedPizza['__cloner__']);
            unset($normalizedPizza['__is_initialized__']);

            $normalizedPizza['ingredients'] = [];

            $pizzaIngredients = $pizzaIngredientRepository->findBy(['pizza' => $pizza->getId()]);

            foreach ($pizzaIngredients as $pizzaIngredient) {
                $serializedIngredient = $serializer->normalize(
                    $pizzaIngredient,
                    context: [AbstractNormalizer::ATTRIBUTES => ['ingredient' => ['id'], 'status']]
                );

                $ingredient = $ingredientRepository->find($serializedIngredient['ingredient']['id']);

                $ingredientName = $serializer->normalize(
                    $ingredient,
                    context: [AbstractNormalizer::ATTRIBUTES => ['id', 'name']]
                );

                $normalizedPizza['ingredients'][] = [
                    'ingredient' => $ingredientName,
                    'status' => $serializedIngredient['status']
                ];
            }

            $result[] = $normalizedPizza;
        }

        return new JsonResponse($result);
    }

    public function changePizzeriaPizzaStatus(
        Request $request,
        PizzeriaPizzaRepository $pizzeriaPizzaRepository,
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
            $pizzeriaPizzaId = $data['pizzeria_pizza_id'];
            $isAvailable = $data['is_available'];
        }
        catch (ErrorException) {
            return new JsonResponse(
                ['message' => 'Request body not provide some of this parameters: pizzeria_pizza_id, is_available!'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $pizzeriaPizza = $pizzeriaPizzaRepository->findOneBy(['id' => $pizzeriaPizzaId]);
        if ($pizzeriaPizza === null)
        {
            return new JsonResponse(
                ['message' => "PizzeriaPizza with id: $pizzeriaPizza does not exists!"],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        if (!is_bool($isAvailable))
        {
            return new JsonResponse(
                ['message' => "is_available must be a boolean!"],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $pizzeriaPizza->setIsAvailable($isAvailable);

        $entityManager->persist($pizzeriaPizza);
        $entityManager->flush();

        return new Response();
    }
}
