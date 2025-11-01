<?php

namespace App\Models;

use CodeIgniter\Model;

class TestClinicoModel extends Model
{
    protected $table = 'test_clinicos';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = [
        'residente_id', 
        'tipo', 
        'fecha', 
        'puntaje', 
        'grado',
        'profesional',
        'opciones_json'
    ];
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    public function getByResidente(int $residenteId): array
    {
        return $this->where('residente_id', $residenteId)
                    ->orderBy('fecha', 'DESC')
                    ->findAll();
    }

    public function getByTipo(int $residenteId, string $tipo): array
    {
        return $this->where('residente_id', $residenteId)
                    ->where('tipo', $tipo)
                    ->orderBy('fecha', 'DESC')
                    ->findAll();
    }
}



