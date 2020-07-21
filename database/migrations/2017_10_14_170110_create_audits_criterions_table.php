<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAuditsCriterionsTable extends Migration
{
    public function up()
    {
        Schema::create('audits_criterions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 3000);
        });
    }

    public function down()
    {
        Schema::dropIfExists('audits_criterions');
    }
}
