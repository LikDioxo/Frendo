<?php

namespace App\Entity;

use App\Repository\PizzeriaRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PizzeriaRepository::class)
 */
class Pizzeria
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     */
    private $address;

    /**
     * @ORM\OneToOne(targetEntity="Client")
     * @ORM\JoinColumn(name="operator_id", referencedColumnName="id", onDelete="CASCADE")
     */
    private $operator;

    public function __construct($address, $operator)
    {
        $this->address = $address;
        $this->operator = $operator;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getAddress(): string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getOperator(): Client
    {
        return $this->operator;
    }

    public function setOperator($operator): self
    {
        $this->operator = $operator;

        return $this;
    }
}
