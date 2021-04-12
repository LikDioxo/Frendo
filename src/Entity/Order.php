<?php

namespace App\Entity;

use App\Repository\OrderRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=OrderRepository::class)
 * @ORM\Table(name="`order`")
 */
class Order
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=13)
     */
    private $customersPhoneNumber;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $deliveryAddress;

    /**
     * @ORM\Column(type="decimal", precision=10, scale=2)
     */
    private $totalPrice;

    /**
     * @ORM\ManyToOne(targetEntity="Pizzeria")
     * @ORM\JoinColumn(name="pizzeria_id", referencedColumnName="id")
     */
    private $pizzeria;

    /**
     * @ORM\Column(type="integer")
     */
    private $status;

    public function __construct(
        string $customersPhoneNumber,
        string $deliveryAddress,
        string $totalPrice,
        $pizzeria,
        int $status
    )
    {
        $this->customersPhoneNumber = $customersPhoneNumber;
        $this->deliveryAddress = $deliveryAddress;
        $this->totalPrice = $totalPrice;
        $this->pizzeria = $pizzeria;
        $this->status = $status;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCustomersPhoneNumber(): ?string
    {
        return $this->customersPhoneNumber;
    }

    public function setCustomersPhoneNumber(string $customersPhoneNumber): self
    {
        $this->customersPhoneNumber = $customersPhoneNumber;

        return $this;
    }

    public function getDeliveryAddress(): ?string
    {
        return $this->deliveryAddress;
    }

    public function setDeliveryAddress(string $deliveryAddress): self
    {
        $this->deliveryAddress = $deliveryAddress;

        return $this;
    }

    public function getTotalPrice(): ?string
    {
        return $this->totalPrice;
    }

    public function setTotalPrice(string $totalPrice): self
    {
        $this->totalPrice = $totalPrice;

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

    public function getStatus()
    {
        return $this->status;
    }


    public function setStatus(int $status): self
    {
        $this->status = $status;

        return $this;
    }
}
