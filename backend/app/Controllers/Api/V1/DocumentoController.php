<?php

namespace App\Controllers\Api\V1;

use CodeIgniter\RESTful\ResourceController;
use App\Models\TutorModel;
use App\Models\DocumentoModel;

/**
 * Controlador de Documentos
 */
class DocumentoController extends ResourceController
{
    protected $format = 'json';

    /**
     * GET /api/v1/residentes/:id/documentos
     */
    public function index($residenteId)
    {
        $tutorId = $this->request->tutorId;
        
        // Verificar acceso
        $tutorModel = new TutorModel();
        if (!$tutorModel->tieneAccesoResidente($tutorId, $residenteId)) {
            return $this->failForbidden('No tiene acceso a este residente');
        }

        $documentoModel = new DocumentoModel();
        $documentos = $documentoModel->getByResidente($residenteId);

        return $this->respond([
            'success' => true,
            'data' => $documentos
        ]);
    }

    /**
     * GET /api/v1/documentos/:id/download
     */
    public function download($documentoId)
    {
        $tutorId = $this->request->tutorId;
        
        $documentoModel = new DocumentoModel();
        $documento = $documentoModel->find($documentoId);

        if (!$documento) {
            return $this->failNotFound('Documento no encontrado');
        }

        // Verificar que el tutor tenga acceso al residente del documento
        $tutorModel = new TutorModel();
        if (!$tutorModel->tieneAccesoResidente($tutorId, $documento['residente_id'])) {
            return $this->failForbidden('No tiene acceso a este documento');
        }

        // Obtener ruta del archivo
        $filePath = WRITEPATH . 'storage/' . $documento['url'];

        if (!file_exists($filePath)) {
            return $this->failNotFound('Archivo no encontrado');
        }

        // Retornar archivo
        return $this->response
            ->setContentType('application/pdf')
            ->setHeader('Content-Disposition', 'attachment; filename="' . $documento['nombre'] . '"')
            ->setBody(file_get_contents($filePath));
    }
}



