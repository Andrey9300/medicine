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
        });
    }

    public function down()
    {
        Schema::dropIfExists('audits_units');
    }
}
