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
            $table->integer('hospital_id')->unsigned();
            $table->foreign('hospital_id')->references('id')->on('hospitals');
            $table->integer('research_category_id')->unsigned();
            $table->foreign('research_category_id')->references('id')->on('research_category');
            $table->unique(array('hospital_id', 'research_category_id'));
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
