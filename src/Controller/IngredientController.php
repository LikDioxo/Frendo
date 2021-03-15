<?php

namespace App\Controller;

use App\Entity\Ingredient;
use App\Repository\IngredientRepository;
use Doctrine\DBAL\Exception\DriverException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class IngredientController extends AbstractController
{

    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = $request->toArray();

        $newIngredient = new Ingredient();
        $newIngredient->setName($data['name']);
        $newIngredient->setImageName($data['image_name']);

        $em->persist($newIngredient);
        $em->flush();

        return new JsonResponse(
            ['message' => 'Successful'],
            JsonResponse::HTTP_OK
        );
    }


    public function getAll(Request $request, IngredientRepository $repository): JsonResponse
    {
        $requestQuery = $request->query->all();

        try {
            $objects = $repository->findBy($requestQuery);
        }
        catch (DriverException $exception)
        {
            return new JsonResponse(
                ['message' => 'Provided not supported query parameter!'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }
        $result = ['message' => 'Successful'];

        foreach ($objects as $object)
        {
            $result[] = $object->serialize();
        }

        return new JsonResponse(
            $result,
            JsonResponse::HTTP_OK
        );
    }
}
