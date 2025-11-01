<?php

namespace App\Controllers\Api\V1;

use CodeIgniter\RESTful\ResourceController;
use App\Models\TutorModel;

/**
 * Controlador de Tutores
 */
class TutorController extends ResourceController
{
    protected $format = 'json';

    /**
     * GET /api/v1/tutores/me
     * Obtiene información del tutor autenticado y sus residentes
     */
    public function me()
    {
        $tutorId = $this->request->tutorId;
        
        $tutorModel = new TutorModel();
        $tutor = $tutorModel->find($tutorId);
        
        if (!$tutor) {
            return $this->failNotFound('Tutor no encontrado');
        }

        // Obtener residentes asociados
        $residentes = $tutorModel->getResidentes($tutorId);

        // Remover hash_password de la respuesta
        unset($tutor['hash_password']);

        return $this->respond([
            'success' => true,
            'data' => [
                'tutor' => $tutor,
                'residentes' => $residentes
            ]
        ]);
    }
}



