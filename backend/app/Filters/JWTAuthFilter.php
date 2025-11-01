<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Lcobucci\JWT\Configuration;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key\InMemory;
use Lcobucci\JWT\Validation\Constraint\SignedWith;
use Lcobucci\JWT\Validation\Constraint\IssuedBy;

/**
 * Filtro de autenticación JWT
 * Valida el token JWT en el header Authorization
 */
class JWTAuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $authHeader = $request->getHeaderLine('Authorization');
        
        if (empty($authHeader)) {
            return $this->unauthorizedResponse('Token no proporcionado');
        }

        // Extraer token del header "Bearer {token}"
        $token = null;
        if (preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
            $token = $matches[1];
        }

        if (!$token) {
            return $this->unauthorizedResponse('Formato de token inválido');
        }

        try {
            $config = Configuration::forSymmetricSigner(
                new Sha256(),
                InMemory::plainText(getenv('JWT_SECRET'))
            );

            $parsedToken = $config->parser()->parse($token);
            
            // Validar firma
            $config->setValidationConstraints(
                new SignedWith($config->signer(), $config->signingKey()),
                new IssuedBy(getenv('JWT_ISSUER'))
            );

            $constraints = $config->validationConstraints();
            if (!$config->validator()->validate($parsedToken, ...$constraints)) {
                return $this->unauthorizedResponse('Token inválido');
            }

            // Verificar expiración
            $now = new \DateTimeImmutable();
            if ($parsedToken->isExpired($now)) {
                return $this->unauthorizedResponse('Token expirado');
            }

            // Guardar datos del usuario en el request
            $request->tutorId = $parsedToken->claims()->get('tutor_id');
            $request->tutorRut = $parsedToken->claims()->get('rut');

        } catch (\Exception $e) {
            log_message('error', 'JWT Error: ' . $e->getMessage());
            return $this->unauthorizedResponse('Error al validar token');
        }

        return $request;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        return $response;
    }

    private function unauthorizedResponse(string $message)
    {
        $response = service('response');
        $response->setStatusCode(401);
        $response->setJSON([
            'error' => true,
            'message' => $message
        ]);
        return $response;
    }
}



