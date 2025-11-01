<?php

namespace App\Models;

use CodeIgniter\Model;

class VacunaModel extends Model
{
    protected $table = 'vacunas';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = [
        'residente_id', 
        'nombre', 
        'fecha', 
        'lote', 
        'profesional'
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
}



