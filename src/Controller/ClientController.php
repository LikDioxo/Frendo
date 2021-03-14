<?php


namespace App\Controller;

use App\Entity\Client;
Use App\Entity\Ingredient;
use App\Repository\ClientRepository;
use Doctrine\ORM\EntityManagerInterface;
use ReallySimpleJWT\Token;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;


class ClientController extends AbstractController
{

    public function login(Request $request, ClientRepository $repository): JsonResponse
    {
        $username = $request->query->get('username');
        $password = $request->query->get('password');

        if($username === null or strlen($username) == 0)
        {
            return new JsonResponse(
                ['message' => 'Username not provided!'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        if($password === null or strlen($password) == 0)
        {
            return new JsonResponse(
                ['message' => 'Password not provided!'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $user = $repository->findOneBy(['username' => $username]);

        if ($user === null)
        {
            return new JsonResponse(
                ['message' => "Client with username $username not found!"],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        if (password_verify($password, $user->getPassword()))
        {
            return new JsonResponse(
                ['message' => 'Wrong password!'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $tokenPayload = [
            'userId' => $user->getId(),
            'alg' => 'HS256',
            'typ' => 'JWT',
        ];

        $token = Token::customPayload($tokenPayload, "I4*#LoVe5#@PHP");

        return new JsonResponse(
            ['message' => 'Auth successful!', 'token' => $token],
            JsonResponse::HTTP_OK
        );
    }

    public function register(Request $request, ClientRepository $repository, EntityManagerInterface $em): JsonResponse
    {
        $data = $request->toArray();

        $username = $data['username'];
        $password = $data['password'];
        $roles = $data['roles'];

        if (
            ($username === null or strlen($username) == 0)
            or ($password === null or strlen($password) == 0))
        {
            return new JsonResponse(
                ['message' => "Username and password is required!"],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $user = $repository->findOneBy(['username' => $username]);

        if ($user !== null)
        {
            return new JsonResponse(
                ['message' => "User with username $username already exists!"],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $salt = base64_encode(random_bytes(15));


        $hashedPassword = password_hash($password . $salt, PASSWORD_DEFAULT, ['cost' => 15]);

        $newUser = new Client(
            $username,
            $hashedPassword,
            $roles,
            $salt
        );

        $em->persist($newUser);
        $em->flush();

        return new JsonResponse(
            ['message' => 'Successful'],
            JsonResponse::HTTP_OK
        );
    }


    public function test(Request $request, EntityManagerInterface $em)
    {
        $ing = new Ingredient();
        $ing->setName("Hello");
        $ing->setImageName("Test");

        $em->persist($ing);

        $em->flush();
    }


}