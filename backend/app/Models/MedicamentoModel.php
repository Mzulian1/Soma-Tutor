<?php

namespace App\Models;

use CodeIgniter\Model;

class MedicamentoModel extends Model
{
    protected $table = 'medicamentos';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = [
        'residente_id', 
        'nombre', 
        'via', 
        'dosis', 
        'frecuencia', 
        'indicaciones',
        'activo'
    ];
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    public function getByResidente(int $residenteId, bool $soloActivos = true): array
    {
        $builder = $this->where('residente_id', $residenteId);
        
        if ($soloActivos) {
            $builder->where('activo', 1);
        }
        
        return $builder->orderBy('nombre', 'ASC')->findAll();
    }
}



