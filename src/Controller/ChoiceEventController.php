<?php

namespace App\Controller;

use App\Entity\ChoiceEvent;
use App\Repository\ChoiceRepository;
use App\Repository\IngredientRepository;
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
        IngredientRepository $ingredientRepository,
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
            $ingredientId = $data['ingredient_id'];
            $isEnabled = $data['is_enabled'];
        }
        catch (ErrorException) {
            return new JsonResponse(
                ['message' => 'Request body not provide some of this parameters: choice_id, ingredient_id, is_enabled!'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $choice = $choiceRepository->find($choiceId);
        if ($choice === null)
        {
            return new JsonResponse(
                ['message' => "Choice with id: $choiceId does not exists!"],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        $ingredient = $ingredientRepository->find($choiceId);
        if ($ingredient === null)
        {
            return new JsonResponse(
                ['message' => "Ingredient with id: $ingredientId does not exists!"],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        $newChoiceEvent = new ChoiceEvent(
            $choice,
            $ingredient,
            $isEnabled,
            new DateTime()
        );

        $entityManager->persist($newChoiceEvent);
        $entityManager->flush();

        return new JsonResponse(
            ['id' => $newChoiceEvent->getId()],
            JsonResponse::HTTP_CREATED
        );
    }
}
