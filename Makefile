.PHONY: help up down build logs backend-shell frontend-install frontend-build backend-setup seed clean

# Colores para mensajes
CYAN := \033[0;36m
GREEN := \033[0;32m
YELLOW := \033[1;33m
NC := \033[0m

help: ## Muestra esta ayuda
	@echo "$(CYAN)SOMA Tutor - Comandos disponibles:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-20s$(NC) %s\n", $$1, $$2}'

up: ## Levanta todos los servicios
	@echo "$(YELLOW)Levantando servicios...$(NC)"
	docker-compose up -d
	@echo "$(GREEN)✓ Servicios levantados$(NC)"
	@echo "$(CYAN)Frontend: http://localhost$(NC)"
	@echo "$(CYAN)Backend API: http://localhost/api$(NC)"

down: ## Detiene todos los servicios
	@echo "$(YELLOW)Deteniendo servicios...$(NC)"
	docker-compose down
	@echo "$(GREEN)✓ Servicios detenidos$(NC)"

build: ## Construye las imágenes Docker
	@echo "$(YELLOW)Construyendo imágenes...$(NC)"
	docker-compose build --no-cache
	@echo "$(GREEN)✓ Imágenes construidas$(NC)"

logs: ## Muestra logs de todos los servicios
	docker-compose logs -f

backend-shell: ## Accede al shell del contenedor backend
	docker-compose exec backend sh

frontend-install: ## Instala dependencias del frontend
	@echo "$(YELLOW)Instalando dependencias del frontend...$(NC)"
	cd frontend && npm install
	@echo "$(GREEN)✓ Dependencias instaladas$(NC)"

frontend-build: ## Construye el frontend para producción
	@echo "$(YELLOW)Construyendo frontend...$(NC)"
	cd frontend && npm run build
	@echo "$(GREEN)✓ Frontend construido en frontend/dist$(NC)"

backend-setup: ## Configura el backend (composer install + migraciones)
	@echo "$(YELLOW)Configurando backend...$(NC)"
	cd backend && composer install
	cd backend && php spark migrate
	@echo "$(GREEN)✓ Backend configurado$(NC)"

seed: ## Ejecuta los seeders para poblar la BD
	@echo "$(YELLOW)Ejecutando seeders...$(NC)"
	cd backend && php spark db:seed DemoSeeder
	@echo "$(GREEN)✓ Base de datos poblada$(NC)"

clean: ## Limpia archivos temporales y caché
	@echo "$(YELLOW)Limpiando archivos temporales...$(NC)"
	rm -rf backend/writable/cache/*
	rm -rf backend/writable/logs/*
	rm -rf frontend/dist
	rm -rf frontend/node_modules
	@echo "$(GREEN)✓ Limpieza completada$(NC)"

install: frontend-install backend-setup ## Instala todas las dependencias
	@echo "$(GREEN)✓ Instalación completa$(NC)"

dev: ## Modo desarrollo local (sin Docker)
	@echo "$(YELLOW)Iniciando en modo desarrollo...$(NC)"
	@echo "$(CYAN)1. Backend: cd backend && php spark serve$(NC)"
	@echo "$(CYAN)2. Frontend: cd frontend && npm run dev$(NC)"

deploy: frontend-build build up seed ## Despliega completo (build + up + seed)
	@echo "$(GREEN)✓ Despliegue completado$(NC)"
	@echo "$(CYAN)Aplicación disponible en: http://localhost$(NC)"



