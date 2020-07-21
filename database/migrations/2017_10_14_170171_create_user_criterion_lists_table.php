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
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->integer('lists_id')->unsigned();
            $table->foreign('lists_id')->references('id')->on('audits_criterion_lists')->onDelete('cascade');
            $table->unique(array('user_id', 'lists_id'));
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_criterion_lists');
    }
}
