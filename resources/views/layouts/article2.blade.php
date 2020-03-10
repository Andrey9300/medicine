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
            <h2>Оформление личной медицинской книжки (ЛМК)</h2>
        </div>

        <hr/>

        <div class="row">
            <div class="col-lg-12">
                <p>Все работники сферы общественного питания, торговли, гостинично-ресторанного бизнеса имеют опыт оформление ЛМК. Давайте разберемся в нюансах этого процесса.
                </p>
                <p>
                Оформлять ЛМК нас обязывают различные санитарные правила (<a href="https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=200192&dst=100713&date=22.02.2020" target="_blank">СанПин 2.3.6.1079-01 Для организаций общественного питания</a>,
                    <a href="https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=69292&dst=100227&date=22.02.2020" target="_blank">
                        СП 2.3.6.1066-01. Предприятия торговли.</a>
                        МосСанПиН 2.1.2.043-98 "Гигиенические требования к содержанию гостиниц")
                </p>
                <div>
                    <a href="https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=342280&dst=1000000001&date=22.02.2020" target="_blank">
                        В соответствии с Приказом 12.04.2011 N 302н
                    </a>“... Данные о прохождении медицинских осмотров подлежат внесению в личные медицинские книжки…”
                </div><p> То есть Вы прошли предварительный (или периодический) медицинский осмотр и медицинский центр должен перенести информацию о медицинском осмотре в Вашу ЛМК.
                </p><p>
                Объем медицинского осмотра также определен в Приложении II Приказа 302н. В приложении указаны: наименование работ и профессий, кратность медицинского осмотра, перечень врачей-специалистов, объем лабораторных и инструментальных исследований, а также противопоказания к работе.
                </p><p>
                К примеру, если вы работник столовой - ваш пункт
                15. Работы в организациях общественного питания, торговли, буфетах, на пищеблоках, в том числе на транспорте.
                </p><p>
                Для работников торговли - пункт
                14. Работы в организациях пищевой промышленности, молочных и раздаточных пунктах, на базах и складах продовольственных товаров, где имеется контакт с пищевыми продуктами в процессе их производства, хранения, реализации, в том числе работы по санитарной обработке и ремонту инвентаря, оборудования, а также работы, где имеется контакт с пищевыми продуктами при транспортировке их на всех видах транспорта.
                </p><p>
                Для работников гостиниц - пункт
                23. Работы в гостиницах, общежитиях, пассажирских вагонах (проводники), в должности бортового проводника воздушного судна.
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
