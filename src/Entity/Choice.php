<?php

namespace App\Entity;

use App\Repository\ChoiceRepository;
use Doctrine\ORM\Mapping as ORM;
use phpDocumentor\Reflection\Types\Integer;

/**
 * @ORM\Entity(repositoryClass=ChoiceRepository::class)
 */
class Choice
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="Order")
     * @ORM\JoinColumn(name="order_id", referencedColumnName="id")
     */
    private $order;

    /**
     * @ORM\ManyToOne(targetEntity="Pizza")
     * @ORM\JoinColumn(name="pizza_id", referencedColumnName="id")
     */
    private $pizza;

    /**
     * @ORM\Column(type="integer")
     */
    private $quantity;

    public function __construct($order, $pizza, int $quantity)
    {
        $this->order = $order;
        $this->pizza = $pizza;
        $this->quantity = $quantity;
    }

    public function getId()
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

    public function getOrder(): Order
    {
        return $this->order;
    }

    public function setOrder($order): self
    {
        $this->order = $order;

        return $this;
    }

    public function getQuantity()
    {
        return $this->quantity;
    }
}
