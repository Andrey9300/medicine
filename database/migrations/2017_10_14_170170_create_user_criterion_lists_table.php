<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserCriterionListsTable extends Migration
{
    public function up()
    {
        Schema::create('user_criterion_lists', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('unit_id')->unsigned();
            $table->foreign('unit_id')->references('id')->on('user_units')->onDelete('cascade');
            $table->integer('location_id')->unsigned()->nullable();
            $table->foreign('location_id')->references('id')->on('user_locations')->onDelete('cascade');
            $table->integer('place_id')->unsigned()->nullable();
            $table->foreign('place_id')->references('id')->on('user_places')->onDelete('cascade');
            $table->integer('user_group_criterion_id')->unsigned()->nullable();
            $table->foreign('user_group_criterion_id')->references('id')->on('user_group_criterion')->onDelete('cascade');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_criterion_lists');
    }
}
