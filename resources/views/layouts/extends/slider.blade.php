{{--    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>--}}
{{--    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>--}}
<div class="slider">
    <img src="./vendor/img/space-1.jpg" alt="...">
    <img src="./vendor/img/space-1.jpg" alt="...">
    <img src="./vendor/img/space-1.jpg" alt="...">
    <img src="./vendor/img/space-1.jpg" alt="...">
    <img src="./vendor/img/space-1.jpg" alt="...">
    <img src="./vendor/img/space-1.jpg" alt="...">
</div>
<script>
    document.addEventListener("DOMContentLoaded", function () {
        $('.slider').slick({
            autoplay: true,
            autoplaySpeed: 2000,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    });
</script>