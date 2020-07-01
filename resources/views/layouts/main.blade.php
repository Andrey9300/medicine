<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="quality">

    <title>Quality</title>

    <link href="./vendor/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="./vendor/vendor/video.js/video-js.min.css" rel="stylesheet">
    <link href="./vendor/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="./vendor/vendor/magnific-popup/magnific-popup.css" rel="stylesheet">
    <link href="./vendor/vendor/animate.css/animate.min.css" rel="stylesheet">
    <link href="./vendor/vendor/device-mockups/device-mockups.min.css" rel="stylesheet">
    <link href="./vendor/css/style.min.css" rel="stylesheet">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    // TODO в vendor
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

    <link rel="shortcut icon" href="/favicon.png">
</head>
<header class="video-on-right" style="min-height: 100%;">
    <div class="container">

        <div class="col-sm-12 col-md-12">
            <div class="header-content">
                <div class="header-content-inner" style="
                        display: flex;
                        flex-direction: column;
                        margin: 0 auto;
                        position: relative;
                        width: 50%;"
                >
                    <a href="/blog" class="btn btn-primary btn-xl page-scroll wow fadeInUp"
                       data-wow-delay="0.3"
                       style="margin-bottom: 30px; padding: 15px;white-space: normal; border-radius: 10px;">Блог Управление
                        качеством</a>
                    <a href="/lmk_welcome" class="btn btn-primary btn-xl page-scroll wow fadeInUp"
                       data-wow-delay="0.3" style="padding: 15px; border-radius: 10px;">Сервис ЛМК</a>
                </div>
            </div>

        </div>
    </div>
</header>
</body>
</html>
