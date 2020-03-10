<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlaceCheckListsTable extends Migration
{
    public function up()
    {
        Schema::create('place_check_lists', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_criterion_lists_id')->unsigned();
            $table->foreign('user_criterion_lists_id')->references('id')->on('user_criterion_lists')->onDelete('cascade');
            $table->date('created_at');
            $table->boolean('sended');
        });
    }

    public function down()
    {
        Schema::dropIfExists('place_check_lists');
    }
}
