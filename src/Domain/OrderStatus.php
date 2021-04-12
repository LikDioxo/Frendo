<?php


namespace App\Domain;
use ReflectionClass;


class OrderStatus
{
    public const CREATED = 0;
    public const PREPARING = 1;
    public const READY = 2;
    public const IN_DELIVERY = 3;

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
