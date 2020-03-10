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
            <h2>Вакцинация (для ЛМК).</h2>
        </div>

        <hr/>

        <div class="row">
            <div class="col-lg-12">
                <p>
                    Данный раздел всегда вызывает большое количество вопросов и комментариев. К сожалению, на сегодняшний день нет документа, который четко разъяснял какие именно прививки должны быть отражены для той или иной должности работника. Помимо прочего, существуют законодательные документы в конкретных регионах РФ, имеющих свои дополнения по этому вопросу.
</p><p>
                    В санитарных правилах не указаны требования к вакцинации, как и в
                    <a href="https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=329054&dst=100004%2C1&date=22.02.2020" target="_blank">
                        Приказе №302н. Условно (1) регламентирующим документом выступает Приказ Минздрава России от 21.03.2014 N 125н (ред. от 24.04.2019) "Об утверждении национального календаря профилактических прививок".
                    </a>
                    “Исторически сложилось”, что сотрудниками Роспотребнадзора проверяется как минимум наличие двух прививок: 1) Дифтерия 2) Корь.
                </p><p>
                    <b>Дифтерия</b>. В ЛМК вы видите отметку АДСМ или R_АДСМ.
                    Вакцинации подлежат: лица  не болевшие, не привитые и не имеющие сведений о профилактических прививках против дифтерии, а также из очагов заболевания.
                    Ревакцинация проводится для лиц старше 18 лет каждые 10 лет с момента последней ревакцинации.
                </p><p>
                    <b>Корь</b>. В ЛМК вы видите отметку ЖКВ или R_ЖКВ.
                    Вакцинации подлежат: лица не привитые и не имеющие сведений о профилактических прививках против кори или однократно привитые, контактные лица без ограничения возраста из очагов заболевания, ранее не болевшие. Прививочный возраст - до 55 лет (2).
                    Полная вакцинопрофилактика считается при наличии 2-х прививок (3).
                </p><p>
                    Как правило, у большинства людей, которых прививали в детстве, имеется весь спектр необходимых прививок. Информация об этом хранится в поликлинике по месту жительства, куда Вы можете обратиться за выпиской. При поступлении в учебные заведения требуют оформления Прививочного сертификата, куда вносятся отметки о вакцинации.
                    Наличие выписки из медицинской карты или Прививочного сертификата убережет Вас от дополнительных прививок (4). В медицинском центре перенесут информацию о вакцинации в Вашу ЛМК.
                </p><p>
                    Однако для г. Москвы и Московской области действует Постановление №2 от 31.03.2015 “О проведении профилактических прививок отдельным группам граждан против дизентерии Зонне и вирусного гепатита А по эпидемическим показаниям”. Данное Постановление обязывает всех сотрудников (5), деятельность которых связана с процессами транспортировки, приемки, хранения, приготовления (производства) и реализации пищевых продуктов и продукции общественного питания проводить вакцинацию против дизентерии Зонне и вирусного гепатита А (ВГА).
                </p><p>
                    <b>Дизентерия Зонне</b>.
                    Вакцинации подлежат лица, определенные Постановлением №2 от 31.03.2015. Вакцинация проводится ежегодно - один раз в год.
                </p><p>
                    <b>Вирусный гепатит А (ВГА)</b>.
                    Вакцинации подлежат лица, определенные Постановлением №2 от 31.03.2015.
                    Полная вакцинопрофилактика считается при наличии двух прививок с  оптимальным интервалом 6-12 месяцев, после которых у человека остается пожизненный иммунитет к ВГА.
                    Если по какой-то причине Вам не провели вторую вакцинопрофилактику в течении 6-12 месяцев - введение ревакцинирующей дозы может быть отложено на период до 60 месяцев (6).
                </p><p>
                    Как правило, вакцинация от Кори и Дифтерии в частных медицинских центрах недорогая (от 80 до 250 руб.), при этом вакцинация от дизентерии Зонне (около 1000 руб.) и вирусного гепатита А (около 1200 руб.) достаточно дорогостоящая.
                    Вакцинацию проводят бесплатно (7) по полису ОМС в поликлинике по месту жительства, об этом нам говорит
                    <a href="https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=327796&dst=100154&date=22.02.2020" target="_blank">
                        ст. 5, Федерального закона от 17.09.1998 N 157-ФЗ (ред. от 28.11.2018) "Об иммунопрофилактике инфекционных болезней".
                    </a>
                </p>

                <hr/>

                <ul style="list-style-type:decimal">
                    <li>
                        Условно, так как данный документ скорее распространяется на медицинские организации, чем для Юридических лиц, деятельность которых связана с общественным питанием, торговлей или Гостинично-ресторанный бизнесом.
                    </li>
                    <li>
                        “...взрослые от 36 до 55 лет (включительно), относящиеся к группам риска (работники медицинских и образовательных организаций, организаций торговли, транспорта, коммунальной и социальной сферы;
                    </li>
                    <li>
                        Интервал между первой и второй вакцинацией должен быть не менее 3х месяцев
                    </li>
                    <li>
                        И все же, если так случилось, что нет возможность взять выписку, но вы точно уверены что у вас были прививки против Кори и Дифтерии, в медицинском центре можно сделать исследование крови на вирусную нагрузку к Кори и Дифтерии. По результатам анализа будет понятно нужна вакцинация / R-вакцинация или нет.
                    </li>
                    <li>
                        Для точного понимания требований, рекомендуем посмотреть полную версию документа
                        <a href="http://77.rospotrebnadzor.ru/index.php/doc/post-mos/2962--2-31-2015-" target="_blank">
                            Постановление №2 от 31.03.2015
                        </a>
                    </li>
                    <li>
                        По данным из инструкции к вакцине против ВГА Хаврикс
                    </li>
                    <li>
                        <a href="https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=327796&dst=100154&date=22.02.2020" target="_blank">
                            ст. 5, Федеральный закон от 17.09.1998 N 157-ФЗ (ред. от 28.11.2018) "Об иммунопрофилактике инфекционных болезней"
                        </a>
                        “... бесплатные профилактические прививки, включенные в национальный календарь профилактических прививок и календарь профилактических прививок по эпидемическим показаниям, проводят в медицинских организациях государственной системы здравоохранения и муниципальной системы здравоохранения”
                    </li>
                </ul>
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
