<?php

namespace App\Models;

use CodeIgniter\Model;

/**
 * Modelo Tutor
 * Representa a los tutores/apoderados de residentes
 */
class TutorModel extends Model
{
    protected $table = 'tutores';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = ['rut', 'nombre', 'email', 'hash_password', 'telefono'];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    // Validation
    protected $validationRules = [
        'rut' => 'required|is_unique[tutores.rut]',
        'nombre' => 'required|min_length[3]',
        'email' => 'required|valid_email',
    ];

    protected $validationMessages = [
        'rut' => [
            'required' => 'El RUT es obligatorio',
            'is_unique' => 'Este RUT ya está registrado'
        ],
        'nombre' => [
            'required' => 'El nombre es obligatorio',
            'min_length' => 'El nombre debe tener al menos 3 caracteres'
        ],
        'email' => [
            'required' => 'El email es obligatorio',
            'valid_email' => 'Debe proporcionar un email válido'
        ]
    ];

    // Callbacks
    protected $beforeInsert = ['hashPassword'];
    protected $beforeUpdate = ['hashPassword'];

    protected function hashPassword(array $data)
    {
        if (isset($data['data']['hash_password'])) {
            $data['data']['hash_password'] = password_hash($data['data']['hash_password'], PASSWORD_BCRYPT);
        }
        return $data;
    }

    /**
     * Busca un tutor por RUT
     */
    public function findByRut(string $rut)
    {
        return $this->where('rut', $rut)->first();
    }

    /**
     * Obtiene los residentes asociados a un tutor
     */
    public function getResidentes(int $tutorId): array
    {
        $db = \Config\Database::connect();
        $builder = $db->table('residentes r');
        
        return $builder
            ->select('r.*')
            ->join('tutor_residente tr', 'tr.residente_id = r.id')
            ->where('tr.tutor_id', $tutorId)
            ->get()
            ->getResultArray();
    }

    /**
     * Verifica si un tutor tiene acceso a un residente
     */
    public function tieneAccesoResidente(int $tutorId, int $residenteId): bool
    {
        $db = \Config\Database::connect();
        $builder = $db->table('tutor_residente');
        
        $result = $builder
            ->where('tutor_id', $tutorId)
            ->where('residente_id', $residenteId)
            ->countAllResults();
            
        return $result > 0;
    }
}



