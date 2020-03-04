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
<header class="video-on-right">
    <div class="container">
        <div class="row same-height-row">
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
            <div class="col-sm-6 wow fadeIn">
                <div class="video-container"><img src="/img/medbook.png" width="100%" height="100%"/></div>
            </div>
        </div>
    </div>
</header>
<section class="split-fullscreen no-padding bg-gray" id="about">
    <div class="drop-margins">
        <div class="row same-height-row">
            <div class="col-sm-6 image-section wow fadeInLeft">
                <img src="./vendor/img/space-1.jpg" alt="">
            </div>
            <div class="col-sm-6 content-section fadeInRight">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="text-center">
                            <div class="title-box-icon title-about">
                                <img src="./vendor/img/icons/summer/Sun.svg" alt="">
                                <h3 class="title">Что мы делаем?</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-8 col-sm-offset-2">
                        <div class="feat-description text-center">
                            <h4 class="text-muted">Наш сервис поможет Вам:</h4>
                            <p class="text-muted" style="text-align: left;">
                                Cвоевременно отслеживать сроки проведения медицинских осмотров Ваших сотрудников -
                                мы заблаговременно направим Вам уведомление на электронную почту.<br/><br/>
                                Cократить время оформления направлений на медицинский осмотр - мы сделаем это за
                                Вас, просто нажмите кнопку “печать”.<br/><br/>
                                Не допустить ошибок в данном направлении работы - мы предоставляем самую актуальную
                                информацию, в соответствии с законодательством РФ, укажем на что стоит обратить
                                внимание.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row same-height-row">
            <div class="col-md-push-6 col-sm-6 image-section fadeInLeft">
                <img src="./vendor/img/space-2.jpg" alt="">
            </div>
            <div class="col-md-pull-6 col-sm-6 content-section fadeInRight">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="text-center">
                            <div class="title-box-icon title-about">
                                <img src="./vendor/img/icons/summer/Watermelon.svg" alt="">
                                <h3 class="title">Почему мы это делаем?</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-8 col-sm-offset-2">
                        <div class="feat-description text-center">
                            <h4 class="text-muted">Наша миссия:</h4>
                            <p class="text-muted" style="text-align: left;">
                                Упростить контроль за ЛМК и контролем сроков проведения медицинского осмотра<br/><br/>
                                Сократить время выписки направлений, и ввода данных.<br/><br/>
                                Помочь разобраться в вопросах организации медицинских осмотров любому специалисту,
                                назначенному курировать данное направление.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
{{--<section class="faqs" id="faqs">--}}
{{--    <div class="container">--}}
{{--        <div class="row section-heading">--}}
{{--            <h2>F.A.Q</h2>--}}
{{--            <p>Here's the most important questions for your customers.</p>--}}
{{--        </div>--}}

{{--        <hr/>--}}

{{--        <div class="row">--}}
{{--            <div class="col-sm-6 faq wow fadeInUp">--}}
{{--                <h4>What is Lorem Ipsum? How it works?</h4>--}}
{{--                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore--}}
{{--                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut--}}
{{--                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse--}}
{{--                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>--}}
{{--            </div>--}}
{{--            <div class="col-sm-6 faq wow fadeInUp">--}}
{{--                <h4>What is Lorem Ipsum? How it works?</h4>--}}
{{--                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore--}}
{{--                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut--}}
{{--                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse--}}
{{--                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>--}}
{{--            </div>--}}
{{--            <div class="col-sm-6 faq wow fadeInUp" data-wow-delay="0.3s">--}}
{{--                <h4>What is Lorem Ipsum? How it works?</h4>--}}
{{--                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore--}}
{{--                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut--}}
{{--                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse--}}
{{--                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>--}}
{{--            </div>--}}
{{--            <div class="col-sm-6 faq wow fadeInUp" data-wow-delay="0.3s">--}}
{{--                <h4>What is Lorem Ipsum? How it works?</h4>--}}
{{--                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore--}}
{{--                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut--}}
{{--                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse--}}
{{--                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>--}}
{{--            </div>--}}
{{--        </div>--}}

{{--    </div>--}}
{{--</section>--}}
<section class="contact-default bg-white" id="contacts">
    <div class="container">
        <div class="row">
            <div class="col-lg-6 col-md-6 col-xs-12 info-column">
                <div class="section-heading align-left">
                    <h3>Контакты</h3>
                    {{--                    <p class="light-gray">Форма обратной связи</p>--}}
                </div>

                <div class="info-meta">
                    <h3>email: <a href="mailto:3q@quality.ru" id="footerEmail">3q@quality.ru</a></h3>
                </div>
            </div>

            <div class="col-xs-12 col-lg-6 col-md-6 contact-container">
                {{--                <form role="form" id="contact-form" class="contact-form">--}}
                {{--                    <div class="row">--}}
                {{--                        <div class="col-md-6">--}}
                {{--                            <div class="form-group">--}}
                {{--                                <input type="text" class="form-control" name="Name" autocomplete="off" id="Name"--}}
                {{--                                       placeholder="Name">--}}
                {{--                            </div>--}}
                {{--                        </div>--}}
                {{--                        <div class="col-md-6">--}}
                {{--                            <div class="form-group">--}}
                {{--                                <input type="email" class="form-control" name="email" autocomplete="off" id="email"--}}
                {{--                                       placeholder="E-mail">--}}
                {{--                            </div>--}}
                {{--                        </div>--}}
                {{--                    </div>--}}
                {{--                    <div class="row">--}}
                {{--                        <div class="col-md-12">--}}
                {{--                            <div class="form-group">--}}
                {{--                                    <textarea class="form-control textarea" rows="3" name="Message" id="Message"--}}
                {{--                                              placeholder="Message"></textarea>--}}
                {{--                            </div>--}}
                {{--                        </div>--}}
                {{--                    </div>--}}
                {{--                    <div class="row">--}}
                {{--                        <div class="col-md-12">--}}
                {{--                            <button type="submit" class="btn btn-rect btn-rect--default pull-right">Send a message--}}
                {{--                            </button>--}}
                {{--                        </div>--}}
                {{--                    </div>--}}
                {{--                </form>--}}
            </div>
        </div>
    </div>
</section>
<section class="splash splash--gray"
         style="background: url('../img/bg-pattern.png'), linear-gradient(to left,#663FB5,#2B8BE3);">
    <h1 class="heading-text">
        Присоединяйся!
    </h1>
    <a href="/registration" class="btn btn-primary btn-xl page-scroll wow fadeInUp"
       data-wow-delay="0.3">Регистрация</a>
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
