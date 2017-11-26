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
            $table->double('price')->nullable();
            $table->integer('user_research_id')->unsigned();
            $table->foreign('user_research_id')->references('id')->on('user_research')->onDelete('cascade');
            $table->integer('hospital_id')->unsigned();
            $table->foreign('hospital_id')->references('id')->on('hospitals')->onDelete('cascade');
            $table->unique(array('user_research_id', 'hospital_id'));
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
