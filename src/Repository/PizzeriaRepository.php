<?php

namespace App\Repository;

use App\Entity\Pizzeria;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Collections\Criteria;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Pizzeria|null find($id, $lockMode = null, $lockVersion = null)
 * @method Pizzeria|null findOneBy(array $criteria, array $orderBy = null)
 * @method Pizzeria[]    findAll()
 * @method Pizzeria[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PizzeriaRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Pizzeria::class);
    }

    public function partialAddressMatch(string $address)
    {
        return $this->createQueryBuilder('o')
            ->addCriteria(
                Criteria::create()
                    ->where(Criteria::expr()->startsWith('address', $address))
            )
            ->getQuery()
            ->getResult()
            ;
    }

    // /**
    //  * @return Pizzeria[] Returns an array of Pizzeria objects
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
    public function findOneBySomeField($value): ?Pizzeria
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
