const mix = require('laravel-mix');
const path = require('path');

mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                loader: 'babel-loader',
                options: {
                    ignore: '/node_modules/',
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties']
                }
            }
        ]
    }
});

mix.react('resources/assets/js/app.js', 'public/js')
    .sass('resources/assets/sass/app.scss', 'public/css');
mix.copyDirectory('resources/assets/img', 'public/img');
mix.copyDirectory('resources/assets/vendor', 'public/vendor');
mix.copy('resources/assets/img/favicon.png', 'public/');
mix.styles(['resources/assets/css/style.min.css', 'resources/assets/css/my_style.css'], 'public/css/style.css');
