<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserGroupCriterionTable extends Migration
{
    public function up()
    {
        Schema::create('user_group_criterion', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->integer('group_criterion_id')->unsigned();
            $table->foreign('group_criterion_id')->references('id')->on('audits_group_criterion')->onDelete('cascade');
            $table->unique(array('user_id', 'group_criterion_id'));
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_group_criterion');
    }
}
