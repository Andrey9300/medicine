<div style="background-color: #F4F5F7; padding-bottom: 20px">
    <div class="container">
        <div class="col-sm-12 col-md-12">
            <h2>Связаться с нами</h2>
            <form id="sendForm">
                @csrf
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" name="email" class="form-control" placeholder="username@mail.ru">
                </div>
                <div class="form-group">
                    <label>Оставить предложение/запрос</label>
                    <textarea rows="5" name="textForm" class="form-control"
                              placeholder="вы можете оставить предложение по развитию, или запросить демо аккаунт с тестовыми данными для онлайн сервиса"></textarea>
                </div>
                <button type="submit" class="btn btn-success">Отправить</button>
            </form>
        </div>
    </div>
</div>
<script>
    const sendForm = document.querySelector('#sendForm');
    const sendFormData = (e) => {
        e.preventDefault();

        fetch('/sendForm', {
            method: 'POST',
            body: new FormData(sendForm)
        });
    }

    sendForm.addEventListener('submit', sendFormData);
</script>