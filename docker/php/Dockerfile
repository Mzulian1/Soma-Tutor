FROM php:8.2-fpm-alpine

# Instalar dependencias del sistema
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libzip-dev \
    zip \
    unzip \
    sqlite-dev

# Instalar extensiones PHP
RUN docker-php-ext-install pdo pdo_sqlite zip gd

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configurar directorio de trabajo
WORKDIR /var/www/backend

# Copiar archivos de composer
COPY ../../backend/composer.json ../../backend/composer.lock* ./

# Instalar dependencias (si composer.lock existe)
RUN if [ -f composer.lock ]; then composer install --no-dev --optimize-autoloader --no-interaction; fi

# Copiar el resto del código
COPY ../../backend .

# Permisos para writable
RUN mkdir -p writable/cache writable/logs writable/session writable/uploads writable/storage/docs && \
    chown -R www-data:www-data writable && \
    chmod -R 755 writable

# Exponer puerto PHP-FPM
EXPOSE 9000

CMD ["php-fpm"]



