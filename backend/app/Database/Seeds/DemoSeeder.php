<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

/**
 * Seeder con datos sintéticos para demo de SOMA Tutor
 * Genera tutores, residentes y toda la información asociada
 */
class DemoSeeder extends Seeder
{
    public function run()
    {
        // Limpiar tablas existentes
        $this->db->table('tutor_residente')->truncate();
        $this->db->table('documentos')->truncate();
        $this->db->table('eventos_clinicos')->truncate();
        $this->db->table('actividades')->truncate();
        $this->db->table('test_clinicos')->truncate();
        $this->db->table('vacunas')->truncate();
        $this->db->table('medicamentos')->truncate();
        $this->db->table('antecedentes')->truncate();
        $this->db->table('residentes')->truncate();
        $this->db->table('tutores')->truncate();

        // Crear tutores
        $tutores = $this->createTutores();
        
        // Crear residentes
        $residentes = $this->createResidentes();
        
        // Asociar tutores con residentes
        $this->associateTutoresResidentes($tutores, $residentes);
        
        // Crear datos médicos para cada residente
        foreach ($residentes as $residente) {
            $this->createAntecedentes($residente['id']);
            $this->createMedicamentos($residente['id']);
            $this->createVacunas($residente['id']);
            $this->createTestClinicos($residente['id']);
            $this->createActividades($residente['id']);
            $this->createEventosClinicos($residente['id']);
            $this->createDocumentos($residente['id']);
        }

        echo "✓ Seeder ejecutado exitosamente\n";
        echo "✓ Tutores creados: " . count($tutores) . "\n";
        echo "✓ Residentes creados: " . count($residentes) . "\n";
        echo "\nCredenciales de acceso:\n";
        echo "------------------------\n";
        echo "RUT: 11.111.111-1\n";
        echo "Contraseña: Demo123*\n";
        echo "------------------------\n";
        echo "RUT: 22.222.222-2\n";
        echo "Contraseña: Demo123*\n";
    }

    private function createTutores(): array
    {
        $tutores = [
            [
                'rut' => '11.111.111-1',
                'nombre' => 'María José González Pérez',
                'email' => 'maria.gonzalez@example.cl',
                'telefono' => '+56912345678',
                'hash_password' => password_hash('Demo123*', PASSWORD_BCRYPT),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'rut' => '22.222.222-2',
                'nombre' => 'Carlos Alberto Muñoz Silva',
                'email' => 'carlos.munoz@example.cl',
                'telefono' => '+56987654321',
                'hash_password' => password_hash('Demo123*', PASSWORD_BCRYPT),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
        ];

        $this->db->table('tutores')->insertBatch($tutores);
        
        // Obtener IDs insertados
        $result = [];
        foreach ($tutores as $tutor) {
            $inserted = $this->db->table('tutores')->where('rut', $tutor['rut'])->get()->getRowArray();
            $result[] = $inserted;
        }
        
        return $result;
    }

    private function createResidentes(): array
    {
        $residentes = [
            [
                'rut' => '5.555.555-5',
                'nombre' => 'Rosa Elena Contreras Morales',
                'foto_url' => 'https://i.pravatar.cc/150?img=47',
                'fecha_nacimiento' => '1940-03-15',
                'sexo' => 'F',
                'estado_general' => 'Estable',
                'alergias' => 'Penicilina, Polen',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'rut' => '6.666.666-6',
                'nombre' => 'Pedro Antonio Ramírez López',
                'foto_url' => 'https://i.pravatar.cc/150?img=60',
                'fecha_nacimiento' => '1938-07-22',
                'sexo' => 'M',
                'estado_general' => 'Delicado',
                'alergias' => 'Ninguna conocida',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'rut' => '7.777.777-7',
                'nombre' => 'Carmen Gloria Fernández Torres',
                'foto_url' => 'https://i.pravatar.cc/150?img=44',
                'fecha_nacimiento' => '1942-11-08',
                'sexo' => 'F',
                'estado_general' => 'Bueno',
                'alergias' => 'Mariscos',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
        ];

        $this->db->table('residentes')->insertBatch($residentes);
        
        // Obtener IDs insertados
        $result = [];
        foreach ($residentes as $residente) {
            $inserted = $this->db->table('residentes')->where('rut', $residente['rut'])->get()->getRowArray();
            $result[] = $inserted;
        }
        
        return $result;
    }

    private function associateTutoresResidentes(array $tutores, array $residentes): void
    {
        // María José → Rosa Elena y Carmen Gloria
        $this->db->table('tutor_residente')->insert([
            'tutor_id' => $tutores[0]['id'],
            'residente_id' => $residentes[0]['id'],
            'created_at' => date('Y-m-d H:i:s'),
        ]);
        
        $this->db->table('tutor_residente')->insert([
            'tutor_id' => $tutores[0]['id'],
            'residente_id' => $residentes[2]['id'],
            'created_at' => date('Y-m-d H:i:s'),
        ]);

        // Carlos → Pedro Antonio
        $this->db->table('tutor_residente')->insert([
            'tutor_id' => $tutores[1]['id'],
            'residente_id' => $residentes[1]['id'],
            'created_at' => date('Y-m-d H:i:s'),
        ]);
    }

    private function createAntecedentes(int $residenteId): void
    {
        $antecedentes = [
            [
                'residente_id' => $residenteId,
                'tipo' => 'medico',
                'descripcion' => 'Hipertensión arterial diagnosticada en 2005',
                'fecha' => '2005-04-12',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'residente_id' => $residenteId,
                'tipo' => 'medico',
                'descripcion' => 'Diabetes tipo 2 en tratamiento',
                'fecha' => '2010-08-20',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'residente_id' => $residenteId,
                'tipo' => 'quirurgico',
                'descripcion' => 'Cirugía de cataratas ojo derecho',
                'fecha' => '2018-02-14',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'residente_id' => $residenteId,
                'tipo' => 'familiar',
                'descripcion' => 'Antecedentes familiares de cardiopatías',
                'fecha' => null,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
        ];

        $this->db->table('antecedentes')->insertBatch($antecedentes);
    }

    private function createMedicamentos(int $residenteId): void
    {
        $medicamentos = [
            [
                'residente_id' => $residenteId,
                'nombre' => 'Enalapril 10mg',
                'via' => 'Oral',
                'dosis' => '10mg',
                'frecuencia' => 'Cada 12 horas',
                'indicaciones' => 'Tomar con las comidas',
                'activo' => 1,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'residente_id' => $residenteId,
                'nombre' => 'Metformina 850mg',
                'via' => 'Oral',
                'dosis' => '850mg',
                'frecuencia' => 'Cada 8 horas',
                'indicaciones' => 'Antes de las comidas principales',
                'activo' => 1,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'residente_id' => $residenteId,
                'nombre' => 'Atorvastatina 20mg',
                'via' => 'Oral',
                'dosis' => '20mg',
                'frecuencia' => 'Una vez al día',
                'indicaciones' => 'Por la noche',
                'activo' => 1,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'residente_id' => $residenteId,
                'nombre' => 'Omeprazol 20mg',
                'via' => 'Oral',
                'dosis' => '20mg',
                'frecuencia' => 'Una vez al día',
                'indicaciones' => 'En ayunas',
                'activo' => 1,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
        ];

        $this->db->table('medicamentos')->insertBatch($medicamentos);
    }

    private function createVacunas(int $residenteId): void
    {
        $vacunas = [
            [
                'residente_id' => $residenteId,
                'nombre' => 'Influenza 2024',
                'fecha' => '2024-03-15',
                'lote' => 'FLU2024-A45',
                'profesional' => 'Enf. Patricia Rojas',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'residente_id' => $residenteId,
                'nombre' => 'COVID-19 (refuerzo)',
                'fecha' => '2024-01-20',
                'lote' => 'CV19-2024-B12',
                'profesional' => 'Enf. Juan Pérez',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'residente_id' => $residenteId,
                'nombre' => 'Neumococo 23',
                'fecha' => '2023-06-10',
                'lote' => 'PNM23-2023-C8',
                'profesional' => 'Enf. María López',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
        ];

        $this->db->table('vacunas')->insertBatch($vacunas);
    }

    private function createTestClinicos(int $residenteId): void
    {
        $tests = [
            [
                'residente_id' => $residenteId,
                'tipo' => 'katz',
                'fecha' => '2024-10-01',
                'puntaje' => 4,
                'grado' => 'Dependencia moderada',
                'profesional' => 'TO. Andrea Muñoz',
                'opciones_json' => json_encode([
                    'banarse' => 1,
                    'vestirse' => 1,
                    'ir_bano' => 1,
                    'movilizarse' => 0,
                    'continencia' => 1,
                    'alimentarse' => 0,
                ]),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'residente_id' => $residenteId,
                'tipo' => 'barthel',
                'fecha' => '2024-10-01',
                'puntaje' => 65,
                'grado' => 'Dependencia leve',
                'profesional' => 'TO. Andrea Muñoz',
                'opciones_json' => json_encode([
                    'comer' => 10,
                    'trasladarse' => 10,
                    'aseo_personal' => 5,
                    'uso_wc' => 10,
                    'banarse' => 5,
                    'desplazarse' => 10,
                    'subir_escaleras' => 5,
                    'vestirse' => 5,
                    'control_heces' => 5,
                    'control_orina' => 0,
                ]),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'residente_id' => $residenteId,
                'tipo' => 'pfeiffer',
                'fecha' => '2024-09-15',
                'puntaje' => 3,
                'grado' => 'Deterioro cognitivo leve',
                'profesional' => 'Psic. Roberto Soto',
                'opciones_json' => json_encode([
                    'errores' => 3,
                    'descripcion' => 'Presenta dificultad en orientación temporal y cálculo'
                ]),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'residente_id' => $residenteId,
                'tipo' => 'riesgo_caidas',
                'fecha' => '2024-10-05',
                'puntaje' => 6,
                'grado' => 'Riesgo medio',
                'profesional' => 'Enf. Carolina Díaz',
                'opciones_json' => json_encode([
                    'caidas_previas' => true,
                    'medicamentos' => true,
                    'deficit_sensorial' => false,
                    'estado_mental' => 'Orientado',
                    'marcha' => 'Insegura con ayuda'
                ]),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
        ];

        $this->db->table('test_clinicos')->insertBatch($tests);
    }

    private function createActividades(int $residenteId): void
    {
        $actividades = [];
        $tipos = ['signos_vitales', 'administracion_medicamento', 'cuidado_personal', 'alimentacion', 'movilizacion'];
        
        // Crear 30 actividades en los últimos 15 días
        for ($i = 0; $i < 30; $i++) {
            $dias = rand(0, 15);
            $hora = rand(8, 20);
            $minuto = rand(0, 59);
            
            $actividades[] = [
                'residente_id' => $residenteId,
                'tipo' => $tipos[array_rand($tipos)],
                'fecha_hora' => date('Y-m-d H:i:s', strtotime("-{$dias} days {$hora}:{$minuto}:00")),
                'notas' => $this->getNotaActividad($tipos[array_rand($tipos)]),
                'adjunto_url' => null,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ];
        }

        $this->db->table('actividades')->insertBatch($actividades);
    }

    private function createEventosClinicos(int $residenteId): void
    {
        $eventos = [
            [
                'residente_id' => $residenteId,
                'tipo' => 'control_medico',
                'fecha_hora' => date('Y-m-d H:i:s', strtotime('-5 days')),
                'descripcion' => 'Control médico rutinario realizado por Dr. Hernández. Presión arterial estable, glicemia dentro de rangos normales.',
                'adjunto_url' => null,
                'critico' => 0,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'residente_id' => $residenteId,
                'tipo' => 'cambio_medicamento',
                'fecha_hora' => date('Y-m-d H:i:s', strtotime('-12 days')),
                'descripcion' => 'Ajuste en dosis de Enalapril de 5mg a 10mg según indicación médica por control de presión arterial.',
                'adjunto_url' => null,
                'critico' => 0,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'residente_id' => $residenteId,
                'tipo' => 'caida',
                'fecha_hora' => date('Y-m-d H:i:s', strtotime('-20 days')),
                'descripcion' => 'Caída en habitación sin consecuencias graves. Se evaluó por enfermería, sin lesiones evidentes. Se reforzaron medidas de prevención.',
                'adjunto_url' => null,
                'critico' => 1,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'residente_id' => $residenteId,
                'tipo' => 'evaluacion_nutricional',
                'fecha_hora' => date('Y-m-d H:i:s', strtotime('-30 days')),
                'descripcion' => 'Evaluación nutricional por nutricionista. IMC adecuado, se mantiene dieta hiposódica e hipoglucídica.',
                'adjunto_url' => null,
                'critico' => 0,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
        ];

        $this->db->table('eventos_clinicos')->insertBatch($eventos);
    }

    private function createDocumentos(int $residenteId): void
    {
        // Crear directorio si no existe
        $storageDir = WRITEPATH . 'storage/docs';
        if (!is_dir($storageDir)) {
            mkdir($storageDir, 0755, true);
        }

        $documentos = [
            [
                'residente_id' => $residenteId,
                'tipo' => 'contrato',
                'nombre' => 'Contrato de Residencia 2024.pdf',
                'url' => 'docs/contrato_' . $residenteId . '.pdf',
                'fecha' => '2024-01-01',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'residente_id' => $residenteId,
                'tipo' => 'liquidacion',
                'nombre' => 'Liquidación Octubre 2024.pdf',
                'url' => 'docs/liquidacion_oct_' . $residenteId . '.pdf',
                'fecha' => '2024-10-01',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'residente_id' => $residenteId,
                'tipo' => 'liquidacion',
                'nombre' => 'Liquidación Septiembre 2024.pdf',
                'url' => 'docs/liquidacion_sep_' . $residenteId . '.pdf',
                'fecha' => '2024-09-01',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'residente_id' => $residenteId,
                'tipo' => 'autorizacion',
                'nombre' => 'Autorización Tratamiento Médico.pdf',
                'url' => 'docs/autorizacion_' . $residenteId . '.pdf',
                'fecha' => '2024-01-15',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
        ];

        $this->db->table('documentos')->insertBatch($documentos);

        // Crear PDFs simulados (archivos de texto como placeholder)
        foreach ($documentos as $doc) {
            $filePath = WRITEPATH . 'storage/' . $doc['url'];
            $content = "DOCUMENTO DEMO - SOMA TUTOR\n\n";
            $content .= "Tipo: " . strtoupper($doc['tipo']) . "\n";
            $content .= "Nombre: " . $doc['nombre'] . "\n";
            $content .= "Fecha: " . $doc['fecha'] . "\n";
            $content .= "\nEste es un documento de demostración.\n";
            $content .= "En producción, aquí iría el PDF real.\n";
            
            file_put_contents($filePath, $content);
        }
    }

    private function getNotaActividad(string $tipo): string
    {
        $notas = [
            'signos_vitales' => [
                'PA: 130/80, FC: 72, T: 36.5°C, SatO2: 96%',
                'PA: 125/75, FC: 68, T: 36.8°C, SatO2: 97%',
                'PA: 135/85, FC: 75, T: 36.6°C, SatO2: 95%',
            ],
            'administracion_medicamento' => [
                'Administración de medicamentos de la mañana según indicación médica',
                'Medicamentos del mediodía administrados sin incidentes',
                'Medicación nocturna administrada correctamente',
            ],
            'cuidado_personal' => [
                'Aseo matinal realizado, residente colaborador',
                'Cambio de ropa y aseo personal realizado',
                'Higiene bucal y peinado realizados',
            ],
            'alimentacion' => [
                'Desayuno completo, buena tolerancia',
                'Almuerzo consumido en 80%, hidratación adecuada',
                'Cena completa, residente con buen apetito',
            ],
            'movilizacion' => [
                'Caminata por pasillo con andador, 10 minutos',
                'Ejercicios de movilidad en sala de kinesiología',
                'Traslado a comedor en silla de ruedas',
            ],
        ];

        return $notas[$tipo][array_rand($notas[$tipo])];
    }
}



