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
use Symfony\Component\Serializer\SerializerInterface;

class IngredientController extends AbstractController
{

    public function create(
        Request $request,
        IngredientRepository $ingredientRepository,
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
        }
        catch (ErrorException) {
            return new JsonResponse(
                ['message' => 'Request body not provide some of this parameters: name!'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $ingredient = $ingredientRepository->findOneBy(['name' => $name]);
        if ($ingredient !== null)
        {
            return new JsonResponse(
                ['message' => "Ingredient with name: $name already exists!"],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $newIngredient = new Ingredient($name);

        $entityManager->persist($newIngredient);
        $entityManager->flush();

        return new JsonResponse();
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

        return new JsonResponse(
            $result,
            JsonResponse::HTTP_OK
        );
    }
}