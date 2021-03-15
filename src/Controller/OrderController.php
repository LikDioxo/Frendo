<?php

namespace App\Controller;

use App\Entity\Order;
use App\Entity\Pizzeria;
use App\Repository\PizzeriaRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class OrderController extends AbstractController
{

    public function create(
        Request $request,
        PizzeriaRepository $pizzeriaRepository,
        EntityManagerInterface $em
    ): JsonResponse
    {
        $data = $request->toArray();

        $data = $request->toArray();

        $newOrder = new Order();
        $newOrder->setCustomersPhoneNumber($data['customers_phone_number']);
        $newOrder->setDeliveryAddress($data['delivery_address']);
        $newOrder->setTotalPrice("0.00");

        $pizzeria = $pizzeriaRepository->findOneBy(['id' => $data['pizzeria_id']]);
        $newOrder->setPizzeria($pizzeria);

        $em->persist($newOrder);
        $em->flush();

        return new JsonResponse(
            ['message' => 'Successful'],
            JsonResponse::HTTP_OK
        );
    }

    public function update(Request $request, EntityManagerInterface $em): JsonResponse
    {

    }

    public function getAll(): JsonResponse
    {

    }
}
