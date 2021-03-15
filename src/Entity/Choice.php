<?php

namespace App\Entity;

use App\Repository\ChoiceRepository;
use Doctrine\ORM\Mapping as ORM;

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

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPizza()
    {
        return $this->pizza;
    }

    public function setPizza($pizza): self
    {
        $this->pizza = $pizza;

        return $this;
    }

    public function getOrder()
    {
        return $this->order;
    }

    public function setOrder($order): self
    {
        $this->order = $order;

        return $this;
    }

    public function serialize(): array
    {
        return [
            'id' => $this->id,
            'order' => $this->order->serialize(),
            'pizza' => $this->pizza->serialize()
        ];
    }
}
