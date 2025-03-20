FROM php:8.2.0-fpm-alpine

# Instalar dependências necessárias para o PostgreSQL
RUN apk --no-cache add postgresql-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Instalar suporte a zip e gd
RUN apk add --no-cache zip libzip-dev libpng-dev \
    && docker-php-ext-install zip \
    && docker-php-ext-install gd
