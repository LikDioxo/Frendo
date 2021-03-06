<?php

namespace App\Repository;

use App\Entity\ChoiceEvent;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ChoiceEvent|null find($id, $lockMode = null, $lockVersion = null)
 * @method ChoiceEvent|null findOneBy(array $criteria, array $orderBy = null)
 * @method ChoiceEvent[]    findAll()
 * @method ChoiceEvent[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ChoiceEventRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ChoiceEvent::class);
    }

    // /**
    //  * @return ChoiceEvent[] Returns an array of ChoiceEvent objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ChoiceEvent
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
