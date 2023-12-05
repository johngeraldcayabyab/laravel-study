<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{config('app.name')}}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script src="http://0.0.0.0:3000/socket.io/socket.io.min.js"></script>

    <script>
        const socket = io("http://0.0.0.0:3000",);

        socket.on('connect', () => {
            console.log('connected');
            socket.on('monoportal-sms-deposit-frontend-channel', function (payload) {
                console.log(payload);
            });
        });

    </script>
</head>
<body class="antialiased sans-serif">
<main>
    {{ $slot }}
</main>
</body>
</html>

