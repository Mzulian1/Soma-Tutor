#!/bin/bash

# Script para preparar el deployment en cPanel (Bash)
# Uso: ./prepare-cpanel.sh

set -e

echo "🚀 Preparando deployment para cPanel..."
echo "======================================="
echo ""

# Verificar que estamos en la carpeta frontend
if [ ! -f "package.json" ]; then
    echo "❌ Error: Ejecuta este script desde la carpeta frontend/"
    exit 1
fi

# Limpiar dist anterior
if [ -d "dist" ]; then
    echo "🧹 Limpiando carpeta dist/ anterior..."
    rm -rf dist
fi

# Build de la aplicación
echo "📦 Construyendo la aplicación..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error en el build"
    exit 1
fi

echo "✅ Build completado"
echo ""

# Copiar .htaccess
echo "📄 Copiando .htaccess..."
if [ -f ".htaccess" ]; then
    cp .htaccess dist/.htaccess
    echo "✅ .htaccess copiado"
else
    echo "⚠️  Advertencia: No se encontró .htaccess"
fi
echo ""

# Crear archivo ZIP
ZIP_NAME="soma-tutor-cpanel-$(date +%Y%m%d-%H%M%S).zip"
echo "📦 Creando archivo ZIP: $ZIP_NAME"

# Comprimir contenido de dist
cd dist
zip -r ../$ZIP_NAME * .[^.]*
cd ..

if [ -f "$ZIP_NAME" ]; then
    echo "✅ Archivo ZIP creado exitosamente"
    echo ""
    echo "📂 Ubicación del archivo:"
    echo "   $(pwd)/$ZIP_NAME"
    echo ""
else
    echo "❌ Error al crear el archivo ZIP"
    exit 1
fi

# Resumen
echo "✨ ¡Preparación completada!"
echo ""
echo "📋 Próximos pasos:"
echo ""
echo "1. Accede a tu cPanel"
echo "   URL: https://tudominio.com/cpanel"
echo ""
echo "2. Abre File Manager → public_html/"
echo ""
echo "3. Click en 'Upload' y sube el archivo:"
echo "   $ZIP_NAME"
echo ""
echo "4. Click derecho en el archivo ZIP → 'Extract'"
echo ""
echo "5. Elimina el archivo ZIP después de extraer"
echo ""
echo "6. Verifica que .htaccess esté presente"
echo "   (Settings → Show Hidden Files)"
echo ""
echo "7. Accede a tu sitio:"
echo "   https://tudominio.com"
echo ""
echo "📚 Documentación completa: docs/DEPLOYMENT-CPANEL.md"
echo ""

