<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserUnitsTable extends Migration
{
    public function up()
    {
        Schema::create('user_units', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->integer('unit_id')->unsigned();
            $table->foreign('unit_id')->references('id')->on('audits_units')->onDelete('cascade');
            $table->unique(array('user_id', 'unit_id'));
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_units');
    }
}
