<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLegalEntitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('legal_entities', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('address')->nullable();
            $table->string('site')->nullable();
            $table->string('phone')->nullable();
            $table->string('inn')->unique();
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->unique(array('name', 'user_id'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('legal_entities');
    }
}
