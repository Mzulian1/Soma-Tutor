<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateAntecedentesTable extends Migration
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
                'comment' => 'medico, quirurgico, alergico, familiar',
            ],
            'descripcion' => [
                'type' => 'TEXT',
            ],
            'fecha' => [
                'type' => 'DATE',
                'null' => true,
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
        $this->forge->createTable('antecedentes');
        
        $this->db->query('CREATE INDEX idx_residente_antecedentes ON antecedentes(residente_id)');
    }

    public function down()
    {
        $this->forge->dropTable('antecedentes');
    }
}



