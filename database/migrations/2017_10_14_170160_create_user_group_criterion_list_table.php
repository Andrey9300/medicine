<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserGroupCriterionListTable extends Migration
{
    public function up()
    {
        Schema::create('user_group_criterion_list', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_group_criterion_id')->unsigned();
            $table->foreign('user_group_criterion_id')->references('id')->on('user_group_criterion')->onDelete('cascade');
            $table->integer('user_criterions_criterion_id')->unsigned();
            $table->foreign('user_criterions_criterion_id')->references('id')->on('user_criterions')->onDelete('cascade');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_group_criterion_list');
    }
}
