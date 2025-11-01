<?php

namespace App\Models;

use CodeIgniter\Model;

/**
 * Modelo Residente
 * Representa a los residentes de los ELEAMs
 */
class ResidenteModel extends Model
{
    protected $table = 'residentes';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = [
        'rut', 
        'nombre', 
        'foto_url', 
        'fecha_nacimiento', 
        'sexo',
        'estado_general',
        'alergias'
    ];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    /**
     * Obtiene residentes de un tutor específico
     */
    public function getByTutor(int $tutorId): array
    {
        $db = \Config\Database::connect();
        $builder = $db->table($this->table);
        
        return $builder
            ->select('residentes.*')
            ->join('tutor_residente', 'tutor_residente.residente_id = residentes.id')
            ->where('tutor_residente.tutor_id', $tutorId)
            ->get()
            ->getResultArray();
    }

    /**
     * Obtiene un residente si el tutor tiene acceso
     */
    public function getByIdAndTutor(int $residenteId, int $tutorId)
    {
        $db = \Config\Database::connect();
        $builder = $db->table($this->table);
        
        return $builder
            ->select('residentes.*')
            ->join('tutor_residente', 'tutor_residente.residente_id = residentes.id')
            ->where('residentes.id', $residenteId)
            ->where('tutor_residente.tutor_id', $tutorId)
            ->get()
            ->getRowArray();
    }
}



