const mix = require('laravel-mix');

mix
  .react('resources/assets/js/app.tsx', 'public/js')
  .sass('resources/assets/sass/app.scss', 'public/css')
  .webpackConfig({
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    },
  });
mix.copyDirectory('resources/assets/img', 'public/img');
mix.copyDirectory('resources/assets/vendor', 'public/vendor');
mix.copy('resources/assets/img/favicon.png', 'public/');
mix.copy(
  [
    'node_modules/font-awesome/fonts/FontAwesome.otf',
    'node_modules/font-awesome/fonts/fontawesome-webfont.eot',
    'node_modules/font-awesome/fonts/fontawesome-webfont.svg',
    'node_modules/font-awesome/fonts/fontawesome-webfont.ttf',
    'node_modules/font-awesome/fonts/fontawesome-webfont.woff',
    'node_modules/font-awesome/fonts/fontawesome-webfont.woff2',
  ],
  'public/fonts',
);
mix.styles(
  [
    'resources/assets/css/style.min.css',
    'resources/assets/css/my_style.css',
    'node_modules/font-awesome/css/font-awesome.min.css',
  ],
  'public/css/style.css',
);
