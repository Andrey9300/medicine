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
            <h2>Психиатрическое освидетельствование.
            </h2>
        </div>

        <hr/>

        <div class="row">
            <div class="col-lg-12">
                <p>
                    Способность человека выполнять ту или иную работу напрямую зависит от его психического здоровья. Это имеет критическое значение при работе в условиях повышенной опасности, если приходится постоянно взаимодействовать с людьми, поддерживать высокую концентрацию внимания и быстро реагировать на ситуацию.
                </p><p>
                    Начиная с 2004 года работники гостинично-ресторанного бизнеса, а также сферы торговли и общественного питания должны проходить психиатрическое освидетельствование. Полный перечень должностей можно посмотреть в
                    <a href="https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=38854&dst=1000000001&date=22.02.2020" target="_blank">
                        Постановлении Правительства РФ от 28.04.1993 N 377.
                    </a>
                </p><p>
                    Как правило, при приеме на работу, сотрудник отдела персонала уточняет есть ли у работника заключение психиатрической комиссии, если же таковое отсутствует, работнику выдается направление на прохождение  психиатрического освидетельствования.
                </p><p>
                    После прохождения психиатрического освидетельствования медицинский центр оформляет два заключения: первый - для работодателя (остается в организации), второй - для сотрудника (напомните сотруднику отдела персонала выдать Вам ваш экземпляр документа).
                </p><p>
                    В последующем, в течение 5 лет, можно использовать данный документ при приеме на другое место работы или в иных целях.
                </p><p>
                    В соответствии со статьей 213 Трудового кодекса РФ психиатрическое освидетельствование осуществляется за счет средств работодателя.
                </p><p>
                    Регламентировано в соответствии с
                    <a href="https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=144346&dst=100003%2C2&date=22.02.2020" target="_blank">
                        Постановлением Правительства РФ от 23.09.2002 N 695 (ред. от 25.03.2013)</a>,
                    <a href="https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=38854&dst=1000000001&date=22.02.2020" target="_blank">
                        Постановлением Правительства РФ от 28.04.1993 N 377 (ред. от 23.09.2002)
                    </a>
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
