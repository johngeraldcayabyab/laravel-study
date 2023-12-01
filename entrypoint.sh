#!/bin/bash

# Start PHP-FPM in the background
php-fpm &

# Run additional commands
composer dump-autoload -o
php artisan key:generate --no-interaction --force
php artisan migrate:fresh --seed --no-interaction --force
php artisan optimize:clear
php artisan storage:link
php artisan horizon:publish

# Keep the container running
tail -f /dev/null
