<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateVacunasTable extends Migration
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
            'fecha' => [
                'type' => 'DATE',
            ],
            'lote' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
                'null' => true,
            ],
            'profesional' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
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
        $this->forge->createTable('vacunas');
        
        $this->db->query('CREATE INDEX idx_residente_vacunas ON vacunas(residente_id)');
    }

    public function down()
    {
        $this->forge->dropTable('vacunas');
    }
}



