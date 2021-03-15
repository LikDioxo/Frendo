<?php

namespace App\Controller;

use App\Entity\Pizza;
use App\Entity\PizzaIngredient;
use App\Repository\IngredientRepository;
use App\Repository\PizzaIngredientRepository;
use App\Repository\PizzaRepository;
use App\Repository\PizzeriaPizzaRepository;
use Doctrine\DBAL\Exception\DriverException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class PizzaController extends AbstractController
{
    # TODO: add validation!
    public function create(
        Request $request,
        EntityManagerInterface $em,
        IngredientRepository $ingredientRepository
    )
    {
        $data = $request->toArray();

        $newPizza = new Pizza();
        $newPizza->setName($data['name']);
        $newPizza->setImageName($data['image_name']);
        $newPizza->setWeight($data['weight']);
        $newPizza->setSize($data['size']);
        $newPizza->setPrice($data['price']);

        $em->persist($newPizza);
        $em->flush();

        print_r($newPizza);

        foreach ($data['ingredients'] as $requestIngredient)
        {
            $newPizzaIngredient = new PizzaIngredient();

            $newPizzaIngredient->setPizza($newPizza);

            $ingredient = $ingredientRepository->findOneBy(['id' => $requestIngredient['id']]);

            $newPizzaIngredient->setIngredient($ingredient);
            $newPizzaIngredient->setStatus($requestIngredient['status']);

            print_r($newPizzaIngredient);

            $em->persist($newPizzaIngredient);
            $em->flush();
        }


    }

    # TODO: add validation!
    public function getAll(
        Request $request,
        PizzaRepository $pizzaRepository,
        PizzaIngredientRepository $pizzaIngredientRepository,
        IngredientRepository $ingredientRepository
    ): JsonResponse
    {
        $requestQuery = $request->query->all();

        try {
            $objects = $pizzaRepository->findBy($requestQuery);
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
            $pizzeria = $object->serialize();
            $pizzeria['ingredients'] = [];

            $pizzas = $pizzaIngredientRepository->findBy(['pizza' => $object->getId()]);

            foreach ($pizzas as $pizza)
            {
                $pizzeria['ingredients'][] = $pizza->serialize();
            }

            $result[] = $pizzeria;
        }

        return new JsonResponse(
            $result,
            JsonResponse::HTTP_OK
        );
    }
}
