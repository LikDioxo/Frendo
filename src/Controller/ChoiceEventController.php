<?php

namespace App\Controller;

use App\Entity\ChoiceEvent;
use App\Repository\ChoiceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class ChoiceEventController extends AbstractController
{
    public function create(
        Request $request,
        EntityManagerInterface $em,
        ChoiceRepository $choiceRepository
    ): JsonResponse
    {
        $data = $request->toArray();
        $choice = $choiceRepository->findOneBy(['id' => $data['choice_id']]);

        $newChoiceEvent = new ChoiceEvent();
        $newChoiceEvent->setChoice($choice);
        $newChoiceEvent->setPayload($data['event']);
        $newChoiceEvent->setCreateDate(new \DateTime());

        $em->persist($newChoiceEvent);
        $em->flush();

        return new JsonResponse(
            ['message' => "Successful"],
            JsonResponse::HTTP_OK
        );
    }
}
