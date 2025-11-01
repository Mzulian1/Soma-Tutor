<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateTutorResidenteTable extends Migration
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
            'tutor_id' => [
                'type' => 'INTEGER',
                'constraint' => 11,
                'unsigned' => true,
            ],
            'residente_id' => [
                'type' => 'INTEGER',
                'constraint' => 11,
                'unsigned' => true,
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);
        
        $this->forge->addKey('id', true);
        $this->forge->createTable('tutor_residente');
        
        // Índices para mejorar rendimiento
        $this->db->query('CREATE INDEX idx_tutor_residente ON tutor_residente(tutor_id, residente_id)');
    }

    public function down()
    {
        $this->forge->dropTable('tutor_residente');
    }
}



