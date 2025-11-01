<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateEventosClinicosTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INTEGER',
                'constraint' => 11,
                'unsigned' => true,
                'auto_increment' => true,
            ],
            'residente_id' => [
                'type' => 'INTEGER',
                'constraint' => 11,
                'unsigned' => true,
            ],
            'tipo' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
                'comment' => 'caida, cambio_medicamento, hospitalizacion, etc',
            ],
            'fecha_hora' => [
                'type' => 'DATETIME',
            ],
            'descripcion' => [
                'type' => 'TEXT',
            ],
            'adjunto_url' => [
                'type' => 'VARCHAR',
                'constraint' => '500',
                'null' => true,
            ],
            'critico' => [
                'type' => 'INTEGER',
                'constraint' => 1,
                'default' => 0,
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);
        
        $this->forge->addKey('id', true);
        $this->forge->createTable('eventos_clinicos');
        
        $this->db->query('CREATE INDEX idx_residente_eventos ON eventos_clinicos(residente_id, fecha_hora)');
    }

    public function down()
    {
        $this->forge->dropTable('eventos_clinicos');
    }
}



