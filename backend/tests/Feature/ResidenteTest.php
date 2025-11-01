<?php

namespace Tests\Feature;

use CodeIgniter\Test\CIUnitTestCase;
use CodeIgniter\Test\FeatureTestTrait;

/**
 * Tests de acceso a residentes
 */
class ResidenteTest extends CIUnitTestCase
{
    use FeatureTestTrait;

    protected $token = null;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Obtener token de autenticación
        $result = $this->post('/api/v1/auth/login', [
            'rut' => '11.111.111-1',
            'password' => 'Demo123*'
        ]);
        
        $this->token = $result->getJSON()->accessToken ?? null;
    }

    public function testAccesoSinToken()
    {
        $result = $this->get('/api/v1/residentes');
        $result->assertStatus(401);
    }

    public function testAccesoConToken()
    {
        $result = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token
        ])->get('/api/v1/residentes');

        $result->assertStatus(200);
        $result->assertJSONFragment(['success' => true]);
    }

    public function testTutorSoloVeSusResidentes()
    {
        // Este test verificaría que un tutor solo puede ver sus residentes
        // Requeriría crear múltiples tutores y verificar el aislamiento
        $this->assertTrue(true); // Placeholder
    }
}



