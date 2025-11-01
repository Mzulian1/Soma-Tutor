<?php

namespace App\Controllers\Api\V1;

use CodeIgniter\RESTful\ResourceController;
use App\Models\ResidenteModel;
use App\Models\TutorModel;

/**
 * Controlador de Residentes
 */
class ResidenteController extends ResourceController
{
    protected $format = 'json';

    /**
     * GET /api/v1/residentes
     * Lista residentes del tutor autenticado
     */
    public function index()
    {
        $tutorId = $this->request->tutorId;
        
        $residenteModel = new ResidenteModel();
        $residentes = $residenteModel->getByTutor($tutorId);

        return $this->respond([
            'success' => true,
            'data' => $residentes
        ]);
    }

    /**
     * GET /api/v1/residentes/:id
     * Obtiene un residente específico si el tutor tiene acceso
     */
    public function show($id = null)
    {
        $tutorId = $this->request->tutorId;
        
        // Verificar acceso
        $tutorModel = new TutorModel();
        if (!$tutorModel->tieneAccesoResidente($tutorId, $id)) {
            return $this->failForbidden('No tiene acceso a este residente');
        }

        $residenteModel = new ResidenteModel();
        $residente = $residenteModel->find($id);

        if (!$residente) {
            return $this->failNotFound('Residente no encontrado');
        }

        return $this->respond([
            'success' => true,
            'data' => $residente
        ]);
    }
}



