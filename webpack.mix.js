const mix = require('laravel-mix');

mix.react('resources/assets/js/app.jsx', 'public/js')
    .sass('resources/assets/sass/app.scss', 'public/css');
mix.copyDirectory('resources/assets/img', 'public/img');
mix.copyDirectory('resources/assets/vendor', 'public/vendor');
mix.copy('resources/assets/img/favicon.png', 'public/');
mix.styles(['resources/assets/css/style.min.css', 'resources/assets/css/my_style.css'], 'public/css/style.css');
