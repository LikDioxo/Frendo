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
     * @ORM\JoinColumn(name="pizzeria_id", referencedColumnName="id")
     */
    private $pizzeria;

    /**
     * @ORM\ManyToOne(targetEntity="pizza")
     * @ORM\JoinColumn(name="pizza_id", referencedColumnName="id")
     */
    private $pizza;

    public function __construct($pizzeria, $pizza)
    {
        $this->pizzeria = $pizzeria;
        $this->pizza = $pizza;
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
}
