<?php


namespace App\Domain;


use ReflectionClass;

class IngredientStatus
{
    public const REQUIRED = 0;
    public const OPTIONAL = 1;
    public const ADDITIONAL = 2;

    public static function getAllStatuses(): array
    {
        $reflection = new ReflectionClass(self::class);
        return $reflection->getConstants();
    }

    public static function isStatus(int $status)
    {
        $reflection = new ReflectionClass(self::class);
        $constants = $reflection->getConstants();

        return array_key_exists($status, array_values($constants));
    }
}
