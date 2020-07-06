<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAuditsGroupCriterionListTable extends Migration
{
    public function up()
    {
        Schema::create('audits_group_criterion_list', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('group_criterion_id')->unsigned();
            $table->foreign('group_criterion_id')->references('id')->on('audits_group_criterion')->onDelete('cascade');
            $table->integer('criterions_criterion_id')->unsigned();
            $table->foreign('criterions_criterion_id')->references('id')->on('audits_criterions')->onDelete('cascade');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('audits_group_criterion_list');
    }
}
