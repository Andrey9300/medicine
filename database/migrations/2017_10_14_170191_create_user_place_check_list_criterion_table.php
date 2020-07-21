<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserPlaceCheckListCriterionTable extends Migration
{
    public function up()
    {
        Schema::create('user_place_check_list_criterion', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->integer('list_id')->unsigned();
            $table->foreign('list_id')->references('id')->on('audits_place_check_list_criterion')->onDelete('cascade');
            $table->unique(array('user_id', 'list_id'));
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_place_check_list_criterion');
    }
}
