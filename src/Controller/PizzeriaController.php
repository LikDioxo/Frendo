<?php

namespace App\Controller;

use App\Entity\Pizzeria;
use App\Repository\ClientRepository;
use App\Repository\PizzeriaRepository;
use Doctrine\DBAL\Exception\DriverException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class PizzeriaController extends AbstractController
{
    # TODO: add validation!
    public function create(
        Request $request,
        EntityManagerInterface $em,
        ClientRepository $clientRepository
    ): JsonResponse
    {
        $data = $request->toArray();

        $newPizzeria = new Pizzeria();
        $newPizzeria->setAddress($data['address']);

        $operator = $clientRepository->findOneBy(['id' => $data['operator_id']]);
        $newPizzeria->setOperator($operator);

        $em->persist($newPizzeria);
        $em->flush();

        return new JsonResponse(
            ['message' => 'Successful'],
            JsonResponse::HTTP_OK
        );
    }

    # TODO: add validation!
    public function getAll(
        Request $request,
        PizzeriaRepository $repository
    ): JsonResponse
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
