<?php

namespace App\Models;

use CodeIgniter\Model;

class AntecedenteModel extends Model
{
    protected $table = 'antecedentes';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = ['residente_id', 'tipo', 'descripcion', 'fecha'];
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



