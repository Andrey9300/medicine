<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Quality</title>

    <link rel="shortcut icon" href="/favicon.png">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
</head>
    <body class="app header-fixed sidebar-fixed aside-menu-fixed aside-menu-hidden">
        <div id="app"></div>
        @yield('content')
        <script src="{{ mix('js/app.js') }}"></script>
    </body>
</html>
