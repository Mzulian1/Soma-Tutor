<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateActividadesTable extends Migration
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
                'comment' => 'signos_vitales, administracion_medicamento, cuidado',
            ],
            'fecha_hora' => [
                'type' => 'DATETIME',
            ],
            'notas' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'adjunto_url' => [
                'type' => 'VARCHAR',
                'constraint' => '500',
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
        $this->forge->createTable('actividades');
        
        $this->db->query('CREATE INDEX idx_residente_actividades ON actividades(residente_id, fecha_hora)');
    }

    public function down()
    {
        $this->forge->dropTable('actividades');
    }
}



