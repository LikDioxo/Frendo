<?php


namespace App\Controller;

use App\Entity\Client;
use App\Repository\ClientRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\ORMException;
use ErrorException;
use ReallySimpleJWT\Token;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\JsonException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class ClientController extends AbstractController
{

    public function login(
        Request $request,
        ClientRepository $clientRepository
    ): JsonResponse
    {
        $username = $request->query->get('username');
        $password = $request->query->get('password');
        $role = $request->query->get('role');

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

        $user = $clientRepository->findOneBy(['username' => $username]);

        if ($user === null)
        {
            return new JsonResponse(
                ['message' => "Client with username $username does not exists!"],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        if(!in_array($role, $user->getRoles()))
        {
            return new JsonResponse(
                ['message' => "Client with username and role $username and $role does not exists!"],
                JsonResponse::HTTP_NOT_FOUND
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
            [
                'message' => 'Auth successful!',
                'token' => $token,
                'user_id' => $user->getId(),
                'user_role' => $role
            ]
        );
    }

    public function register(
        Request $request,
        ClientRepository $repository,
        EntityManagerInterface $entityManager
    ): JsonResponse
    {
        try {
            $data = $request->toArray();
        }
        catch (JsonException $exception) {
            return new JsonResponse(
                ['message' => $exception->getMessage()],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        try {
            $username = $data['username'];
            $password = $data['password'];
            $roles = $data['roles'];
        }
        catch (ErrorException) {
            return new JsonResponse(
                ['message' => 'Request body not provide some of this parameters: username, password, roles!'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

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
                ['message' => "User with username: $username already exists!"],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $salt = base64_encode(random_bytes(15));


        $hashedPassword = password_hash(
            $password . $salt,
            PASSWORD_DEFAULT,
            ['cost' => 15]
        );

        $newUser = new Client(
            $username,
            $hashedPassword,
            $roles,
            $salt
        );

        $entityManager->persist($newUser);
        $entityManager->flush();

        return new JsonResponse(
            ['id' => $newUser->getId()],
            JsonResponse::HTTP_CREATED
        );
    }

    public function getAll(
        Request $request,
        ClientRepository $clientRepository,
        SerializerInterface $serializer
    ): JsonResponse
    {
        # TODO: Add roles query parameter support!
        $requestQuery = $request->query->all();

        try {
            $objects = $clientRepository->findBy($requestQuery);
        }
        catch (ORMException $exception)
        {
            return new JsonResponse(
                ['message' => $exception->getMessage()],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }
        $result = [];

        foreach ($objects as $object)
        {
            $result[] = $serializer->normalize(
                $object,
                context: [AbstractNormalizer::IGNORED_ATTRIBUTES => ['salt']]
            );
        }

        return new JsonResponse($result);
    }

    public function delete(
        $userId,
        ClientRepository $clientRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse
    {
        $user = $clientRepository->find($userId);
        if ($user === null) {
            return new JsonResponse(
                ['message' => "User with id: $userId does not exists!"]
            );
        }

        $entityManager->remove($user);
        $entityManager->flush();
        return new JsonResponse(status: JsonResponse::HTTP_NO_CONTENT);
    }
}
