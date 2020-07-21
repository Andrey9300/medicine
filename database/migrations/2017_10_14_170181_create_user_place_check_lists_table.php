<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserPlaceCheckListsTable extends Migration
{
    public function up()
    {
        Schema::create('user_place_check_lists', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->integer('lists_id')->unsigned();
            $table->foreign('lists_id')->references('id')->on('audits_place_check_lists')->onDelete('cascade');
            $table->unique(array('user_id', 'lists_id'));
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_place_check_lists');
    }
}
