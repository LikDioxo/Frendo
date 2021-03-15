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
     * @ORM\JoinColumn(name="choice_id", referencedColumnName="id")
     */
    private $choice;

    /**
     * @ORM\Column(type="json")
     */
    private $payload = [];

    /**
     * @ORM\Column(type="datetime")
     */
    private $createDate;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getChoice(): ?string
    {
        return $this->choice;
    }

    public function setChoice($choice): self
    {
        $this->choice = $choice;

        return $this;
    }

    public function getPayload(): ?array
    {
        return $this->payload;
    }

    public function setPayload(array $payload): self
    {
        $this->payload = $payload;

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

    public function serialize(): array
    {
        return [
            'id' => $this->id,
            'choice' => $this->choice,
            'payload' => $this->payload,
            'create_date' => $this->createDate
        ];
    }
}
