<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAuditsUnitsTable extends Migration
{
    public function up()
    {
        Schema::create('audits_units', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unique(array('name', 'user_id'));
        });
    }

    public function down()
    {
        Schema::dropIfExists('audits_units');
    }
}