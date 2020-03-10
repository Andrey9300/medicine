<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Quality - сервис медицинских книжек</title>

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
<body id="page-top" data-scroll-animation="true">
<div id="spinner">
    <div class="sk-folding-cube">
        <div class="sk-cube1 sk-cube"></div>
        <div class="sk-cube2 sk-cube"></div>
        <div class="sk-cube4 sk-cube"></div>
        <div class="sk-cube3 sk-cube"></div>
    </div>
</div>
<header class="video-on-right" style="min-height: 95px;height: 95px;">
    <div class="container">
        <div class="row">
            <div class="col-sm-6">
                <div class="header-content">
                    <div class="header-content-inner">
                        <h1 class="wow fadeInUp">Автоматизированный сервис личных медицинских книжек</h1>
                        <a href="/registration" class="btn btn-primary btn-xl page-scroll wow fadeInUp"
                           data-wow-delay="0.3">Регистрация</a>
                        <a href="/login" class="btn btn-primary btn-xl page-scroll wow fadeInUp"
                           style="margin-left: 24px;"
                           data-wow-delay="0.3">Вход</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
<nav id="mainNav" class="navbar navbar-default navbar-fixed-top navbar-light">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span> <img src="./vendor/img/menu-light.svg" alt=""></i>
            </button>
            <a class="navbar-brand page-scroll navbar-brand-custom" href="#page-top">

            </a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a class="page-scroll" href="#about">О нас</a>
                </li>
{{--                <li>--}}
{{--                    <a class="page-scroll" href="#faqs">Помощь</a>--}}
{{--                </li>--}}
                <li>
                    <a class="page-scroll" href="#contacts">Контакты</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
<section>
    <div class="container">
        <div class="row section-heading">
            <h2>Гигиеническое обучение и аттестация (ГОиА).</h2>
        </div>

        <hr/>

        <div class="row">
            <div class="col-lg-12">
                <p>Кроме медицинского осмотра, работники оформляющие ЛМК проходят Гигиеническое обучение и аттестацию (сан минимум). Отметка об этом ставится на последней странице ЛМК в виде голограммы, информации о дате аттестации и сфере деятельности.
                </p><p>
                Проходить Гигиеническое обучение и аттестацию нас обязывают все те же санитарные правила  (
                    <a href="https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=200192&dst=100713&date=22.02.2020" target="_blank">
                        СанПин 2.3.6.1079-01 Для организаций общественного питания
                    </a>,
                    <a href="https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=69292&dst=100227&date=22.02.2020" target="_blank">
                        СП 2.3.6.1066-01. Предприятия торговли.
                    </a>,
                    <a href="#" target="_blank">
                        МосСанПиН 2.1.2.043-98 "Гигиенические требования к содержанию гостиниц"
                    </a>), а также
                    <a href="https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=28001&dst=100005&date=22.02.2020" target="_blank">
                        Приказ Минздрава РФ от 29.06.2000 N 229 "О профессиональной гигиенической подготовке и аттестации должностных лиц и работников организаций".
                    </a>
                </p><p>
                Профессиональная гигиеническая подготовка и аттестация (сан минимум) проводится при приеме на работу и в дальнейшем с периодичностью:
                <ul>
                    <li>
                        для должностных лиц и работников организаций, деятельность которых связана с производством, хранением, транспортировкой и реализацией мясо - молочной и кремово - кондитерской продукции, детского питания, питания дошкольников, - ежегодно;
                    </li>
                    <li>
                        для остальных категорий работников - 1 раз в 2 года.
                    </li>
                </ul>
                </p><p>
                В ЛМК можно проставить только 4 голограммы. Для них выделена соответствующая страница в медицинской книжке, размещать голограммы на следующей странице не стоит - данное действие может быть расценено как нарушение оформления документа и ЛМК придется оформлять заново.
                </p>
            </div>
        </div>

    </div>
</section>
<footer class="footer footer--light">
    <div class="container">
        <div class="footer-alt text-center">
            <p>
                2017 - {{date("Y")}} ©
                Quality management
                <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                Quality control
                <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                Quality Assurance
            </p>
        </div>
    </div>
</footer>
<script src="./vendor/vendor/jquery/jquery.min.js"></script>
<script src="./vendor/vendor/video.js/video.min.js"></script>
<script src="./vendor/vendor/bootstrap/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
<script src="./vendor/vendor/scrollreveal/scrollreveal.min.js"></script>
<script src="./vendor/vendor/magnific-popup/jquery.magnific-popup.min.js"></script>
<script src="./vendor/vendor/svg-injector/svg-injector.min.js"></script>
<script src="./vendor/vendor/wowjs/wow.min.js"></script>

<script src="./vendor/js/index.min.js"></script>
</body>
</html>
