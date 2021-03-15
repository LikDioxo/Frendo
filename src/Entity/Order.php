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

    public function getPizzeria()
    {
        return $this->pizzeria;
    }

    public function setPizzeria($pizzeria): self
    {
        $this->pizzeria = $pizzeria;

        return $this;
    }

    public function serialize(): array
    {
        return [
            'id' => $this->id,
            'customers_phone_number' => $this->customersPhoneNumber,
            'delivery_address' => $this->deliveryAddress,
            'total_price' => $this->totalPrice,
            'pizzeria' => $this->pizzeria->serialize()
        ];
    }
}
