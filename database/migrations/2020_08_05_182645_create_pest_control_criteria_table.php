<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePestControlCriteriaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pest_control_criteria', function (Blueprint $table) {
            $table->increments('id');
            $table->string('checked')->nullable();
            $table->integer('count')->nullable();
            $table->boolean('changed')->nullable();
            $table->integer('place_id')->unsigned();
            $table->foreign('place_id')->references('id')->on('pest_places')->onDelete('cascade');
            $table->integer('pest_control_id')->unsigned();
            $table->foreign('pest_control_id')->references('id')->on('pest_controls')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pest_control_criteria');
    }
}
