<?php


namespace App\Service;

use ReflectionMethod;

class RequestBodyValidator
{
    public static function allKeysProvided(ReflectionMethod $method, array $requestBody)
    {
        foreach ($method->getParameters() as $arg){
             if (!($arg->isOptional()) and !array_key_exists($arg->name , $requestBody))
             {
                return $arg->name;
             }
        }
        return null;
    }
}
