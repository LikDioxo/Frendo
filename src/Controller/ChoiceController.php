<?php

namespace App\Controller;

use App\Entity\Choice;
use App\Repository\OrderRepository;
use App\Repository\PizzaRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class ChoiceController extends AbstractController
{

    public function create(
        Request $request,
        EntityManagerInterface $em,
        OrderRepository $orderRepository,
        PizzaRepository $pizzaRepository
    ): JsonResponse
    {
        $data = $request->toArray();
        $order = $orderRepository->findOneBy(['id' => $data['order_id']]);
        $pizza = $pizzaRepository->findOneBy(['id' => $data['pizza_id']]);

        $newChoice = new Choice();
        $newChoice->setOrder($order);
        $newChoice->setPizza($pizza);

        $em->persist($newChoice);
        $em->flush();

        return new JsonResponse(
            ['message' => 'Successful'],
            JsonResponse::HTTP_OK
        );
    }
}
