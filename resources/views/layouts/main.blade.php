@extends('layouts.base')

@section('content')
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
                           style="margin-bottom: 30px; padding: 15px;white-space: normal; border-radius: 10px;">Блог
                            «Управление качеством»
                        </a>
                        <a href="/lmk_welcome" class="btn btn-primary btn-xl page-scroll wow fadeInUp"
                           data-wow-delay="0.3" style="padding: 15px; border-radius: 10px;">Сервисы</a>
                    </div>
                </div>
            </div>
        </div>
    </header>
@endsection


