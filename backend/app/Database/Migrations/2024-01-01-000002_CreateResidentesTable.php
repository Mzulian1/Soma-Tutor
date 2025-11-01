<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateResidentesTable extends Migration
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
            'rut' => [
                'type' => 'VARCHAR',
                'constraint' => '12',
                'unique' => true,
            ],
            'nombre' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
            'foto_url' => [
                'type' => 'VARCHAR',
                'constraint' => '500',
                'null' => true,
            ],
            'fecha_nacimiento' => [
                'type' => 'DATE',
            ],
            'sexo' => [
                'type' => 'VARCHAR',
                'constraint' => '1',
                'comment' => 'M/F/O',
            ],
            'estado_general' => [
                'type' => 'VARCHAR',
                'constraint' => '50',
                'null' => true,
            ],
            'alergias' => [
                'type' => 'TEXT',
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
        $this->forge->createTable('residentes');
    }

    public function down()
    {
        $this->forge->dropTable('residentes');
    }
}



