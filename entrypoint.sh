#!/bin/bash

# Start PHP-FPM and Supervisord in the background
php-fpm &
supervisord &

# Sleep for a while to allow services to start
sleep 5

# Run additional commands
docker compose -f docker-compose.prod.yml exec app composer dump-autoload -o
docker compose -f docker-compose.prod.yml exec app php artisan key:generate --no-interaction --force
docker compose -f docker-compose.prod.yml exec app php artisan migrate:fresh --seed --no-interaction --force
docker compose -f docker-compose.prod.yml exec app php artisan optimize:clear
docker compose -f docker-compose.prod.yml exec app php artisan storage:link
docker compose -f docker-compose.prod.yml exec app php artisan horizon:publish

# Keep the container running
tail -f /dev/null
