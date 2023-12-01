#!/bin/bash

# Start PHP-FPM
php-fpm &

# Wait for PHP-FPM to initialize (adjust sleep duration as needed)
sleep 5

# Run setup commands
composer dump-autoload -o
php artisan key:generate --no-interaction --force
php artisan migrate:fresh --seed --no-interaction --force
php artisan optimize:clear
php artisan storage:link
php artisan horizon:publish

# Keep the container running
tail -f /dev/null
