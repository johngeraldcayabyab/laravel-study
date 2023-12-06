<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{config('app.name')}}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script src="{{config('app.url')}}:{{config('socket.port')}}/socket.io/socket.io.min.js"></script>
    <script>
        const socket = io("{{config('app.url')}}:{{config('socket.port')}}");
        socket.on('connect', () => {
            console.log('connected');
            socket.on('sms-deposit-frontend-channel', function (payload) {
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

