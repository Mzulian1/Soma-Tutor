# Script para preparar el deployment en cPanel (PowerShell)
# Uso: .\prepare-cpanel.ps1

Write-Host "🚀 Preparando deployment para cPanel..." -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que estamos en la carpeta frontend
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Ejecuta este script desde la carpeta frontend/" -ForegroundColor Red
    exit 1
}

# Limpiar dist anterior
if (Test-Path "dist") {
    Write-Host "🧹 Limpiando carpeta dist/ anterior..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force dist
}

# Build de la aplicación
Write-Host "📦 Construyendo la aplicación..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error en el build" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completado" -ForegroundColor Green
Write-Host ""

# Copiar .htaccess
Write-Host "📄 Copiando .htaccess..." -ForegroundColor Yellow
if (Test-Path ".htaccess") {
    Copy-Item ".htaccess" "dist\.htaccess" -Force
    Write-Host "✅ .htaccess copiado" -ForegroundColor Green
} else {
    Write-Host "⚠️  Advertencia: No se encontró .htaccess" -ForegroundColor Yellow
}
Write-Host ""

# Crear archivo ZIP
$zipName = "soma-tutor-cpanel-$(Get-Date -Format 'yyyyMMdd-HHmmss').zip"
Write-Host "📦 Creando archivo ZIP: $zipName" -ForegroundColor Yellow

# Comprimir contenido de dist
Push-Location dist
Compress-Archive -Path * -DestinationPath "..\$zipName" -Force
Pop-Location

if (Test-Path $zipName) {
    Write-Host "✅ Archivo ZIP creado exitosamente" -ForegroundColor Green
    Write-Host ""
    Write-Host "📂 Ubicación del archivo:" -ForegroundColor Cyan
    Write-Host "   $(Get-Location)\$zipName" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "❌ Error al crear el archivo ZIP" -ForegroundColor Red
    exit 1
}

# Resumen
Write-Host "✨ ¡Preparación completada!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Accede a tu cPanel" -ForegroundColor White
Write-Host "   URL: https://tudominio.com/cpanel" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Abre File Manager → public_html/" -ForegroundColor White
Write-Host ""
Write-Host "3. Click en 'Upload' y sube el archivo:" -ForegroundColor White
Write-Host "   $zipName" -ForegroundColor Yellow
Write-Host ""
Write-Host "4. Click derecho en el archivo ZIP → 'Extract'" -ForegroundColor White
Write-Host ""
Write-Host "5. Elimina el archivo ZIP después de extraer" -ForegroundColor White
Write-Host ""
Write-Host "6. Verifica que .htaccess esté presente" -ForegroundColor White
Write-Host "   (Settings → Show Hidden Files)" -ForegroundColor Gray
Write-Host ""
Write-Host "7. Accede a tu sitio:" -ForegroundColor White
Write-Host "   https://tudominio.com" -ForegroundColor Green
Write-Host ""
Write-Host "📚 Documentación completa: docs\DEPLOYMENT-CPANEL.md" -ForegroundColor Cyan
Write-Host ""

# Abrir carpeta donde está el ZIP
$response = Read-Host "¿Abrir carpeta del archivo ZIP? (s/N)"
if ($response -eq 's' -or $response -eq 'S') {
    Start-Process explorer.exe -ArgumentList "/select,`"$(Get-Location)\$zipName`""
}

