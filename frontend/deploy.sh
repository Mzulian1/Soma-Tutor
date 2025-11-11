#!/bin/bash

# Script de deployment para SOMA Tutor Frontend
# Uso: ./deploy.sh [netlify|vercel|docker]

set -e

echo "🚀 SOMA Tutor - Script de Deployment"
echo "===================================="
echo ""

# Verificar que estamos en la carpeta frontend
if [ ! -f "package.json" ]; then
    echo "❌ Error: Ejecuta este script desde la carpeta frontend/"
    exit 1
fi

# Función para build
build_app() {
    echo "📦 Construyendo la aplicación..."
    npm run build
    echo "✅ Build completado"
    echo ""
}

# Función para verificar build
verify_build() {
    if [ ! -d "dist" ]; then
        echo "❌ Error: No se encontró la carpeta dist/"
        exit 1
    fi
    echo "✅ Carpeta dist/ verificada"
    echo ""
}

# Netlify deployment
deploy_netlify() {
    echo "🌐 Deploying a Netlify..."
    
    if ! command -v netlify &> /dev/null; then
        echo "📥 Instalando Netlify CLI..."
        npm install -g netlify-cli
    fi
    
    build_app
    verify_build
    
    echo "🚀 Iniciando deploy..."
    netlify deploy --prod --dir=dist
    
    echo "✅ Deploy a Netlify completado!"
}

# Vercel deployment
deploy_vercel() {
    echo "▲ Deploying a Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        echo "📥 Instalando Vercel CLI..."
        npm install -g vercel
    fi
    
    build_app
    verify_build
    
    echo "🚀 Iniciando deploy..."
    vercel --prod
    
    echo "✅ Deploy a Vercel completado!"
}

# Docker deployment
deploy_docker() {
    echo "🐳 Construyendo imagen Docker..."
    
    if ! command -v docker &> /dev/null; then
        echo "❌ Error: Docker no está instalado"
        exit 1
    fi
    
    echo "🔨 Construyendo imagen..."
    docker build -t soma-tutor-frontend .
    
    echo "✅ Imagen construida: soma-tutor-frontend"
    echo ""
    echo "Para ejecutar el contenedor:"
    echo "  docker run -d -p 8080:80 --name soma-tutor soma-tutor-frontend"
    echo ""
    echo "Para detener el contenedor:"
    echo "  docker stop soma-tutor"
}

# Build local
build_local() {
    build_app
    verify_build
    
    echo "📂 Archivos generados en: frontend/dist/"
    echo ""
    echo "Para probar localmente:"
    echo "  npm run preview"
    echo ""
    echo "Para subir a servidor:"
    echo "  - Sube el contenido de dist/ por FTP/SFTP"
    echo "  - Asegúrate de configurar el rewrite de URLs"
    echo ""
}

# Menú principal
case "$1" in
    netlify)
        deploy_netlify
        ;;
    vercel)
        deploy_vercel
        ;;
    docker)
        deploy_docker
        ;;
    build)
        build_local
        ;;
    *)
        echo "Uso: ./deploy.sh [netlify|vercel|docker|build]"
        echo ""
        echo "Opciones:"
        echo "  netlify  - Deploy a Netlify"
        echo "  vercel   - Deploy a Vercel"
        echo "  docker   - Construir imagen Docker"
        echo "  build    - Solo construir (para servidor manual)"
        echo ""
        echo "Ejemplo:"
        echo "  ./deploy.sh netlify"
        exit 1
        ;;
esac

