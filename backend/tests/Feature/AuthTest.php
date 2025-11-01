<?php

namespace Tests\Feature;

use CodeIgniter\Test\CIUnitTestCase;
use CodeIgniter\Test\FeatureTestTrait;

/**
 * Tests de autenticación
 */
class AuthTest extends CIUnitTestCase
{
    use FeatureTestTrait;

    protected function setUp(): void
    {
        parent::setUp();
        // Aquí podrías resetear la BD o cargar fixtures
    }

    public function testLoginConCredencialesValidas()
    {
        $result = $this->post('/api/v1/auth/login', [
            'rut' => '11.111.111-1',
            'password' => 'Demo123*'
        ]);

        $result->assertStatus(200);
        $result->assertJSONFragment(['success' => true]);
        $this->assertTrue(isset($result->getJSON()->accessToken));
    }

    public function testLoginConCredencialesInvalidas()
    {
        $result = $this->post('/api/v1/auth/login', [
            'rut' => '11.111.111-1',
            'password' => 'wrongpassword'
        ]);

        $result->assertStatus(401);
    }

    public function testLoginSinRUT()
    {
        $result = $this->post('/api/v1/auth/login', [
            'password' => 'Demo123*'
        ]);

        $result->assertStatus(400);
    }
}



