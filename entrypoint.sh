#!/usr/bin/env bash

# Start PHP-FPM and Supervisord in the background
php-fpm &
supervisord &
cron -f &

# Sleep for a while to allow services to start
sleep 5

# Run additional commands
docker compose -f docker-compose.prod.yml exec app npm install --production --omit=dev --prefer-offline --no-audit --progress=false
docker compose -f docker-compose.prod.yml exec app npm install laravel-mix@latest
docker compose -f docker-compose.prod.yml exec app npm install --save-dev vite laravel-vite-plugin
docker compose -f docker-compose.prod.yml exec app npm run build
docker compose -f docker-compose.prod.yml exec app composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev --no-progress --no-plugins --no-scripts --no-ansi
docker compose -f docker-compose.prod.yml exec app composer dump-autoload -o
docker compose -f docker-compose.prod.yml exec app php artisan key:generate --no-interaction --force
docker compose -f docker-compose.prod.yml exec app php artisan migrate:fresh --seed --no-interaction --force
docker compose -f docker-compose.prod.yml exec app php artisan optimize:clear
docker compose -f docker-compose.prod.yml exec app php artisan storage:link
docker compose -f docker-compose.prod.yml exec app php artisan horizon:publish

# Keep the container running
#tail -f /dev/null
