<?php

namespace App\Controllers\Api\V1;

use CodeIgniter\RESTful\ResourceController;
use App\Models\TutorModel;
use App\Models\ActividadModel;
use App\Models\EventoClinicoModel;

/**
 * Controlador de Seguimiento y Actividades
 */
class SeguimientoController extends ResourceController
{
    protected $format = 'json';

    /**
     * GET /api/v1/residentes/:id/actividades
     */
    public function actividades($residenteId)
    {
        if (!$this->verificarAcceso($residenteId)) {
            return $this->failForbidden('No tiene acceso a este residente');
        }

        $page = $this->request->getGet('page') ?? 1;
        $perPage = $this->request->getGet('per_page') ?? 20;

        $actividadModel = new ActividadModel();
        $actividades = $actividadModel->getByResidente($residenteId, $page, $perPage);
        $total = $actividadModel->countByResidente($residenteId);

        return $this->respond([
            'success' => true,
            'data' => $actividades,
            'pagination' => [
                'current_page' => (int) $page,
                'per_page' => (int) $perPage,
                'total' => $total,
                'total_pages' => ceil($total / $perPage)
            ]
        ]);
    }

    /**
     * GET /api/v1/residentes/:id/eventos
     */
    public function eventos($residenteId)
    {
        if (!$this->verificarAcceso($residenteId)) {
            return $this->failForbidden('No tiene acceso a este residente');
        }

        $page = $this->request->getGet('page') ?? 1;
        $perPage = $this->request->getGet('per_page') ?? 20;

        $eventoModel = new EventoClinicoModel();
        $eventos = $eventoModel->getByResidente($residenteId, $page, $perPage);
        $total = $eventoModel->countByResidente($residenteId);

        return $this->respond([
            'success' => true,
            'data' => $eventos,
            'pagination' => [
                'current_page' => (int) $page,
                'per_page' => (int) $perPage,
                'total' => $total,
                'total_pages' => ceil($total / $perPage)
            ]
        ]);
    }

    /**
     * Verifica que el tutor tenga acceso al residente
     */
    private function verificarAcceso($residenteId): bool
    {
        $tutorId = $this->request->tutorId;
        $tutorModel = new TutorModel();
        return $tutorModel->tieneAccesoResidente($tutorId, $residenteId);
    }
}



