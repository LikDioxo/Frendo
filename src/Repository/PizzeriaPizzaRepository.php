<?php

namespace App\Repository;

use App\Entity\PizzeriaPizza;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method PizzeriaPizza|null find($id, $lockMode = null, $lockVersion = null)
 * @method PizzeriaPizza|null findOneBy(array $criteria, array $orderBy = null)
 * @method PizzeriaPizza[]    findAll()
 * @method PizzeriaPizza[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PizzeriaPizzaRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PizzeriaPizza::class);
    }

    // /**
    //  * @return PizzeriaPizza[] Returns an array of PizzeriaPizza objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?PizzeriaPizza
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
