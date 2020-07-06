<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAuditsPlacesTable extends Migration
{
    public function up()
    {
        Schema::create('audits_places', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('location_id')->unsigned();
            $table->foreign('location_id')->references('id')->on('audits_locations')->onDelete('cascade');
            $table->unique(array('name', 'location_id'));
        });
    }

    public function down()
    {
        Schema::dropIfExists('audits_places');
    }
}
