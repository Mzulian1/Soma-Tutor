<?php

namespace App\Models;

use CodeIgniter\Model;

class EventoClinicoModel extends Model
{
    protected $table = 'eventos_clinicos';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = [
        'residente_id', 
        'tipo', 
        'fecha_hora', 
        'descripcion', 
        'adjunto_url',
        'critico'
    ];
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    public function getByResidente(int $residenteId, int $page = 1, int $perPage = 20): array
    {
        $offset = ($page - 1) * $perPage;
        
        return $this->where('residente_id', $residenteId)
                    ->orderBy('fecha_hora', 'DESC')
                    ->findAll($perPage, $offset);
    }

    public function countByResidente(int $residenteId): int
    {
        return $this->where('residente_id', $residenteId)->countAllResults();
    }

    public function getRecientes(int $residenteId, int $limit = 5): array
    {
        return $this->where('residente_id', $residenteId)
                    ->orderBy('fecha_hora', 'DESC')
                    ->findAll($limit);
    }
}



