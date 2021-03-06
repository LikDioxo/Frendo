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
     * @ORM\JoinColumn(name="pizza_id", referencedColumnName="id")
     */
    private $pizza;

    /**
     * @ORM\ManyToOne(targetEntity="Ingredient")
     * @ORM\JoinColumn(name="ingredient_id", referencedColumnName="id")
     */
    private $ingredient;

    /**
     * @ORM\Column(type="string", length=10)
     */
    private $status;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPizza(): ?int
    {
        return $this->pizza;
    }

    public function setPizza(int $pizza): self
    {
        $this->pizza = $pizza;

        return $this;
    }

    public function getIngredient(): ?int
    {
        return $this->ingredient;
    }

    public function setIngredient(int $ingredient): self
    {
        $this->ingredient = $ingredient;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }
}
