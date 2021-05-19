<?php

namespace App\Entity;

use App\Repository\PizzaIngredientRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PizzaIngredientRepository::class)
 */
class PizzaIngredient
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="Pizza")
     * @ORM\JoinColumn(name="pizza_id", referencedColumnName="id", onDelete="CASCADE")
     */
    private $pizza;

    /**
     * @ORM\ManyToOne(targetEntity="Ingredient")
     * @ORM\JoinColumn(name="ingredient_id", referencedColumnName="id", onDelete="CASCADE")
     */
    private $ingredient;

    /**
     * @ORM\Column(type="integer")
     */
    private $status;

    public function __construct($pizza, $ingredient, $status)
    {
        $this->pizza = $pizza;
        $this->ingredient = $ingredient;
        $this->status = $status;
    }

    public function getId(): ?int
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

    public function getIngredient(): Ingredient
    {
        return $this->ingredient;
    }

    public function setIngredient($ingredient): self
    {
        $this->ingredient = $ingredient;

        return $this;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }


    public function setStatus(int $status): self
    {
        $this->status = $status;

        return $this;
    }
}
