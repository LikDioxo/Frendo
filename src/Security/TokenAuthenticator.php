<?php
namespace App\Security;

use App\Entity\Client;
use App\Repository\ClientRepository;
use ReallySimpleJWT\Token;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;

class TokenAuthenticator extends AbstractGuardAuthenticator
{
    private $repository;
    private $tokenSecret;

    public function __construct(ClientRepository $repository, $tokenSecret)
    {
        $this->repository = $repository;
        $this->tokenSecret = $tokenSecret;
    }

    public function supports(Request $request)
    {
        return $request->headers->has('Authorization');
    }

    public function getCredentials(Request $request)
    {
        return [
            'token' => $request->headers->get('Authorization')
        ];
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        $token = $credentials['token'];
        if ($token === null) {
            return null;
        }

        $tokenSecret = $this->tokenSecret;

        if (!Token::validate($token, $tokenSecret))
        {
            throw new AccessDeniedException('Token is invalid!');
        }

        $payload = Token::getPayload($token, $tokenSecret);

        $userId = $payload['userId'];

        if ($userId === null)
        {
            throw new AccessDeniedException('Token not provide user_id in payload!');
        }

        $user = $this->repository->findOneBy(['id' => $userId]);

        if ($user === null)
        {
            throw new AccessDeniedException('Client not found!');
        }

        return $user;
    }

    public function checkCredentials($credentials, UserInterface $user)
    {
        return true;
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {
        return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        $data = [
            'message' => strtr($exception->getMessageKey(), $exception->getMessageData())

            // or to translate this message
            // $this->translator->trans($exception->getMessageKey(), $exception->getMessageData())
        ];

        return new JsonResponse($data, Response::HTTP_UNAUTHORIZED);
    }

    public function start(Request $request, AuthenticationException $authException = null)
    {
        $data = [
            'message' => 'Authentication Required'
        ];

        return new JsonResponse($data, Response::HTTP_UNAUTHORIZED);
    }

    public function supportsRememberMe()
    {
        return false;
    }
}