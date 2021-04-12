<?php

namespace App\Controller;

use App\Entity\ChoiceEvent;
use App\Repository\ChoiceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\JsonException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class ChoiceEventController extends AbstractController
{
    public function create(
        Request $request,
        ChoiceRepository $choiceRepository,
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



        $choice = $choiceRepository->findOneBy(['id' => $data['choice_id']]);

        $newChoiceEvent = new ChoiceEvent();
        $newChoiceEvent->setChoice($choice);
        $newChoiceEvent->setPayload($data['event']);
        $newChoiceEvent->setCreateDate(new \DateTime());

        $entityManager->persist($newChoiceEvent);
        $entityManager->flush();

        return new JsonResponse(
            JsonResponse::HTTP_OK
        );
    }
}
