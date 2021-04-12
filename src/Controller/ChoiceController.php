<?php

namespace App\Controller;

use App\Entity\Choice;
use App\Repository\OrderRepository;
use App\Repository\PizzaRepository;
use Doctrine\ORM\EntityManagerInterface;
use ErrorException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\JsonException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class ChoiceController extends AbstractController
{

    public function create(
        Request $request,
        OrderRepository $orderRepository,
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
            $orderId = $data['order_id'];
            $pizzaId = $data['pizza_id'];
            $quantity = $data['quantity'];
        }
        catch (ErrorException) {
            return new JsonResponse(
                ['message' => 'Request body not provide some of this parameters: order_id, pizza_id, quantity!'],
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

        $pizza = $pizzaRepository->findOneBy(['id' => $pizzaId]);
        if ($pizza === null)
        {
            return new JsonResponse(
                ['message' => "Pizza with id: $pizzaId does not exists!"],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $newChoice = new Choice($order, $pizza, $quantity);

        $entityManager->persist($newChoice);
        $entityManager->flush();

        return new JsonResponse();
    }
}
