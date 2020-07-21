<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

// связка группы критериев, критерия и user
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
        });
    }

    public function down()
    {
        Schema::dropIfExists('audits_group_criterion_list');
    }
}
