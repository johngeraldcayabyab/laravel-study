FROM php:8.2-fpm

WORKDIR /var/www

RUN apt-get update && \
    apt-get install -y --force-yes --no-install-recommends \
        build-essential \
        libpng-dev \
        libjpeg62-turbo-dev \
        libfreetype6-dev \
        locales \
        zip \
        jpegoptim optipng pngquant gifsicle \
        vim \
        unzip \
        git \
        curl \
        libzip-dev \
        libmemcached-dev \
        libz-dev \
        libpq-dev \
        libssl-dev \
        openssh-server \
        libmagickwand-dev \
        cron \
        nano \
        libxml2-dev \
        libreadline-dev \
        libgmp-dev \
        mariadb-client \
        libxslt1-dev \
        icu-devtools \
        libicu-dev \
        supervisor \
    && rm -rf /var/lib/apt/lists/*


RUN curl -sLS https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*


RUN docker-php-ext-install soap
RUN docker-php-ext-install exif
RUN docker-php-ext-install pcntl
RUN docker-php-ext-install zip
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install pdo_pgsql
RUN docker-php-ext-install bcmath
RUN docker-php-ext-install intl
RUN docker-php-ext-install gmp
RUN pecl install redis && docker-php-ext-enable redis

RUN docker-php-ext-install gd && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd


RUN docker-php-ext-install calendar
RUN docker-php-ext-install gettext
RUN docker-php-ext-install mysqli
RUN docker-php-ext-install sockets
RUN docker-php-ext-install xsl
RUN docker-php-ext-install shmop
RUN docker-php-ext-install sysvmsg
RUN docker-php-ext-install sysvsem
RUN docker-php-ext-install sysvshm


RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN groupadd -g 1000 www && useradd -u 1000 -ms /bin/bash -g www www


COPY --chown=www:www ./docker/php/entrypoint /usr/local/bin/entrypoint
RUN chmod +x /usr/local/bin/entrypoint

EXPOSE 9000

