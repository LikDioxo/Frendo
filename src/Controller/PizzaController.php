<?php

namespace App\Controller;

use App\Domain\IngredientStatus;
use App\Entity\Pizza;
use App\Entity\PizzaIngredient;
use App\Entity\PizzeriaPizza;
use App\Repository\IngredientRepository;
use App\Repository\PizzaIngredientRepository;
use App\Repository\PizzaRepository;
use App\Repository\PizzeriaRepository;
use App\Service\FileUploader;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\ORMException;
use ErrorException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\JsonException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class PizzaController extends AbstractController
{
    public function create(
        Request $request,
        PizzaRepository $pizzaRepository,
        IngredientRepository $ingredientRepository,
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
            $name = $data['name'];
            $weight = $data['weight'];
            $size = $data['size'];
            $price = $data['price'];
            $ingredients = $data['ingredients'];
        }
        catch (ErrorException) {
            return new JsonResponse(
                ['message' => 'Request body not provide some of this parameters: 
                name, weight, size, price, ingredients!'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }



        $pizza = $pizzaRepository->findOneBy(['name' => $name]);
        if ($pizza !== null)
        {
            return new JsonResponse(
                ['message' => "Pizza with name: $name already exists!"],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $newPizza = new Pizza($name, $weight, $size, $price);
        $entityManager->persist($newPizza);

        foreach ($ingredients as $requestIngredient)
        {
            try {
                $ingredientId = $requestIngredient['id'];
                $ingredientStatus = $requestIngredient['status'];
            }
            catch (ErrorException) {
                return new JsonResponse(
                    ['message' => 'Request body not provide some of this parameters: 
                    ingredient: id, ingredient: status!'],
                    JsonResponse::HTTP_BAD_REQUEST
                );
            }


            $ingredient = $ingredientRepository->findOneBy(['id' => $ingredientId]);
            if ($ingredient === null)
            {
                return new JsonResponse(
                    ['message' => "Ingredient with id: $ingredientId not exists!"],
                    JsonResponse::HTTP_BAD_REQUEST
                );
            }

            if (!(IngredientStatus::isStatus($ingredientStatus)))
            {
                return new JsonResponse(
                    ['message' => "Invalid status: $ingredientStatus!"],
                    JsonResponse::HTTP_BAD_REQUEST
                );
            }

            $newPizzaIngredient = new PizzaIngredient($newPizza, $ingredient, $ingredientStatus);

            $entityManager->persist($newPizzaIngredient);
        }

        $pizzerias = $pizzeriaRepository->findAll();

        foreach ($pizzerias as $pizzeria)
        {
            $pizzeriaPizza = new PizzeriaPizza($pizzeria, $newPizza, true);
            $entityManager->persist($pizzeriaPizza);
        }

        $entityManager->flush();

        return new JsonResponse();
    }

    public function updateImage(
        Request $request,
        FileUploader $fileUploader,
        PizzaRepository $pizzaRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse
    {
        $pizzaName = $request->get('pizza_name');
        $image = $request->files->get('image');

        if ($pizzaName === null)
        {
            return new JsonResponse(
                ['message' => "Request body not provide key: pizza_name!"],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        if ($image === null)
        {
            return new JsonResponse(
                ['message' => "Missing file with key: image!"],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $imageName = $fileUploader->upload($image, 'pizza');

        $pizza = $pizzaRepository->findOneBy(['name' => $pizzaName]);

        if ($pizza === null)
        {
            return new JsonResponse(
                ['message' => "Pizza with name: $pizzaName not exists!"],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $pizza->setImageName($imageName);

        $entityManager->persist($pizza);
        $entityManager->flush();

        return new JsonResponse();
    }

    public function getAll(
        Request $request,
        PizzaRepository $pizzaRepository,
        PizzaIngredientRepository $pizzaIngredientRepository,
        SerializerInterface $serializer
    ): JsonResponse
    {
        $requestQuery = $request->query->all();

        try {
            $objects = $pizzaRepository->findBy($requestQuery);
        }
        catch (ORMException $exception) {
            return new JsonResponse(
                ['message' => $exception->getMessage()],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }
        $result = [];

        foreach ($objects as $object) {
            $pizza = $serializer->normalize($object);
            $pizza['ingredients'] = [];

            $pizzaIngredients = $pizzaIngredientRepository->findBy(['pizza' => $object->getId()]);

            foreach ($pizzaIngredients as $pizzaIngredient) {
                $serializedIngredient = $serializer->normalize(
                    $pizzaIngredient,
                    context: [AbstractNormalizer::ATTRIBUTES => ['ingredient' => ['id'], 'status']]
                );

                $pizza['ingredients'][] = [
                    'ingredient_id' => $serializedIngredient['ingredient']['id'],
                    'status' => $serializedIngredient['status']
                ];
            }

            $result[] = $pizza;
        }

        return new JsonResponse(
            $result,
            JsonResponse::HTTP_OK
        );
    }

    public function getPizza(
        Request $request,
        PizzaRepository $pizzaRepository,
        PizzaIngredientRepository $pizzaIngredientRepository,
        SerializerInterface $serializer
    ): JsonResponse
    {
        $pizzaId = $request->query->get('pizza_id');

        if ($pizzaId === null) {
            return new JsonResponse(
                ['message' => 'Request not provide parameter: pizza_id!'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $pizza = $pizzaRepository->findOneBy(['id' => $pizzaId]);

        if ($pizza === null) {
            return new JsonResponse(
                ['message' => "Pizza with id: $pizzaId does not exists!"],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }


        $normalizedPizza = $serializer->normalize($pizza);
        $normalizedPizza['ingredients'] = [];

        $pizzaIngredients = $pizzaIngredientRepository->findBy(['pizza' => $pizza->getId()]);

        foreach ($pizzaIngredients as $pizzaIngredient) {
            $serializedIngredient = $serializer->normalize(
                $pizzaIngredient,
                context: [AbstractNormalizer::ATTRIBUTES => ['ingredient' => ['id'], 'status']]
            );

            $normalizedPizza['ingredients'][] = [
                'ingredient_id' => $serializedIngredient['ingredient']['id'],
                'status' => $serializedIngredient['status']
            ];
        }

        return new JsonResponse($normalizedPizza);
    }

    public function search(
        Request $request,
        PizzaRepository $pizzaRepository,
        SerializerInterface $serializer,
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

        $result = [];

        $objects = $pizzaRepository->partialNameMatch($name);

        foreach ($objects as $object) {
            $pizza = $serializer->normalize($object);
            $pizza['ingredients'] = [];

            $pizzaIngredients = $pizzaIngredientRepository->findBy(['pizza' => $object->getId()]);

            foreach ($pizzaIngredients as $pizzaIngredient) {
                $serializedIngredient = $serializer->normalize(
                    $pizzaIngredient,
                    context: [AbstractNormalizer::ATTRIBUTES => ['ingredient' => ['id'], 'status']]
                );

                $pizza['ingredients'][] = [
                    'ingredient_id' => $serializedIngredient['ingredient']['id'],
                    'status' => $serializedIngredient['status']
                ];
            }

            $result[] = $pizza;
        }

        return new JsonResponse(
            $result,
            JsonResponse::HTTP_OK
        );
    }
}
