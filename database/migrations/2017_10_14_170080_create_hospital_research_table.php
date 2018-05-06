<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHospitalResearchTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hospital_researches', function (Blueprint $table) {
            $table->increments('id');
            $table->double('price')->nullable();
            $table->integer('user_researches_id')->unsigned();
            $table->foreign('user_researches_id')->references('id')->on('user_researches')->onDelete('cascade');
            $table->integer('hospital_id')->unsigned();
            $table->foreign('hospital_id')->references('id')->on('hospitals')->onDelete('cascade');
            $table->unique(array('user_researches_id', 'hospital_id'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hospital_researches');
    }
}
