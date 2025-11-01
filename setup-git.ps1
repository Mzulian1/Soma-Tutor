# Script para conectar Soma-Tutor con GitHub
# Ejecuta este script después de instalar Git

Write-Host "Configurando repositorio Git para Soma-Tutor..." -ForegroundColor Cyan

# Inicializar repositorio
Write-Host "`n1. Inicializando repositorio..." -ForegroundColor Yellow
git init

# Agregar todos los archivos
Write-Host "`n2. Agregando archivos al staging..." -ForegroundColor Yellow
git add .

# Primer commit
Write-Host "`n3. Creando primer commit..." -ForegroundColor Yellow
git commit -m "primer commit: proyecto Soma-Tutor completo"

# Renombrar rama a main
Write-Host "`n4. Configurando rama principal como 'main'..." -ForegroundColor Yellow
git branch -M main

# Agregar repositorio remoto
Write-Host "`n5. Conectando con repositorio remoto..." -ForegroundColor Yellow
git remote add origin https://github.com/Mzulian1/Soma-Tutor.git

# Push inicial
Write-Host "`n6. Subiendo código a GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host "`n✓ Proyecto subido exitosamente a GitHub!" -ForegroundColor Green
Write-Host "Repositorio: https://github.com/Mzulian1/Soma-Tutor" -ForegroundColor Cyan

