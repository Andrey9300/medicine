<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserCriterionsTable extends Migration
{
    public function up()
    {
        Schema::create('user_criterions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->integer('criterion_id')->unsigned();
            $table->foreign('criterion_id')->references('id')->on('audits_criterions')->onDelete('cascade');
            $table->unique(array('user_id', 'criterion_id'));
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_criterions');
    }
}
