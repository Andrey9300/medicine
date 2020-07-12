<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

// связка набора критериев помещения и user, с данными об аудите
class CreateAuditsPlaceCheckListsTable extends Migration
{
    public function up()
    {
        Schema::create('audits_place_check_lists', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('criterion_lists_id')->unsigned();
            $table->foreign('criterion_lists_id')->references('id')->on('audits_criterion_lists')->onDelete('cascade');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->date('created_at');
            $table->boolean('sended');
        });
    }

    public function down()
    {
        Schema::dropIfExists('audits_place_check_lists');
    }
}
