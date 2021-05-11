<?php


namespace App\Service;


use App\Entity\ChoiceEvent;

class ChoiceEventFilter
{

    /**
     *@var $choiceEvents array[ChoiceEvent]
     *@return array[ChoiceEvent]
     */
    public static function filter(array $choiceEvents): array
    {
        $result = [];

        foreach ($choiceEvents as $event) {
            if (!in_array($event, $result)) {
                $result[] = $event;
            }
            else {
                $index = array_search($event, $result);
                $result[$index] = $event;
            }
        }

        return $result;
    }
}
