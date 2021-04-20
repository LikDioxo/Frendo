<?php

namespace App\Controller;

use App\Entity\ChoiceEvent;
use App\Repository\ChoiceRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use ErrorException;
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

        try {
            $choiceId = $data['choice_id'];
            $event = $data['event'];
        }
        catch (ErrorException) {
            return new JsonResponse(
                ['message' => 'Request body not provide some of this parameters: choice_id, event!'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $choice = $choiceRepository->findOneBy(['id' => $choiceId]);
        if ($choice === null)
        {
            return new JsonResponse(
                ['message' => "Choice with id: $choiceId does not exists!"],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $newChoiceEvent = new ChoiceEvent($choice, $event, new DateTime());

        $entityManager->persist($newChoiceEvent);
        $entityManager->flush();

        return new JsonResponse(
            ['id' => $newChoiceEvent->getId()],
            JsonResponse::HTTP_CREATED
        );
    }
}
