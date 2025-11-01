<?php

namespace App\Controllers\Api\V1;

use CodeIgniter\RESTful\ResourceController;
use App\Models\TutorModel;
use App\Models\AntecedenteModel;
use App\Models\MedicamentoModel;
use App\Models\VacunaModel;
use App\Models\TestClinicoModel;

/**
 * Controlador de Ficha Clínica
 */
class FichaController extends ResourceController
{
    protected $format = 'json';

    /**
     * GET /api/v1/residentes/:id/antecedentes
     */
    public function antecedentes($residenteId)
    {
        if (!$this->verificarAcceso($residenteId)) {
            return $this->failForbidden('No tiene acceso a este residente');
        }

        $antecedenteModel = new AntecedenteModel();
        $antecedentes = $antecedenteModel->getByResidente($residenteId);

        return $this->respond([
            'success' => true,
            'data' => $antecedentes
        ]);
    }

    /**
     * GET /api/v1/residentes/:id/medicamentos
     */
    public function medicamentos($residenteId)
    {
        if (!$this->verificarAcceso($residenteId)) {
            return $this->failForbidden('No tiene acceso a este residente');
        }

        $medicamentoModel = new MedicamentoModel();
        $medicamentos = $medicamentoModel->getByResidente($residenteId);

        return $this->respond([
            'success' => true,
            'data' => $medicamentos
        ]);
    }

    /**
     * GET /api/v1/residentes/:id/vacunas
     */
    public function vacunas($residenteId)
    {
        if (!$this->verificarAcceso($residenteId)) {
            return $this->failForbidden('No tiene acceso a este residente');
        }

        $vacunaModel = new VacunaModel();
        $vacunas = $vacunaModel->getByResidente($residenteId);

        return $this->respond([
            'success' => true,
            'data' => $vacunas
        ]);
    }

    /**
     * GET /api/v1/residentes/:id/test
     */
    public function testClinicos($residenteId)
    {
        if (!$this->verificarAcceso($residenteId)) {
            return $this->failForbidden('No tiene acceso a este residente');
        }

        $testModel = new TestClinicoModel();
        $tests = $testModel->getByResidente($residenteId);

        return $this->respond([
            'success' => true,
            'data' => $tests
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



