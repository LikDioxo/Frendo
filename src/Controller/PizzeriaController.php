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
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
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
            $pizzerias = $pizzeriaRepository->findBy($requestQuery);
        }
        catch (ORMException $exception)
        {
            return new JsonResponse(
                ['message' => $exception->getMessage()],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }
        $result = [];

        foreach ($pizzerias as $pizzeria)
        {
            $serializedPizzeria = $serializer->normalize(
                $pizzeria,
                context: [AbstractNormalizer::ATTRIBUTES => ['id', 'address', 'operator' => ['id']]]
            );

            $serializedPizzeria['operator_id'] = $serializedPizzeria['operator']['id'];
            unset($serializedPizzeria['operator']);

            $orders = $orderRepository->getActiveOrders($serializedPizzeria['id']);
            $serializedPizzeria['workload'] = sizeof($orders);

            $result[] = $serializedPizzeria;
        }

        return new JsonResponse($result);
    }

    public function delete(
        $pizzeriaId,
        PizzeriaRepository $pizzeriaRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse
    {
        $pizzeria = $pizzeriaRepository->find($pizzeriaId);

        if ($pizzeria === null) {
            return new JsonResponse(
                ['message' => "Pizzeria with id: $pizzeriaId does not exists!"],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        $entityManager->remove($pizzeria);
        $entityManager->flush();
        return new JsonResponse(status: JsonResponse::HTTP_NO_CONTENT);
    }

    public function update(
        Request $request,
        $pizzeriaId,
        PizzeriaRepository $pizzeriaRepository,
        ClientRepository $clientRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse
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

        $newAddress = array_key_exists('address', $data) ? $data['address'] : null;
        $newOperatorId = array_key_exists('operator_id', $data) ? $data['operator_id'] : null;

        if ($newAddress !== null) {
            $pizzeria->setAddress($newAddress);
        }

        if ($newOperatorId !== null) {
            $operator = $clientRepository->find($newOperatorId);

            if ($operator === null) {
                return new JsonResponse(
                    ['message' => "User with id: $newOperatorId does not exists!"],
                    JsonResponse::HTTP_NOT_FOUND
                );
            }

            if (!in_array("ROLE_OPERATOR", $operator->getRoles())) {
                return new JsonResponse(
                    ['message' => "User with id: $newOperatorId is not operator!"],
                    JsonResponse::HTTP_NOT_FOUND
                );
            }

            if ($pizzeriaRepository->findOneBy(['operator' => $operator]) !== null) {
                return new JsonResponse(
                    ['message' => "Operator with id: $newOperatorId has already connected to another pizzeria!"],
                    JsonResponse::HTTP_BAD_REQUEST
                );
            }

            $pizzeria->setOperator($operator);
        }

        $entityManager->persist($pizzeria);
        $entityManager->flush();
        return new JsonResponse(status: JsonResponse::HTTP_NO_CONTENT);
    }

    public function getWorkload(
        Request $request,
        $id,
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

        $orders = $orderRepository->getActiveOrders($id);

        return new JsonResponse(['workload' => sizeof($orders)]);
    }

    public function getAvailablePizzas(
        $id,
        NormalizerInterface $normalizer,
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

        $pizzeriaPizzas = $pizzeriaPizzaRepository->findBy(['pizzeria' => $pizzeria, 'is_available' => true]);
        $result = [];

        foreach ($pizzeriaPizzas as $pizzeriaPizza)
        {
            $pizzaId = $normalizer->normalize(
                $pizzeriaPizza,
                context: [AbstractNormalizer::ATTRIBUTES => ['pizza'=> ['id']]]
            )['pizza']['id'];

            $pizza = $pizzaRepository->find($pizzaId);

            $normalizedPizza = $normalizer->normalize($pizza);

            unset($normalizedPizza['__initializer__']);
            unset($normalizedPizza['__cloner__']);
            unset($normalizedPizza['__is_initialized__']);

            $normalizedPizza['ingredients'] = [];
            $normalizedPizza['price'] = floatval($normalizedPizza['price'] );

            $pizzaIngredients = $pizzaIngredientRepository->findBy(['pizza' => $pizza->getId()]);

            foreach ($pizzaIngredients as $pizzaIngredient) {
                $serializedIngredient = $normalizer->normalize(
                    $pizzaIngredient,
                    context: [AbstractNormalizer::ATTRIBUTES => ['ingredient' => ['id'], 'status']]
                );

                $ingredient = $ingredientRepository->find($serializedIngredient['ingredient']['id']);

                $ingredientName = $normalizer->normalize(
                    $ingredient,
                    context: [AbstractNormalizer::ATTRIBUTES => ['id', 'name', 'price']]
                );

                $normalizedPizza['ingredients'][] = array_merge(
                    ['status' => $serializedIngredient['status']],
                    $ingredientName
                );
            }

            $result[] = $normalizedPizza;
        }

        return new JsonResponse($result);
    }

    public function getPizzeriaByOperator(
        $operatorId,
        ClientRepository $clientRepository,
        PizzeriaRepository $pizzeriaRepository,
        OrderRepository $orderRepository,
        NormalizerInterface $normalizer
    ): JsonResponse
    {
        $user = $clientRepository->find($operatorId);
        if ($user === null) {
            return new JsonResponse(
                ['message' => "User with id: $operatorId does not exists!"],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        if (!in_array("ROLE_OPERATOR", $user->getRoles())) {
            return new JsonResponse(
                ['message' => "User with id: $operatorId is not operator!"],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        $pizzeria = $pizzeriaRepository->findOneBy(['operator' => $user]);
        $normalizedPizzeria = $normalizer->normalize(
            $pizzeria,
            context: [AbstractNormalizer::ATTRIBUTES => ['id', 'address']]
        );

        $related_orders = $orderRepository->getActiveOrders($normalizedPizzeria['id']);
        $normalizedPizzeria['workload'] = sizeof($related_orders);

        return new JsonResponse($normalizedPizzeria);
    }

    public function changePizzeriaPizzaStatus(
        Request $request,
        $operatorId,
        $pizzeriaPizzaId,
        PizzeriaPizzaRepository $pizzeriaPizzaRepository,
        EntityManagerInterface $entityManager,
        ClientRepository $clientRepository,
        PizzeriaRepository $pizzeriaRepository
    ): Response
    {
        $operator = $clientRepository->find($operatorId);
        if ($operator === null) {
            return new JsonResponse(
                ['message' => "User with id: $operatorId does not exists!"]
            );
        }

        if (!in_array("ROLE_OPERATOR", $operator->getRoles())) {
            return new JsonResponse(
                ['message' => "User with id: $operatorId is not operator!"],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        $pizzeria = $pizzeriaRepository->findOneBy(['operator' => $operator]);

        if ($pizzeria === null) {
            return new JsonResponse(
                ['message' => "Pizzeria with operator (id): $operatorId does not exists!"],
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
            $isAvailable = $data['is_available'];
        }
        catch (ErrorException) {
            return new JsonResponse(
                ['message' => 'Request body not provide some of this parameters: is_available!'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $pizzeriaPizza = $pizzeriaPizzaRepository->find($pizzeriaPizzaId);
        if ($pizzeriaPizza === null)
        {
            return new JsonResponse(
                ['message' => "PizzeriaPizza with id: $pizzeriaPizza does not exists!"],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        if ($pizzeriaPizza->getPizzeria() !== $pizzeria) {
            return new JsonResponse(
                ['message' => "Pizza with id: $pizzeriaPizzaId does not relate to pizzeria with operator (id): $operatorId"],
                JsonResponse::HTTP_FORBIDDEN
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

    public function filterAvailablePizzas(
        Request $request,
        $pizzeriaId,
        IngredientRepository $ingredientRepository,
        PizzaRepository $pizzaRepository,
        PizzeriaPizzaRepository $pizzeriaPizzaRepository,
        PizzaIngredientRepository $pizzaIngredientRepository,
        PizzeriaRepository $pizzeriaRepository,
        SerializerInterface $serializer
    ): JsonResponse
    {
        $ingredients = $request->query->get("ingredients");
        $pizzeria = $pizzeriaRepository->find($pizzeriaId);
        $result = [];

        $pizzeriaPizzas = $pizzeriaPizzaRepository->findBy(['pizzeria' => $pizzeria, 'is_available' => true]);

        foreach ($pizzeriaPizzas as $pizzeriaPizza) {
            $ingredientIds = [];

            $pizzaId = $serializer->normalize(
                $pizzeriaPizza,
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
                $ingredientIds[] = $serializedIngredient['ingredient']['id'];

                $ingredient = $ingredientRepository->find($serializedIngredient['ingredient']['id']);

                $ingredientName = $serializer->normalize(
                    $ingredient,
                    context: [AbstractNormalizer::ATTRIBUTES => ['id', 'name', 'price']]
                );

                $normalizedPizza['ingredients'][] = array_merge(
                    ['status' => $serializedIngredient['status']],
                    $ingredientName
                );
            }

            $isAll = true;
            foreach ($ingredients as $ingredientId) {
                if (!in_array($ingredientId, $ingredientIds)) {
                    $isAll = false;
                    break;
                }
            }

            if ($isAll) {
                $result[] = $normalizedPizza;
            }
        }

        return new JsonResponse($result);
    }

    public function searchAvailablePizzas(
        Request $request,
        $pizzeriaId,
        PizzaRepository $pizzaRepository,
        PizzeriaRepository $pizzeriaRepository,
        PizzeriaPizzaRepository $pizzeriaPizzaRepository,
        IngredientRepository $ingredientRepository,
        NormalizerInterface $normalizer,
        PizzaIngredientRepository $pizzaIngredientRepository
    ): JsonResponse
    {
        $name = $request->query->get('name');
        if ($name === null) {
            return new JsonResponse(
                ['message' => 'Request not provide parameter: name!'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $pizzeria = $pizzeriaRepository->find($pizzeriaId);
        if ($pizzeria === null) {
            return new JsonResponse(
                ['message' => "Pizzeria with id: $pizzeriaId does not exists!"],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        $name = mb_strtoupper(mb_substr($name, 0, 1)) . mb_strtolower(mb_substr($name, 1));
        $result = [];

        $matchedPizzas = $pizzaRepository->partialNameMatch($name);
        $pizzas = [];

        foreach ($matchedPizzas as $pizza) {
            $pizzeriaPizza = $pizzeriaPizzaRepository->findOneBy(
                ['pizzeria' => $pizzeria, 'pizza' => $pizza]
            );
            if ($pizzeriaPizza->getIsAvailable()) {
                $pizzas[] = $pizza;
            }
        }

        foreach ($pizzas as $pizza) {
            $normalizedPizza = $normalizer->normalize($pizza);

            unset($normalizedPizza['__initializer__']);
            unset($normalizedPizza['__cloner__']);
            unset($normalizedPizza['__is_initialized__']);

            $normalizedPizza['ingredients'] = [];

            $pizzaIngredients = $pizzaIngredientRepository->findBy(['pizza' => $pizza->getId()]);

            foreach ($pizzaIngredients as $pizzaIngredient) {
                $serializedIngredient = $normalizer->normalize(
                    $pizzaIngredient,
                    context: [AbstractNormalizer::ATTRIBUTES => ['ingredient' => ['id'], 'status']]
                );

                $ingredient = $ingredientRepository->find($serializedIngredient['ingredient']['id']);

                $ingredientName = $normalizer->normalize(
                    $ingredient,
                    context: [AbstractNormalizer::ATTRIBUTES => ['id', 'name', 'price']]
                );

                $normalizedPizza['ingredients'][] = array_merge(
                    ['status' => $serializedIngredient['status']],
                    $ingredientName
                );
            }

            $result[] = $normalizedPizza;
        }

        return new JsonResponse($result);
    }

    public function searchPizzerias(
        Request $request,
        NormalizerInterface $normalizer,
        PizzeriaRepository $pizzeriaRepository,
        OrderRepository $orderRepository
    ): JsonResponse
    {
        $address = $request->query->get('address');
        $address = mb_strtoupper(mb_substr($address, 0, 1)) . mb_substr($address, 1);

        $pizzerias = $pizzeriaRepository->partialAddressMatch($address);

        $result = [];

        foreach ($pizzerias as $pizzeria)
        {
            $serializedPizzeria = $normalizer->normalize(
                $pizzeria,
                context: [AbstractNormalizer::ATTRIBUTES => ['id', 'address', 'operator' => ['id']]]
            );

            $serializedPizzeria['operator_id'] = $serializedPizzeria['operator']['id'];
            unset($serializedPizzeria['operator']);

            $orders = $orderRepository->getActiveOrders($serializedPizzeria['id']);
            $serializedPizzeria['workload'] = sizeof($orders);

            $result[] = $serializedPizzeria;
        }

        return new JsonResponse($result);
    }

    public function getPizzeriaPizzasByOperator(
        $operatorId,
        ClientRepository $clientRepository,
        PizzeriaRepository $pizzeriaRepository,
        PizzeriaPizzaRepository $pizzeriaPizzaRepository,
    ): JsonResponse
    {
        $operator = $clientRepository->find($operatorId);
        if ($operator === null) {
            return new JsonResponse(
                ['message' => "User with id: $operatorId does not exists!"]
            );
        }

        if (!in_array("ROLE_OPERATOR", $operator->getRoles())) {
            return new JsonResponse(
                ['message' => "User with id: $operatorId is not operator!"],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        $pizzeria = $pizzeriaRepository->findOneBy(['operator' => $operator]);

        if ($pizzeria === null) {
            return new JsonResponse(
                ['message' => "Pizzeria with operator (id): $operatorId does not exists!"],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        $pizzeriaPizzas = $pizzeriaPizzaRepository->findBy(['pizzeria' => $pizzeria]);
        $result = [];

        foreach ($pizzeriaPizzas as $pizzeriaPizza) {
            $normalizedPizzeriaPizza['id'] = $pizzeriaPizza->getId();
            $normalizedPizzeriaPizza['pizza_name'] = $pizzeriaPizza->getPizza()->getName();
            $normalizedPizzeriaPizza['is_available'] = $pizzeriaPizza->getIsAvailable();
            $result[] = $normalizedPizzeriaPizza;
        }

        return new JsonResponse($result);
    }

}
