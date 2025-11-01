<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateTestClinicosTable extends Migration
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
                'constraint' => '50',
                'comment' => 'katz, barthel, pfeiffer, riesgo_caidas',
            ],
            'fecha' => [
                'type' => 'DATE',
            ],
            'puntaje' => [
                'type' => 'INTEGER',
                'constraint' => 11,
            ],
            'grado' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
                'null' => true,
            ],
            'profesional' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
                'null' => true,
            ],
            'opciones_json' => [
                'type' => 'TEXT',
                'null' => true,
                'comment' => 'Detalles del test en JSON',
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
        $this->forge->createTable('test_clinicos');
        
        $this->db->query('CREATE INDEX idx_residente_test ON test_clinicos(residente_id)');
    }

    public function down()
    {
        $this->forge->dropTable('test_clinicos');
    }
}



