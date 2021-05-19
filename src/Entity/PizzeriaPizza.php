<?php

namespace App\Entity;

use App\Repository\PizzeriaPizzaRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PizzeriaPizzaRepository::class)
 */
class PizzeriaPizza
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="Pizzeria")
     * @ORM\JoinColumn(name="pizzeria_id", referencedColumnName="id", onDelete="CASCADE")
     */
    private $pizzeria;

    /**
     * @ORM\ManyToOne(targetEntity="Pizza")
     * @ORM\JoinColumn(name="pizza_id", referencedColumnName="id", onDelete="CASCADE")
     */
    private $pizza;

    /**
     * @ORM\Column(type="boolean")
     */
    private $is_available;

    public function __construct($pizzeria, $pizza, $is_available)
    {
        $this->pizzeria = $pizzeria;
        $this->pizza = $pizza;
        $this->is_available = $is_available;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getPizza(): Pizza
    {
        return $this->pizza;
    }

    public function setPizza($pizza): self
    {
        $this->pizza = $pizza;

        return $this;
    }

    public function getPizzeria(): Pizzeria
    {
        return $this->pizzeria;
    }

    public function setPizzeria($pizzeria): self
    {
        $this->pizzeria = $pizzeria;

        return $this;
    }

    public function getIsAvailable():  bool
    {
        return $this->is_available;
    }

    public function setIsAvailable($is_available): self
    {
        $this->is_available = $is_available;

        return $this;
    }
}
