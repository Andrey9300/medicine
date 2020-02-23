<div>
    <h3>Исследования, которые требуют внимания:</h3>

    @foreach ($data as $value)
        <a href="3quality.ru{{$value['url']}}">{{$value['fio']}}</a><br/>
    @endforeach
</div>
