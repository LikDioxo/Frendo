<?php

namespace App\Controller;

use App\Entity\Ingredient;
use App\Repository\IngredientRepository;
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

class IngredientController extends AbstractController
{

    public function create(
        Request $request,
        IngredientRepository $ingredientRepository,
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
            $name = $data['name'];
            $price = $data['price'];
        }
        catch (ErrorException) {
            return new JsonResponse(
                ['message' => 'Request body not provide some of this parameters: name, price!'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $ingredient = $ingredientRepository->findOneBy(['name' => $name]);
        if ($ingredient !== null)
        {
            return new JsonResponse(
                ['message' => "Ingredient with name: $name already exists!"],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        $newIngredient = new Ingredient($name, $price);

        $entityManager->persist($newIngredient);
        $entityManager->flush();

        return new JsonResponse(
            ['id' => $newIngredient->getId()],
            JsonResponse::HTTP_CREATED
        );
    }

    public function delete(
        $ingredientId,
        IngredientRepository $ingredientRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse
    {
        $ingredient = $ingredientRepository->find($ingredientId);

        if ($ingredient === null) {
            return new JsonResponse(
                ['message' => "Ingredient with id: $ingredientId does not exists!"],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        $entityManager->remove($ingredient);
        $entityManager->flush();
        return new JsonResponse(status: JsonResponse::HTTP_NO_CONTENT);
    }

    public function update(
        Request $request,
        $ingredientId,
        IngredientRepository $ingredientRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse
    {
        $ingredient = $ingredientRepository->find($ingredientId);

        if ($ingredient === null) {
            return new JsonResponse(
                ['message' => "Ingredient with id: $ingredientId does not exists!"],
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

        $newName = array_key_exists('name', $data) ? $data['name'] : null;
        $newPrice = array_key_exists('price', $data) ? $data['price'] : null;


        if ($newName !== null) {
            $ingredient->setName($newName);
        }

        if ($newPrice !== null) {
            $ingredient->setPrice($newPrice);
        }

        $entityManager->persist($ingredient);
        $entityManager->flush();

        return new JsonResponse(status: JsonResponse::HTTP_NO_CONTENT);
    }

    public function getAll(
        Request $request,
        IngredientRepository $ingredientRepository,
        SerializerInterface $serializer
    ): JsonResponse
    {
        $requestQuery = $request->query->all();

        try {
            $objects = $ingredientRepository->findBy($requestQuery);
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
            $result[] = $serializer->normalize($object);
        }

        return new JsonResponse($result);
    }

    public function getIngredient(
        Request $request,
        IngredientRepository $ingredientRepository,
        SerializerInterface $serializer,
        EntityManagerInterface $entityManager
    ): JsonResponse
    {
        $ingredientId = $request->query->get('ingredient_id');

        if ($ingredientId === null) {
            return new JsonResponse(
                ['message' => 'Request not provide parameter: ingredient_id!'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $ingredient = $ingredientRepository->findOneBy(['id' => $ingredientId]);

        if ($ingredient === null) {
            return new JsonResponse(
                ['message' => "Ingredient with id: $ingredientId does not exists!"],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        $normalizedIngredient = $serializer->normalize($ingredient);
        return new JsonResponse($normalizedIngredient);
    }
}
