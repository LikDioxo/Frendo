<?php

namespace App\Entity;

use App\Repository\ChoiceEventRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ChoiceEventRepository::class)
 */
class ChoiceEvent
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="Choice")
     * @ORM\JoinColumn(name="choice_id", referencedColumnName="id", onDelete="CASCADE")
     */
    private $choice;

    /**
     * @ORM\ManyToOne(targetEntity="Ingredient")
     * @ORM\JoinColumn(name="ingredient_id", referencedColumnName="id")
     */
    private $ingredient;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isEnabled;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createDate;

    public function __construct($choice, $ingredient, $isEnabled, $createDate)
    {
        $this->choice = $choice;
        $this->ingredient = $ingredient;
        $this->isEnabled = $isEnabled;
        $this->createDate = $createDate;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getChoice(): Choice
    {
        return $this->choice;
    }

    public function setChoice($choice): self
    {
        $this->choice = $choice;

        return $this;
    }

    public function getIngredient(): Ingredient
    {
        return $this->ingredient;
    }

    public function setIngredient(Ingredient $ingredient): self
    {
        $this->ingredient = $ingredient;

        return $this;
    }

    public function getIsEnabled(): bool
    {
        return $this->isEnabled;
    }

    public function setIsEnabled(bool $isEnabled): self
    {
        $this->isEnabled = $isEnabled;

        return $this;
    }

    public function getCreateDate()
    {
        return $this->createDate;
    }

    public function setCreateDate($createDate): self
    {
        $this->createDate = $createDate;

        return $this;
    }
}
