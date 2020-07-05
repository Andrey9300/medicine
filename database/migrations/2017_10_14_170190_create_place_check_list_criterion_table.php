<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlaceCheckListCriterionTable extends Migration
{
    public function up()
    {
        Schema::create('place_check_list_criterion', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('place_check_lists_id')->unsigned();
            $table->foreign('place_check_lists_id')->references('id')->on('place_check_lists')->onDelete('cascade');
            $table->integer('user_criterions_id')->unsigned();
            $table->foreign('user_criterions_id')->references('id')->on('user_criterions')->onDelete('cascade');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->enum('mark', [3, 2, 1, 0]); // 3 - A, 2 - B, 1 - C, 0 - N
            $table->string('comment_from_auditor', 5000)->nullable();
            $table->string('comment_at_auditor', 5000)->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('place_check_list_criterion');
    }
}
