<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

/**
 * Filtro CORS
 * Maneja las solicitudes CORS para la API
 */
class CorsFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        // Manejar preflight requests
        if ($request->getMethod() === 'options') {
            $response = service('response');
            $response->setStatusCode(200);
            return $response;
        }
        
        return $request;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        $allowedOrigins = explode(',', getenv('CORS_ALLOWED_ORIGINS') ?: '*');
        $origin = $request->getHeaderLine('Origin');
        
        if (in_array('*', $allowedOrigins) || in_array($origin, $allowedOrigins)) {
            $response->setHeader('Access-Control-Allow-Origin', $origin ?: '*');
        }
        
        $response->setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        $response->setHeader('Access-Control-Max-Age', '3600');
        $response->setHeader('Access-Control-Allow-Credentials', 'true');
        
        return $response;
    }
}



