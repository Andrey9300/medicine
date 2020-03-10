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
            <h2>Предварительный и периодический медицинский осмотр.</h2>
        </div>

        <hr/>

        <div class="row">
            <div class="col-lg-12">
                <p>
                    <b>Предварительный</b> медицинский осмотр сотрудник проходит при поступлении на новое место работы, а также при переходе на новую должность (если изменяется сфера деятельности, например вы работали поваром, а перешли на должность управляющего рестораном).
                </p>
                <p>
                    Данный вид медицинского осмотра проходят все работники, независимо от сферы деятельности их организации. Основная цель - убедится, что состояние здоровья работника соответствует занимаемой должности и у работника нет заболеваний, являющихся противопоказанием к работе.
                </p>
                <p>К примеру:
                    <ul>
                        <li>если вы устраиваетесь работать спасателем в МЧС, и при этом имеете серьезные заболевания сердечно-сосудистой системы, то скорее всего Вам не дадут допуск на трудоустройство по медицинским показаниям.</li>
                        <li>если вы собираетесь работать официантом, у вас не должно быть таких заболеваний как брюшной тиф, сальмонеллез и т.п.</li>
                    </ul>
                </p>
                <p>
                    По истечению одного года, работодатель направит вас на прохождение <b>Периодического</b> медицинского осмотра. Объем исследований, как правило, тот же, что и при предварительном медицинском осмотре.
                    Объем исследований может отличаться в зависимости от должности, пола и возраста работника.
                </p>
                <p>
                    После прохождения предварительного и периодического медицинских осмотров медицинский центр оформляет следующую документацию: первое - <b>Заключение</b> по итогам медицинского осмотра (остается в организации) и второе - <b>Паспорт здоровья</b> (для работника).
                </p>
                <p>
                    Если в течении одного месяца, после прохождения медицинского осмотра работодатель не выдал Вам Паспорт здоровья, обратитесь в отдел персонала для его получения. В Паспорте здоровья будут отражены все специалисты, которых Вы прошли, а также результаты анализов и ФЛГ.
                </p>
                <p>
                    Если в течении трудовой деятельности работник получает профессиональное заболевание (болезнь связанная с работой на вредных и (или) опасных производствах), медицинская комиссия будет учитывать результаты ежегодных периодических медицинских осмотров.
                </p>
                <p>
                    В соответствии со статьей 213 Трудового кодекса РФ данный вид медицинского осмотра осуществляется за счет средств работодателя. Объем и периодичность медицинских осмотров регламентирована
                    <a href="https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=342280&dst=100235&date=22.02.2020#049569606645777564" target="_blank">
                        Приказом Минздравсоцразвития России от 12.04.2011 N 302н (ред. от 13.12.2019)
                    </a>.
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
