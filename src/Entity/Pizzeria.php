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
     * @ORM\OneToOne(targetEntity="User")
     * @ORM\JoinColumn(name="operator_id", referencedColumnName="id")
     */
    private $operator;

    /**
     * @ORM\ManyToMany(targetEntity="Pizza")
     * @ORM\JoinTable(
     *     name="pizzeria_pizza",
     *     joinColumns={@ORM\JoinColumn(name="pizzeria_id", referencedColumnName="id")},
     *     inverseJoinColumns={@ORM\JoinColumn(name="pizza_id", referencedColumnName="id")}
     * )
     */
    private $availablePizzas;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getOperator(): ?string
    {
        return $this->operator;
    }

    public function setOperator(string $operator): self
    {
        $this->operator = $operator;

        return $this;
    }

    public function getAvailablePizzas(): ?string
    {
        return $this->availablePizzas;
    }

    public function setAvailablePizzas(string $availablePizzas): self
    {
        $this->availablePizzas = $availablePizzas;

        return $this;
    }
}
