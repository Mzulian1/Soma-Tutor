/**
 * Datos simulados para demostración del frontend sin backend
 */

export const mockTutores = [
    {
        id: 1,
        rut: '11.111.111-1',
        nombre: 'María José González Pérez',
        email: 'maria.gonzalez@example.cl',
        telefono: '+56912345678',
    },
    {
        id: 2,
        rut: '22.222.222-2',
        nombre: 'Carlos Alberto Muñoz Silva',
        email: 'carlos.munoz@example.cl',
        telefono: '+56987654321',
    },
]

export const mockResidentes = [
    {
        id: 1,
        rut: '5.555.555-5',
        nombre: 'Rosa Elena Contreras Morales',
        foto_url: 'https://i.pravatar.cc/150?img=47',
        fecha_nacimiento: '1940-03-15',
        sexo: 'F',
        estado_general: 'Estable',
        alergias: 'Penicilina, Polen',
    },
    {
        id: 2,
        rut: '6.666.666-6',
        nombre: 'Pedro Antonio Ramírez López',
        foto_url: 'https://i.pravatar.cc/150?img=60',
        fecha_nacimiento: '1938-07-22',
        sexo: 'M',
        estado_general: 'Delicado',
        alergias: 'Ninguna conocida',
    },
    {
        id: 3,
        rut: '7.777.777-7',
        nombre: 'Carmen Gloria Fernández Torres',
        foto_url: 'https://i.pravatar.cc/150?img=44',
        fecha_nacimiento: '1942-11-08',
        sexo: 'F',
        estado_general: 'Bueno',
        alergias: 'Mariscos',
    },
]

export const mockAntecedentes = [
    {
        id: 1,
        residente_id: 1,
        tipo: 'medico',
        descripcion: 'Hipertensión arterial diagnosticada en 2005',
        fecha: '2005-04-12',
    },
    {
        id: 2,
        residente_id: 1,
        tipo: 'medico',
        descripcion: 'Diabetes tipo 2 en tratamiento',
        fecha: '2010-08-20',
    },
    {
        id: 3,
        residente_id: 1,
        tipo: 'quirurgico',
        descripcion: 'Cirugía de cataratas ojo derecho',
        fecha: '2018-02-14',
    },
    {
        id: 4,
        residente_id: 1,
        tipo: 'familiar',
        descripcion: 'Antecedentes familiares de cardiopatías',
        fecha: null,
    },
]

export const mockMedicamentos = [
    {
        id: 1,
        residente_id: 1,
        nombre: 'Enalapril 10mg',
        via: 'Oral',
        dosis: '10mg',
        frecuencia: 'Cada 12 horas',
        indicaciones: 'Tomar con las comidas',
        activo: 1,
    },
    {
        id: 2,
        residente_id: 1,
        nombre: 'Metformina 850mg',
        via: 'Oral',
        dosis: '850mg',
        frecuencia: 'Cada 8 horas',
        indicaciones: 'Antes de las comidas principales',
        activo: 1,
    },
    {
        id: 3,
        residente_id: 1,
        nombre: 'Atorvastatina 20mg',
        via: 'Oral',
        dosis: '20mg',
        frecuencia: 'Una vez al día',
        indicaciones: 'Por la noche',
        activo: 1,
    },
    {
        id: 4,
        residente_id: 1,
        nombre: 'Omeprazol 20mg',
        via: 'Oral',
        dosis: '20mg',
        frecuencia: 'Una vez al día',
        indicaciones: 'En ayunas',
        activo: 1,
    },
]

export const mockVacunas = [
    {
        id: 1,
        residente_id: 1,
        nombre: 'Influenza 2024',
        fecha: '2024-03-15',
        lote: 'FLU2024-A45',
        profesional: 'Enf. Patricia Rojas',
    },
    {
        id: 2,
        residente_id: 1,
        nombre: 'COVID-19 (refuerzo)',
        fecha: '2024-01-20',
        lote: 'CV19-2024-B12',
        profesional: 'Enf. Juan Pérez',
    },
    {
        id: 3,
        residente_id: 1,
        nombre: 'Neumococo 23',
        fecha: '2023-06-10',
        lote: 'PNM23-2023-C8',
        profesional: 'Enf. María López',
    },
]

export const mockTestClinicos = [
    {
        id: 1,
        residente_id: 1,
        tipo: 'katz',
        fecha: '2024-10-01',
        puntaje: 4,
        grado: 'Dependencia moderada',
        profesional: 'TO. Andrea Muñoz',
        opciones_json: JSON.stringify({
            banarse: 1,
            vestirse: 1,
            ir_bano: 1,
            movilizarse: 0,
            continencia: 1,
            alimentarse: 0,
        }),
    },
    {
        id: 2,
        residente_id: 1,
        tipo: 'barthel',
        fecha: '2024-10-01',
        puntaje: 65,
        grado: 'Dependencia leve',
        profesional: 'TO. Andrea Muñoz',
        opciones_json: JSON.stringify({
            comer: 10,
            trasladarse: 10,
            aseo_personal: 5,
            uso_wc: 10,
            banarse: 5,
            desplazarse: 10,
            subir_escaleras: 5,
            vestirse: 5,
            control_heces: 5,
            control_orina: 0,
        }),
    },
    {
        id: 3,
        residente_id: 1,
        tipo: 'pfeiffer',
        fecha: '2024-09-15',
        puntaje: 3,
        grado: 'Deterioro cognitivo leve',
        profesional: 'Psic. Roberto Soto',
        opciones_json: JSON.stringify({
            errores: 3,
            descripcion: 'Presenta dificultad en orientación temporal y cálculo',
        }),
    },
    {
        id: 4,
        residente_id: 1,
        tipo: 'riesgo_caidas',
        fecha: '2024-10-05',
        puntaje: 6,
        grado: 'Riesgo medio',
        profesional: 'Enf. Carolina Díaz',
        opciones_json: JSON.stringify({
            caidas_previas: true,
            medicamentos: true,
            deficit_sensorial: false,
            estado_mental: 'Orientado',
            marcha: 'Insegura con ayuda',
        }),
    },
]

export const mockActividades = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    residente_id: 1,
    tipo: ['signos_vitales', 'administracion_medicamento', 'cuidado_personal', 'alimentacion', 'movilizacion'][
        i % 5
    ],
    fecha_hora: new Date(Date.now() - i * 12 * 60 * 60 * 1000).toISOString(),
    notas: [
        'PA: 130/80, FC: 72, T: 36.5°C, SatO2: 96%',
        'Administración de medicamentos de la mañana según indicación médica',
        'Aseo matinal realizado, residente colaborador',
        'Desayuno completo, buena tolerancia',
        'Caminata por pasillo con andador, 10 minutos',
    ][i % 5],
    adjunto_url: null,
}))

export const mockEventos = [
    {
        id: 1,
        residente_id: 1,
        tipo: 'control_medico',
        fecha_hora: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        descripcion:
            'Control médico rutinario realizado por Dr. Hernández. Presión arterial estable, glicemia dentro de rangos normales.',
        adjunto_url: null,
        critico: 0,
    },
    {
        id: 2,
        residente_id: 1,
        tipo: 'cambio_medicamento',
        fecha_hora: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        descripcion:
            'Ajuste en dosis de Enalapril de 5mg a 10mg según indicación médica por control de presión arterial.',
        adjunto_url: null,
        critico: 0,
    },
    {
        id: 3,
        residente_id: 1,
        tipo: 'caida',
        fecha_hora: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        descripcion:
            'Caída en habitación sin consecuencias graves. Se evaluó por enfermería, sin lesiones evidentes. Se reforzaron medidas de prevención.',
        adjunto_url: null,
        critico: 1,
    },
    {
        id: 4,
        residente_id: 1,
        tipo: 'evaluacion_nutricional',
        fecha_hora: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        descripcion:
            'Evaluación nutricional por nutricionista. IMC adecuado, se mantiene dieta hiposódica e hipoglucídica.',
        adjunto_url: null,
        critico: 0,
    },
]

export const mockDocumentos = [
    {
        id: 1,
        residente_id: 1,
        tipo: 'contrato',
        nombre: 'Contrato de Residencia 2024.pdf',
        url: 'docs/contrato_1.pdf',
        fecha: '2024-01-01',
    },
    {
        id: 2,
        residente_id: 1,
        tipo: 'liquidacion',
        nombre: 'Liquidación Octubre 2024.pdf',
        url: 'docs/liquidacion_oct_1.pdf',
        fecha: '2024-10-01',
    },
    {
        id: 3,
        residente_id: 1,
        tipo: 'liquidacion',
        nombre: 'Liquidación Septiembre 2024.pdf',
        url: 'docs/liquidacion_sep_1.pdf',
        fecha: '2024-09-01',
    },
    {
        id: 4,
        residente_id: 1,
        tipo: 'autorizacion',
        nombre: 'Autorización Tratamiento Médico.pdf',
        url: 'docs/autorizacion_1.pdf',
        fecha: '2024-01-15',
    },
]

// Relación tutor-residente
export const mockTutorResidente = [
    { tutor_id: 1, residente_id: 1 },
    { tutor_id: 1, residente_id: 3 },
    { tutor_id: 2, residente_id: 2 },
]



