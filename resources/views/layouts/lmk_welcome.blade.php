@extends('layouts.base')

@section('content')
    <header class="video-on-right">
        <div class="container">
            <div class="row same-height-row">
                <div class="col-sm-6">
                    <div class="header-content">
                        <div class="header-content-inner">
                            <h1 class="wow fadeInUp">Автоматизированный сервис личных медицинских книжек</h1>
                            <a href="/services/registration" class="btn btn-primary btn-xl page-scroll wow fadeInUp"
                               data-wow-delay="0.3">Регистрация</a>
                            <a href="/services/profile" class="btn btn-primary btn-xl page-scroll wow fadeInUp"
                               style="margin-left: 24px;"
                               data-wow-delay="0.3">Вход</a>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 wow fadeIn">
                    <div class="video-container"><img src="/img/medbook.png" width="100%" height="100%" loading="lazy"/></div>
                </div>
            </div>
        </div>
    </header>
    <section class="split-fullscreen no-padding bg-gray" id="about">
        <div class="drop-margins">
            <div class="row same-height-row">
                <div class="col-sm-6 image-section wow fadeInLeft">
                    <img src="./vendor/img/space-1.jpg" alt="" loading="lazy">
                </div>
                <div class="col-sm-6 content-section fadeInRight">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="text-center">
                                <div class="title-box-icon title-about">
                                    <img src="./vendor/img/icons/summer/Sun.svg" alt="" loading="lazy">
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
                    <img src="./vendor/img/space-2.jpg" alt="" loading="lazy">
                </div>
                <div class="col-md-pull-6 col-sm-6 content-section fadeInRight">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="text-center">
                                <div class="title-box-icon title-about">
                                    <img src="./vendor/img/icons/summer/Watermelon.svg" alt="" loading="lazy">
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
@endsection