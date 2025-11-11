/**
 * Generador de PDFs sintéticos para demostración
 * Genera documentos PDF realistas con datos de ejemplo
 */

import jsPDF from 'jspdf'
import { formatDate } from './dateUtils'

interface DocumentoData {
    tipo: string
    nombre: string
    fecha: string
    residenteNombre: string
    residenteRut: string
    tutorNombre: string
    tutorRut: string
}

/**
 * Genera un PDF de Contrato de Residencia
 */
function generarContratoResidencia(doc: jsPDF, data: DocumentoData) {
    const pageWidth = doc.internal.pageSize.getWidth()
    
    // Encabezado
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('CONTRATO DE RESIDENCIA', pageWidth / 2, 20, { align: 'center' })
    
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(`ELEAM SOMA - Establecimiento de Larga Estadía para Adultos Mayores`, pageWidth / 2, 30, { align: 'center' })
    
    // Línea separadora
    doc.setLineWidth(0.5)
    doc.line(20, 35, pageWidth - 20, 35)
    
    // Contenido
    doc.setFontSize(10)
    let y = 45
    
    doc.setFont('helvetica', 'bold')
    doc.text('DATOS DEL RESIDENTE:', 20, y)
    y += 7
    
    doc.setFont('helvetica', 'normal')
    doc.text(`Nombre: ${data.residenteNombre}`, 20, y)
    y += 5
    doc.text(`RUT: ${data.residenteRut}`, 20, y)
    y += 10
    
    doc.setFont('helvetica', 'bold')
    doc.text('DATOS DEL TUTOR/APODERADO:', 20, y)
    y += 7
    
    doc.setFont('helvetica', 'normal')
    doc.text(`Nombre: ${data.tutorNombre}`, 20, y)
    y += 5
    doc.text(`RUT: ${data.tutorRut}`, 20, y)
    y += 10
    
    doc.setFont('helvetica', 'bold')
    doc.text('TÉRMINOS DEL CONTRATO:', 20, y)
    y += 7
    
    doc.setFont('helvetica', 'normal')
    const terminos = [
        'Por medio del presente contrato, el ELEAM SOMA se compromete a:',
        '',
        '1. Proporcionar alojamiento, alimentación y cuidados básicos al residente.',
        '2. Garantizar atención médica y de enfermería según las necesidades del residente.',
        '3. Administrar los medicamentos prescritos según indicación médica.',
        '4. Realizar actividades recreativas y de estimulación cognitiva.',
        '5. Mantener informado al tutor sobre el estado de salud del residente.',
        '',
        'El tutor/apoderado se compromete a:',
        '',
        '1. Pagar mensualmente el valor acordado de la residencia.',
        '2. Proveer la ropa y artículos de uso personal del residente.',
        '3. Asistir a reuniones y controles médicos cuando sea requerido.',
        '4. Mantener actualizados los datos de contacto.',
        '',
        'VALOR MENSUAL: $850.000 (Ochocientos cincuenta mil pesos)',
        'FORMA DE PAGO: Mensual, del 1 al 5 de cada mes',
        '',
        `FECHA DE INICIO: ${formatDate(data.fecha)}`,
        'DURACIÓN: Indefinida, renovable automáticamente',
    ]
    
    terminos.forEach((linea) => {
        if (y > 270) {
            doc.addPage()
            y = 20
        }
        doc.text(linea, 20, y, { maxWidth: pageWidth - 40 })
        y += 5
    })
    
    // Firmas
    y += 20
    if (y > 250) {
        doc.addPage()
        y = 20
    }
    
    doc.line(30, y, 80, y)
    doc.line(120, y, 170, y)
    y += 5
    doc.setFontSize(9)
    doc.text('Representante Legal ELEAM', 35, y)
    doc.text('Tutor/Apoderado', 135, y)
    
    // Pie de página
    doc.setFontSize(8)
    doc.setTextColor(100)
    doc.text('Este es un documento de demostración generado para pruebas del sistema SOMA Tutor', pageWidth / 2, 285, { align: 'center' })
}

/**
 * Genera un PDF de Liquidación Mensual
 */
function generarLiquidacionMensual(doc: jsPDF, data: DocumentoData) {
    const pageWidth = doc.internal.pageSize.getWidth()
    
    // Encabezado
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('LIQUIDACIÓN MENSUAL', pageWidth / 2, 20, { align: 'center' })
    
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    const mes = new Date(data.fecha).toLocaleDateString('es-CL', { month: 'long', year: 'numeric' })
    doc.text(`Período: ${mes.toUpperCase()}`, pageWidth / 2, 30, { align: 'center' })
    
    doc.setLineWidth(0.5)
    doc.line(20, 35, pageWidth - 20, 35)
    
    let y = 45
    
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('DATOS DEL RESIDENTE:', 20, y)
    y += 7
    
    doc.setFont('helvetica', 'normal')
    doc.text(`Nombre: ${data.residenteNombre}`, 20, y)
    y += 5
    doc.text(`RUT: ${data.residenteRut}`, 20, y)
    y += 10
    
    doc.setFont('helvetica', 'bold')
    doc.text('DETALLE DE SERVICIOS:', 20, y)
    y += 10
    
    // Tabla de servicios
    doc.setFont('helvetica', 'normal')
    const servicios = [
        { item: 'Mensualidad Base', valor: 650000 },
        { item: 'Atención de Enfermería', valor: 120000 },
        { item: 'Alimentación Especializada', valor: 80000 },
        { item: 'Actividades Recreativas', valor: 0 },
        { item: 'Peluquería', valor: 8000 },
        { item: 'Podología', valor: 12000 },
    ]
    
    servicios.forEach((servicio) => {
        doc.text(servicio.item, 25, y)
        doc.text(`$${servicio.valor.toLocaleString('es-CL')}`, pageWidth - 50, y, { align: 'right' })
        y += 6
    })
    
    y += 5
    doc.line(20, y, pageWidth - 20, y)
    y += 7
    
    const total = servicios.reduce((sum, s) => sum + s.valor, 0)
    doc.setFont('helvetica', 'bold')
    doc.text('TOTAL A PAGAR:', 25, y)
    doc.text(`$${total.toLocaleString('es-CL')}`, pageWidth - 50, y, { align: 'right' })
    
    y += 15
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text('Fecha de vencimiento: 05/' + new Date(data.fecha).toLocaleDateString('es-CL', { month: '2-digit', year: 'numeric' }), 20, y)
    y += 5
    doc.text('Cuenta Bancario: Banco Estado - Cuenta Corriente N° 12345678', 20, y)
    y += 5
    doc.text('RUT ELEAM SOMA: 76.XXX.XXX-X', 20, y)
    
    // Pie de página
    doc.setFontSize(8)
    doc.setTextColor(100)
    doc.text('Este es un documento de demostración generado para pruebas del sistema SOMA Tutor', pageWidth / 2, 285, { align: 'center' })
}

/**
 * Genera un PDF de Autorización Médica
 */
function generarAutorizacionMedica(doc: jsPDF, data: DocumentoData) {
    const pageWidth = doc.internal.pageSize.getWidth()
    
    // Encabezado
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('AUTORIZACIÓN DE TRATAMIENTO MÉDICO', pageWidth / 2, 20, { align: 'center' })
    
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(`Fecha: ${formatDate(data.fecha)}`, pageWidth / 2, 30, { align: 'center' })
    
    doc.setLineWidth(0.5)
    doc.line(20, 35, pageWidth - 20, 35)
    
    let y = 45
    
    doc.setFont('helvetica', 'bold')
    doc.text('YO,', 20, y)
    doc.setFont('helvetica', 'normal')
    doc.text(`${data.tutorNombre}, RUT ${data.tutorRut}`, 30, y)
    y += 7
    
    doc.setFont('helvetica', 'bold')
    doc.text('En mi calidad de tutor/apoderado de:', 20, y)
    y += 7
    
    doc.setFont('helvetica', 'normal')
    doc.text(`${data.residenteNombre}, RUT ${data.residenteRut}`, 20, y)
    y += 10
    
    doc.setFont('helvetica', 'bold')
    doc.text('AUTORIZO:', 20, y)
    y += 10
    
    doc.setFont('helvetica', 'normal')
    const autorizaciones = [
        '1. La realización de procedimientos médicos de rutina y de urgencia que el equipo',
        '   médico del ELEAM SOMA considere necesarios para el bienestar del residente.',
        '',
        '2. La administración de medicamentos prescritos por profesionales médicos',
        '   debidamente habilitados.',
        '',
        '3. El traslado del residente a centros asistenciales en caso de emergencia médica.',
        '',
        '4. La realización de exámenes diagnósticos (análisis clínicos, radiografías, etc.)',
        '   cuando sean requeridos.',
        '',
        '5. La hospitalización en caso de que el estado de salud lo requiera.',
        '',
        'Declaro haber sido informado(a) sobre los procedimientos mencionados y autorizo',
        'expresamente su realización, eximiendo al ELEAM SOMA de responsabilidad en',
        'situaciones de urgencia que requieran atención médica inmediata.',
        '',
        'Esta autorización tiene validez indefinida mientras el residente permanezca bajo',
        'el cuidado del ELEAM SOMA.',
    ]
    
    autorizaciones.forEach((linea) => {
        doc.text(linea, 20, y, { maxWidth: pageWidth - 40 })
        y += 5
    })
    
    // Firmas
    y += 20
    doc.line(30, y, 80, y)
    doc.line(120, y, 170, y)
    y += 5
    doc.setFontSize(9)
    doc.text('Tutor/Apoderado', 45, y)
    doc.text('Testigo', 145, y)
    
    // Pie de página
    doc.setFontSize(8)
    doc.setTextColor(100)
    doc.text('Este es un documento de demostración generado para pruebas del sistema SOMA Tutor', pageWidth / 2, 285, { align: 'center' })
}

/**
 * Genera un PDF completo de la ficha clínica del residente
 */
export function generarPDFFichaClinica(residente: any, antecedentes: any[], medicamentos: any[], vacunas: any[]): Blob {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    let y = 20

    // Configurar metadatos
    doc.setProperties({
        title: `Ficha Clínica - ${residente.nombre}`,
        subject: 'Ficha Clínica Completa',
        author: 'SOMA Tutor - Sistema de Gestión',
        creator: 'SOMA Tutor Web App',
    })

    // Encabezado principal
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('FICHA CLÍNICA COMPLETA', pageWidth / 2, y, { align: 'center' })
    y += 10
    
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text('ELEAM SOMA - Establecimiento de Larga Estadía para Adultos Mayores', pageWidth / 2, y, { align: 'center' })
    y += 5
    
    doc.setFontSize(9)
    doc.setTextColor(100)
    doc.text(`Fecha de emisión: ${new Date().toLocaleDateString('es-CL')}`, pageWidth / 2, y, { align: 'center' })
    y += 5

    doc.setTextColor(0)
    doc.setLineWidth(0.5)
    doc.line(20, y, pageWidth - 20, y)
    y += 10

    // Datos del residente
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('DATOS DEL RESIDENTE', 20, y)
    y += 8

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(`Nombre: ${residente.nombre}`, 20, y)
    y += 5
    doc.text(`RUT: ${residente.rut}`, 20, y)
    y += 5
    
    const edad = new Date().getFullYear() - new Date(residente.fecha_nacimiento).getFullYear()
    doc.text(`Edad: ${edad} años`, 20, y)
    y += 5
    doc.text(`Fecha de Nacimiento: ${new Date(residente.fecha_nacimiento).toLocaleDateString('es-CL')}`, 20, y)
    y += 5
    doc.text(`Sexo: ${residente.sexo === 'M' ? 'Masculino' : 'Femenino'}`, 20, y)
    y += 5
    doc.text(`Estado General: ${residente.estado_general}`, 20, y)
    y += 5
    
    doc.setFont('helvetica', 'bold')
    doc.text('Alergias: ', 20, y)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(200, 0, 0)
    doc.text(residente.alergias || 'Ninguna conocida', 45, y)
    doc.setTextColor(0)
    y += 10

    // Antecedentes Médicos
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('ANTECEDENTES MÉDICOS', 20, y)
    y += 8

    doc.setFontSize(9)
    if (antecedentes.length > 0) {
        antecedentes.forEach((ant, index) => {
            if (y > 270) {
                doc.addPage()
                y = 20
            }
            doc.setFont('helvetica', 'bold')
            const tipoLabel = ant.tipo === 'medico' ? 'Médico' : ant.tipo === 'quirurgico' ? 'Quirúrgico' : 'Familiar'
            doc.text(`${index + 1}. [${tipoLabel}]`, 20, y)
            doc.setFont('helvetica', 'normal')
            y += 4
            doc.text(ant.descripcion, 25, y, { maxWidth: pageWidth - 50 })
            y += 4
            if (ant.fecha) {
                doc.setTextColor(100)
                doc.text(`Fecha: ${new Date(ant.fecha).toLocaleDateString('es-CL')}`, 25, y)
                doc.setTextColor(0)
            }
            y += 6
        })
    } else {
        doc.setFont('helvetica', 'italic')
        doc.text('Sin antecedentes registrados', 25, y)
        y += 6
    }
    y += 5

    // Medicamentos Activos
    if (y > 240) {
        doc.addPage()
        y = 20
    }

    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('MEDICAMENTOS ACTIVOS', 20, y)
    y += 8

    doc.setFontSize(9)
    if (medicamentos.length > 0) {
        medicamentos.forEach((med, index) => {
            if (y > 270) {
                doc.addPage()
                y = 20
            }
            doc.setFont('helvetica', 'bold')
            doc.text(`${index + 1}. ${med.nombre}`, 20, y)
            y += 4
            doc.setFont('helvetica', 'normal')
            doc.text(`   Dosis: ${med.dosis} | Vía: ${med.via}`, 25, y)
            y += 4
            doc.text(`   Frecuencia: ${med.frecuencia}`, 25, y)
            y += 4
            doc.text(`   Indicaciones: ${med.indicaciones}`, 25, y)
            y += 6
        })
    } else {
        doc.setFont('helvetica', 'italic')
        doc.text('Sin medicamentos activos', 25, y)
        y += 6
    }
    y += 5

    // Vacunas
    if (y > 240) {
        doc.addPage()
        y = 20
    }

    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('REGISTRO DE VACUNACIÓN', 20, y)
    y += 8

    doc.setFontSize(9)
    if (vacunas.length > 0) {
        vacunas.forEach((vac, index) => {
            if (y > 270) {
                doc.addPage()
                y = 20
            }
            doc.setFont('helvetica', 'bold')
            doc.text(`${index + 1}. ${vac.nombre}`, 20, y)
            y += 4
            doc.setFont('helvetica', 'normal')
            doc.text(`   Fecha: ${new Date(vac.fecha).toLocaleDateString('es-CL')}`, 25, y)
            y += 4
            doc.text(`   Lote: ${vac.lote}`, 25, y)
            y += 4
            doc.text(`   Administrado por: ${vac.profesional}`, 25, y)
            y += 6
        })
    } else {
        doc.setFont('helvetica', 'italic')
        doc.text('Sin registro de vacunación', 25, y)
        y += 6
    }

    // Pie de página en todas las páginas
    const totalPages = doc.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i)
        doc.setFontSize(8)
        doc.setTextColor(100)
        doc.text(
            'Este documento es confidencial y de uso exclusivo del tutor/apoderado autorizado',
            pageWidth / 2,
            285,
            { align: 'center' }
        )
        doc.text(`Página ${i} de ${totalPages}`, pageWidth - 30, 285, { align: 'right' })
    }

    return doc.output('blob')
}

/**
 * Función principal para generar PDFs según el tipo
 */
export function generarPDFSintetico(data: DocumentoData): Blob {
    const doc = new jsPDF()
    
    // Configurar metadatos
    doc.setProperties({
        title: data.nombre,
        subject: `Documento ${data.tipo}`,
        author: 'SOMA Tutor - Sistema de Gestión',
        creator: 'SOMA Tutor Web App',
    })
    
    // Generar según el tipo
    switch (data.tipo) {
        case 'contrato':
            generarContratoResidencia(doc, data)
            break
        case 'liquidacion':
            generarLiquidacionMensual(doc, data)
            break
        case 'autorizacion':
            generarAutorizacionMedica(doc, data)
            break
        default:
            // Documento genérico
            doc.setFontSize(16)
            doc.text(`Documento: ${data.nombre}`, 20, 20)
            doc.setFontSize(12)
            doc.text(`Tipo: ${data.tipo}`, 20, 35)
            doc.text(`Fecha: ${formatDate(data.fecha)}`, 20, 45)
            doc.text(`Residente: ${data.residenteNombre}`, 20, 55)
    }
    
    return doc.output('blob')
}

