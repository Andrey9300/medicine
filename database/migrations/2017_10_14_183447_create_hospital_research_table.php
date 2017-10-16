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
        Schema::create('hospital_research', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('hospital_id')->unsigned();
            $table->integer('researches_id')->unsigned();
            $table->double('price');
            $table->foreign('hospital_id')->references('id')->on('hospitals');
            $table->foreign('researches_id')->references('id')->on('researches');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hospital_research');
    }
}
