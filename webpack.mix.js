const mix = require('laravel-mix');

mix.react('resources/assets/js/app.js', 'public/js')
    .sass('resources/assets/sass/app.scss', 'public/css');

mix.styles(['resources/assets/css/style.css'], 'public/css/style.css');
