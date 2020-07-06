<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAuditsLocationsTable extends Migration
{
    public function up()
    {
        Schema::create('audits_locations', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('unit_id')->unsigned();
            $table->foreign('unit_id')->references('id')->on('audits_units')->onDelete('cascade');
            $table->unique(array('name', 'unit_id'));
        });
    }

    public function down()
    {
        Schema::dropIfExists('audits_locations');
    }
}
