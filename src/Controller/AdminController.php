<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;
use function MongoDB\BSON\fromJSON;

class AdminController extends AbstractController
{

    public function getAll(Request $request, string $entity, SerializerInterface $serializer): Response
    {
        $fullEntityName = 'App\Entity\\' . $entity;
        $entityRepository = null;

        try {
            $entityRepository = $this->getDoctrine()->getRepository($fullEntityName);
        }
        catch (\ReflectionException $exception)
        {
            return new JsonResponse(
              ['message' => "There in no entity in database with name $entity!"],
              JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $objects = $entityRepository->findAll();
        $result = [];

        $counter = 0;

        foreach ($objects as $object)
        {
            $result[] = $object->serialize();
        }

        return new JsonResponse($result);
    }
}
