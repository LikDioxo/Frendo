<?php

namespace App\Controller;

use App\Domain\OrderStatus;
use App\Entity\Choice;
use App\Entity\ChoiceEvent;
use App\Entity\Client;
use App\Entity\Ingredient;
use App\Entity\Order;
use App\Entity\Pizza;
use App\Entity\PizzaIngredient;
use App\Entity\Pizzeria;
use App\Entity\PizzeriaPizza;
use App\Repository\ChoiceRepository;
use App\Repository\ClientRepository;
use App\Repository\IngredientRepository;
use App\Repository\OrderRepository;
use App\Repository\PizzaRepository;
use App\Repository\PizzeriaRepository;
use Doctrine\ORM\EntityManagerInterface;
use Datetime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DatabaseInitController extends AbstractController
{
    #[Route('/database', name: 'database_init')]
    public function index(
        Request $request,
        IngredientRepository $ingredientRepository,
        PizzaRepository $pizzaRepository,
        ClientRepository $clientRepository,
        PizzeriaRepository $pizzeriaRepository,
        OrderRepository $orderRepository,
        ChoiceRepository $choiceRepository,
        EntityManagerInterface $entityManager
    )
    {
        $instructions = $request->toArray();

        foreach ($instructions as $instruction) {
            $targetEntityName = $instruction['entity'];

            if ($targetEntityName == "Client") {

                foreach ($instruction['values'] as $client) {
                    $username = $client['username'];
                    $password = $client['password'];
                    $roles = $client['roles'];

                    $salt = base64_encode(random_bytes(15));
                    $hashedPassword = password_hash($password . $salt, PASSWORD_DEFAULT, ['cost' => 15]);

                    $newUser = new Client(
                        $username,
                        $hashedPassword,
                        $roles,
                        $salt
                    );

                    $entityManager->persist($newUser);
                }

                $entityManager->flush();
            }
            elseif ($targetEntityName == "Ingredient") {

                foreach ($instruction['values'] as $ingredient) {
                    $newIngredient = new Ingredient(
                        $ingredient['name'],
                        $ingredient['price']
                    );

                    $entityManager->persist($newIngredient);
                }

                $entityManager->flush();
            }
            elseif ($targetEntityName == "Pizza") {

                foreach ($instruction['values'] as $pizza) {
                    $name = $pizza['name'];
                    $weight = $pizza['weight'];
                    $size = $pizza['size'];
                    $price = $pizza['price'];
                    $image = $pizza['image'];

                    $newPizza = new Pizza($name, $weight, $size, $price);
                    $newPizza->setImageName($image);

                    $entityManager->persist($newPizza);

                    foreach ($pizza['ingredients'] as $requestIngredient)
                    {
                        $ingredientId = $requestIngredient['id'];
                        $ingredientStatus = $requestIngredient['status'];

                        $ingredient = $ingredientRepository->findOneBy(['id' => $ingredientId]);
                        $newPizzaIngredient = new PizzaIngredient($newPizza, $ingredient, $ingredientStatus);

                        $entityManager->persist($newPizzaIngredient);
                    }
                }

                $entityManager->flush();
            }
            elseif ($targetEntityName == "Pizzeria") {

                foreach ($instruction['values'] as $pizzeria) {
                    $address = $pizzeria['address'];
                    $operator_id = $pizzeria['operator_id'];

                    $operator = $clientRepository->findOneBy(['id' => $operator_id]);

                    $newPizzeria = new Pizzeria($address, $operator);

                    $pizzas = $pizzaRepository->findAll();

                    foreach ($pizzas as $pizza)
                    {
                        $pizzeriaPizza = new PizzeriaPizza($newPizzeria, $pizza, true);
                        $entityManager->persist($pizzeriaPizza);
                    }

                    $entityManager->persist($newPizzeria);
                    $entityManager->flush();
                }
            }
            elseif ($targetEntityName == "Order") {

                foreach ($instruction['values'] as $order) {
                    $customersPhoneNumber = $order['customers_phone_number'];
                    $deliveryAddress = $order['delivery_address'];
                    $totalPrice = $order['total_price'];
                    $pizzeriaId = $order['pizzeria_id'];


                    $pizzeria = $pizzeriaRepository->findOneBy(['id' => $pizzeriaId]);

                    $newOrder = new Order(
                        $customersPhoneNumber,
                        $deliveryAddress,
                        $totalPrice,
                        $pizzeria,
                        OrderStatus::CREATED);

                    $entityManager->persist($newOrder);
                }
                $entityManager->flush();
            }
            elseif ($targetEntityName == "Choice") {

                foreach ($instruction['values'] as $choice) {
                    $orderId = $choice['order_id'];
                    $pizzaId = $choice['pizza_id'];
                    $quantity = $choice['quantity'];

                    $order = $orderRepository->findOneBy(['id' => $orderId]);
                    $pizza = $pizzaRepository->findOneBy(['id' => $pizzaId]);

                    $newChoice = new Choice($order, $pizza, $quantity);
                    $entityManager->persist($newChoice);
                }
                $entityManager->flush();
            }
            elseif ($targetEntityName == "ChoiceEvent") {

                foreach ($instruction['values'] as $choiceEvent) {
                    $choiceId = $choiceEvent['choice_id'];
                    $event = $choiceEvent['event'];

                    $choice = $choiceRepository->findOneBy(['id' => $choiceId]);

                    $newChoiceEvent = new ChoiceEvent($choice, $event, new DateTime());

                    $entityManager->persist($newChoiceEvent);
                }
                $entityManager->flush();
            }
        }

        return new Response();
    }
}
