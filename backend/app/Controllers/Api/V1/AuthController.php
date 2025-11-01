<?php

namespace App\Controllers\Api\V1;

use CodeIgniter\RESTful\ResourceController;
use App\Models\TutorModel;
use Lcobucci\JWT\Configuration;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key\InMemory;

/**
 * Controlador de Autenticación
 * Maneja login y generación de JWT
 */
class AuthController extends ResourceController
{
    protected $format = 'json';

    /**
     * POST /api/v1/auth/login
     * Autentica un tutor y retorna JWT
     */
    public function login()
    {
        $rules = [
            'rut' => 'required',
            'password' => 'required|min_length[6]'
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $rut = $this->request->getVar('rut');
        $password = $this->request->getVar('password');

        // Rate limiting simple (debería usar Redis en producción)
        $this->checkRateLimit($rut);

        $tutorModel = new TutorModel();
        $tutor = $tutorModel->findByRut($rut);

        if (!$tutor) {
            $this->logFailedAttempt($rut);
            return $this->failUnauthorized('Credenciales inválidas');
        }

        if (!password_verify($password, $tutor['hash_password'])) {
            $this->logFailedAttempt($rut);
            return $this->failUnauthorized('Credenciales inválidas');
        }

        // Generar JWT
        $token = $this->generateJWT($tutor);

        return $this->respond([
            'success' => true,
            'accessToken' => $token,
            'tutor' => [
                'id' => $tutor['id'],
                'rut' => $tutor['rut'],
                'nombre' => $tutor['nombre'],
                'email' => $tutor['email']
            ]
        ]);
    }

    /**
     * POST /api/v1/auth/refresh
     * Refresca el token JWT (opcional)
     */
    public function refresh()
    {
        // Implementación opcional para refresh token
        return $this->respond([
            'success' => true,
            'message' => 'Refresh token no implementado en esta versión demo'
        ]);
    }

    /**
     * Genera un token JWT
     */
    private function generateJWT(array $tutor): string
    {
        $config = Configuration::forSymmetricSigner(
            new Sha256(),
            InMemory::plainText(getenv('JWT_SECRET'))
        );

        $now = new \DateTimeImmutable();
        $expiresAt = $now->modify('+' . getenv('JWT_EXPIRE') . ' seconds');

        $token = $config->builder()
            ->issuedBy(getenv('JWT_ISSUER'))
            ->issuedAt($now)
            ->expiresAt($expiresAt)
            ->withClaim('tutor_id', $tutor['id'])
            ->withClaim('rut', $tutor['rut'])
            ->withClaim('nombre', $tutor['nombre'])
            ->getToken($config->signer(), $config->signingKey());

        return $token->toString();
    }

    /**
     * Verifica rate limiting simple
     */
    private function checkRateLimit(string $rut)
    {
        $cacheFile = WRITEPATH . 'cache/rate_limit_' . md5($rut) . '.txt';
        
        if (file_exists($cacheFile)) {
            $attempts = (int) file_get_contents($cacheFile);
            $limit = (int) getenv('RATE_LIMIT_LOGIN') ?: 5;
            
            if ($attempts >= $limit) {
                // Verificar si han pasado 5 minutos
                $fileTime = filemtime($cacheFile);
                $window = (int) getenv('RATE_LIMIT_WINDOW') ?: 300;
                
                if (time() - $fileTime < $window) {
                    log_message('warning', "Rate limit excedido para RUT: {$rut}");
                    die(json_encode([
                        'error' => true,
                        'message' => 'Demasiados intentos. Intente nuevamente en 5 minutos.'
                    ]));
                } else {
                    // Reiniciar contador
                    file_put_contents($cacheFile, '1');
                }
            } else {
                file_put_contents($cacheFile, $attempts + 1);
            }
        } else {
            // Crear archivo de control
            if (!is_dir(WRITEPATH . 'cache')) {
                mkdir(WRITEPATH . 'cache', 0755, true);
            }
            file_put_contents($cacheFile, '1');
        }
    }

    /**
     * Registra intentos fallidos de login
     */
    private function logFailedAttempt(string $rut)
    {
        log_message('warning', "Intento fallido de login para RUT: {$rut} desde IP: " . $this->request->getIPAddress());
    }
}



