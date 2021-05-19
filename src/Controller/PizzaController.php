<?php

namespace App\Controller;

use App\Domain\IngredientStatus;
use App\Entity\Pizza;
use App\Entity\PizzaIngredient;
use App\Entity\PizzeriaPizza;
use App\Repository\ChoiceRepository;
use App\Repository\IngredientRepository;
use App\Repository\OrderRepository;
use App\Repository\PizzaIngredientRepository;
use App\Repository\PizzaRepository;
use App\Repository\PizzeriaPizzaRepository;
use App\Repository\PizzeriaRepository;
use App\Service\FileUploader;
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
        } catch (JsonException $exception) {
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
        } catch (ErrorException) {
            return new JsonResponse(
                ['message' => 'Request body not provide some of this parameters: 
                name, weight, size, price, ingredients!'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }


        $pizza = $pizzaRepository->findOneBy(['name' => $name]);
        if ($pizza !== null) {
            return new JsonResponse(
                ['message' => "Pizza with name: $name already exists!"],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $newPizza = new Pizza($name, $weight, $size, $price);
        $entityManager->persist($newPizza);

        foreach ($ingredients as $requestIngredient) {
            try {
                $ingredientId = $requestIngredient['id'];
                $ingredientStatus = $requestIngredient['status'];
            } catch (ErrorException) {
                return new JsonResponse(
                    ['message' => 'Request body not provide some of this parameters: 
                    ingredient: id, ingredient: status!'],
                    JsonResponse::HTTP_BAD_REQUEST
                );
            }


            $ingredient = $ingredientRepository->findOneBy(['id' => $ingredientId]);
            if ($ingredient === null) {
                return new JsonResponse(
                    ['message' => "Ingredient with id: $ingredientId does not exists!"],
                    JsonResponse::HTTP_BAD_REQUEST
                );
            }

            if (!(IngredientStatus::isStatus($ingredientStatus))) {
                return new JsonResponse(
                    ['message' => "Invalid status: $ingredientStatus!"],
                    JsonResponse::HTTP_BAD_REQUEST
                );
            }

            $newPizzaIngredient = new PizzaIngredient($newPizza, $ingredient, $ingredientStatus);

            $entityManager->persist($newPizzaIngredient);
        }

        $pizzerias = $pizzeriaRepository->findAll();

        foreach ($pizzerias as $pizzeria) {
            $pizzeriaPizza = new PizzeriaPizza($pizzeria, $newPizza, true);
            $entityManager->persist($pizzeriaPizza);
        }

        $entityManager->flush();

        return new JsonResponse(
            ['id' => $newPizza->getId()],
            JsonResponse::HTTP_CREATED
        );
    }

    public function delete(
        $pizzaId,
        PizzaRepository $pizzaRepository,
        ChoiceRepository $choiceRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse
    {
        $pizza = $pizzaRepository->find($pizzaId);

        if ($pizza === null) {
            return new JsonResponse(
                ['message' => "Pizza with id: $pizzaId does not exists!"],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        $choices = $choiceRepository->findBy(['pizza' => $pizza]);
        foreach ($choices as $choice) {
            $entityManager->remove($choice->getOrder());
        }

        $entityManager->remove($pizza);
        $entityManager->flush();
        return new JsonResponse(status: JsonResponse::HTTP_NO_CONTENT);
    }

    public function update(
        Request $request,
        $pizzaId,
        PizzaRepository $pizzaRepository,
        PizzaIngredientRepository $pizzaIngredientRepository,
        IngredientRepository $ingredientRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse
    {
        $pizza = $pizzaRepository->find($pizzaId);

        if ($pizza === null) {
            return new JsonResponse(
                ['message' => "Pizza with id: $pizzaId does not exists!"],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        try {
            $data = $request->toArray();
        } catch (JsonException $exception) {
            return new JsonResponse(
                ['message' => $exception->getMessage()],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $newName = array_key_exists('name', $data) ? $data['name'] : null;
        $newWeight = array_key_exists('weight', $data) ? $data['weight'] : null;
        $newSize = array_key_exists('size', $data) ? $data['size'] : null;
        $newPrice = array_key_exists('price', $data) ? $data['price'] : null;
        $newIngredients = array_key_exists('ingredients', $data) ? $data['ingredients'] : null;

        if ($newName !== null) {
            $pizza->setName($newName);
        }
        if ($newWeight !== null) {
            $pizza->setWeight($newWeight);
        }
        if ($newSize !== null) {
            $pizza->setSize($newSize);
        }
        if ($newPrice !== null) {
            $pizza->setPrice($newPrice);
        }

        if ($newIngredients !== null) {
            foreach ($newIngredients as $ingredient) {
                try {
                    $ingredientId = $ingredient['id'];
                    $ingredientStatus = $ingredient['status'];
                } catch (ErrorException) {
                    return new JsonResponse(
                        ['message' => 'Request body not provide some of this parameters: 
                        ingredient: id, ingredient: status!'],
                        JsonResponse::HTTP_BAD_REQUEST
                    );
                }

                $ingredient = $ingredientRepository->findOneBy(['id' => $ingredientId]);
                if ($ingredient === null) {
                    return new JsonResponse(
                        ['message' => "Ingredient with id: $ingredientId does not exists!"],
                        JsonResponse::HTTP_BAD_REQUEST
                    );
                }

                if (!(IngredientStatus::isStatus($ingredientStatus))) {
                    return new JsonResponse(
                        ['message' => "Invalid status: $ingredientStatus!"],
                        JsonResponse::HTTP_BAD_REQUEST
                    );
                }

                $pizzaIngredient = $pizzaIngredientRepository->findOneBy(['ingredient' => $ingredient, 'pizza' => $pizza]);

                if ($pizzaIngredient === null) {
                    $pizzaIngredient = new PizzaIngredient(
                        $pizza,
                        $ingredient,
                        $ingredientStatus
                    );

                    $entityManager->persist($pizzaIngredient);
                    continue;
                }

                $pizzaIngredient->setStatus($ingredientStatus);
                $entityManager->persist($pizzaIngredient);
            }
        }

        $entityManager->persist($pizza);
        $entityManager->flush();

        return new JsonResponse(status: JsonResponse::HTTP_NO_CONTENT);
    }

    public function updateImage(
        Request $request,
        $id,
        FileUploader $fileUploader,
        PizzaRepository $pizzaRepository,
        EntityManagerInterface $entityManager
    ): Response
    {
        $image = $request->files->get('image');

        if ($image === null) {
            return new JsonResponse(
                ['message' => "Missing file with key: image!"],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $imageName = $fileUploader->upload($image, 'pizza');

        $pizza = $pizzaRepository->find($id);

        if ($pizza === null) {
            return new JsonResponse(
                ['message' => "Pizza with id: $id does not exists!"],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        $pizza->setImageName($imageName);

        $entityManager->persist($pizza);
        $entityManager->flush();

        return new Response();
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
        } catch (ORMException $exception) {
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

        return new JsonResponse($result);
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
                JsonResponse::HTTP_NOT_FOUND
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
}
