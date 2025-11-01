<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

// Ruta por defecto
$routes->get('/', static function () {
    return view('welcome_message');
});

/**
 * --------------------------------------------------------------------
 * API Routes v1
 * --------------------------------------------------------------------
 */
$routes->group('api/v1', ['namespace' => 'App\Controllers\Api\V1'], static function ($routes) {
    
    // Autenticación (sin middleware JWT)
    $routes->post('auth/login', 'AuthController::login');
    $routes->post('auth/refresh', 'AuthController::refresh');
    
    // Rutas protegidas con JWT
    $routes->group('', ['filter' => 'jwt'], static function ($routes) {
        
        // Tutor
        $routes->get('tutores/me', 'TutorController::me');
        
        // Residentes
        $routes->get('residentes', 'ResidenteController::index');
        $routes->get('residentes/(:num)', 'ResidenteController::show/$1');
        
        // Ficha del residente
        $routes->get('residentes/(:num)/antecedentes', 'FichaController::antecedentes/$1');
        $routes->get('residentes/(:num)/medicamentos', 'FichaController::medicamentos/$1');
        $routes->get('residentes/(:num)/vacunas', 'FichaController::vacunas/$1');
        $routes->get('residentes/(:num)/test', 'FichaController::testClinicos/$1');
        
        // Seguimiento y actividades
        $routes->get('residentes/(:num)/actividades', 'SeguimientoController::actividades/$1');
        $routes->get('residentes/(:num)/eventos', 'SeguimientoController::eventos/$1');
        
        // Documentos
        $routes->get('residentes/(:num)/documentos', 'DocumentoController::index/$1');
        $routes->get('documentos/(:num)/download', 'DocumentoController::download/$1');
    });
});



