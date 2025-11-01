<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateMedicamentosTable extends Migration
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
            'nombre' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
            'via' => [
                'type' => 'VARCHAR',
                'constraint' => '50',
                'comment' => 'oral, intravenosa, subcutanea, etc',
            ],
            'dosis' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
            ],
            'frecuencia' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
            ],
            'indicaciones' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'activo' => [
                'type' => 'INTEGER',
                'constraint' => 1,
                'default' => 1,
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
        $this->forge->createTable('medicamentos');
        
        $this->db->query('CREATE INDEX idx_residente_medicamentos ON medicamentos(residente_id)');
    }

    public function down()
    {
        $this->forge->dropTable('medicamentos');
    }
}



