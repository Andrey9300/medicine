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
                    <div class="video-container"><img src="/img/medbook.png" width="100%" height="100%" loading="lazy"/>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <section class="split-fullscreen no-padding bg-gray" id="about">
        <div class="drop-margins">
            <div class="row same-height-row">
                <div class="col-sm-6 image-section wow fadeInLeft">
                    <img src="/img/lmk/lmk1.png" alt="" loading="lazy" style="padding: 50px">
                </div>
                <div class="col-sm-6 content-section fadeInRight">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="text-center">
                                <div class="title-box-icon title-about">
                                    <img src="./vendor/img/icons/summer/Sun.svg" alt="" loading="lazy">
                                    <h3 class="title">Все под рукой</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-8 col-sm-offset-2">
                            <div class="feat-description text-center" style="margin: 0 12px">
                                <p class="text-muted" style="text-align: left;font-size: 20px">
                                    Своевременно отслеживайте сроки проведения медицинских осмотров Ваших сотрудников.<br/><br/>
                                    Не допускайте ошибок в данном направлении работы - мы предоставляем самую
                                    актуальную информацию, в соответствии с законодательством РФ, укажем на что стоит обратить
                                    внимание.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row same-height-row">
                <div class="col-md-push-6 col-sm-6 image-section fadeInLeft">
                    <img src="/img/lmk/lmk5.png" alt="" loading="lazy" style="padding: 50px">
                </div>
                <div class="col-md-pull-6 col-sm-6 content-section fadeInRight">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="text-center">
                                <div class="title-box-icon title-about">
                                    <img src="./vendor/img/icons/summer/Watermelon.svg" alt="" loading="lazy">
                                    <h3 class="title">Помощь в организации МО</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-8 col-sm-offset-2">
                            <div class="feat-description text-center" style="margin: 0 12px">
                                <p class="text-muted" style="text-align: left;font-size: 20px">
                                    Упрощаем контроль за ЛМК и контролем сроков проведения медицинского
                                    осмотра.<br/><br/>
                                    Помогаем разобраться в вопросах организации медицинских осмотров любому
                                    специалисту, назначенному курировать данное направление.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row same-height-row">
                <div class="col-sm-6 image-section wow fadeInLeft">
                    <img src="/img/lmk/lmk6.png" alt="" loading="lazy" style="padding: 50px">
                </div>
                <div class="col-sm-6 content-section fadeInRight">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="text-center">
                                <div class="title-box-icon title-about">
                                    <img src="./vendor/img/icons/summer/Palm.svg" alt="" loading="lazy">
                                    <h3 class="title">Быстрое оформление</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-8 col-sm-offset-2">
                            <div class="feat-description text-center" style="margin: 0 12px">
                                <p class="text-muted" style="text-align: left;font-size: 20px">
                                    Оформить направление на медицинский осмотр стало проще.<br/><br/>
                                    Мы сделаем это за Вас - нажмите кнопку “печать”.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    @include('layouts.extends.video')
@endsection
