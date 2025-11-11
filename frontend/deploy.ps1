# Script de deployment para SOMA Tutor Frontend (PowerShell)
# Uso: .\deploy.ps1 [netlify|vercel|docker|build]

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet('netlify','vercel','docker','build')]
    [string]$Target
)

Write-Host "🚀 SOMA Tutor - Script de Deployment" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que estamos en la carpeta frontend
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Ejecuta este script desde la carpeta frontend/" -ForegroundColor Red
    exit 1
}

# Función para build
function Build-App {
    Write-Host "📦 Construyendo la aplicación..." -ForegroundColor Yellow
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error en el build" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Build completado" -ForegroundColor Green
    Write-Host ""
}

# Función para verificar build
function Verify-Build {
    if (-not (Test-Path "dist")) {
        Write-Host "❌ Error: No se encontró la carpeta dist/" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Carpeta dist/ verificada" -ForegroundColor Green
    Write-Host ""
}

# Netlify deployment
function Deploy-Netlify {
    Write-Host "🌐 Deploying a Netlify..." -ForegroundColor Cyan
    
    if (-not (Get-Command netlify -ErrorAction SilentlyContinue)) {
        Write-Host "📥 Instalando Netlify CLI..." -ForegroundColor Yellow
        npm install -g netlify-cli
    }
    
    Build-App
    Verify-Build
    
    Write-Host "🚀 Iniciando deploy..." -ForegroundColor Yellow
    netlify deploy --prod --dir=dist
    
    Write-Host "✅ Deploy a Netlify completado!" -ForegroundColor Green
}

# Vercel deployment
function Deploy-Vercel {
    Write-Host "▲ Deploying a Vercel..." -ForegroundColor Cyan
    
    if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
        Write-Host "📥 Instalando Vercel CLI..." -ForegroundColor Yellow
        npm install -g vercel
    }
    
    Build-App
    Verify-Build
    
    Write-Host "🚀 Iniciando deploy..." -ForegroundColor Yellow
    vercel --prod
    
    Write-Host "✅ Deploy a Vercel completado!" -ForegroundColor Green
}

# Docker deployment
function Deploy-Docker {
    Write-Host "🐳 Construyendo imagen Docker..." -ForegroundColor Cyan
    
    if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
        Write-Host "❌ Error: Docker no está instalado" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "🔨 Construyendo imagen..." -ForegroundColor Yellow
    docker build -t soma-tutor-frontend .
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error construyendo la imagen" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Imagen construida: soma-tutor-frontend" -ForegroundColor Green
    Write-Host ""
    Write-Host "Para ejecutar el contenedor:" -ForegroundColor Yellow
    Write-Host "  docker run -d -p 8080:80 --name soma-tutor soma-tutor-frontend"
    Write-Host ""
    Write-Host "Para detener el contenedor:" -ForegroundColor Yellow
    Write-Host "  docker stop soma-tutor"
}

# Build local
function Build-Local {
    Build-App
    Verify-Build
    
    Write-Host "📂 Archivos generados en: frontend\dist\" -ForegroundColor Green
    Write-Host ""
    Write-Host "Para probar localmente:" -ForegroundColor Yellow
    Write-Host "  npm run preview"
    Write-Host ""
    Write-Host "Para subir a servidor:" -ForegroundColor Yellow
    Write-Host "  - Sube el contenido de dist\ por FTP/SFTP"
    Write-Host "  - Asegúrate de configurar el rewrite de URLs"
    Write-Host ""
}

# Ejecutar según el target
switch ($Target) {
    'netlify' { Deploy-Netlify }
    'vercel'  { Deploy-Vercel }
    'docker'  { Deploy-Docker }
    'build'   { Build-Local }
}

