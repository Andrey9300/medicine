<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

// связка помещения и группы критериев
// поля unit_id, location_id, user_id? - можно убрать
class CreateAuditsCriterionListsTable extends Migration
{
    public function up()
    {
        Schema::create('audits_criterion_lists', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('unit_id')->unsigned();
            $table->foreign('unit_id')->references('id')->on('audits_units')->onDelete('cascade');
            $table->integer('location_id')->unsigned();
            $table->foreign('location_id')->references('id')->on('audits_locations')->onDelete('cascade');
            $table->integer('place_id')->unsigned();
            $table->foreign('place_id')->references('id')->on('audits_places')->onDelete('cascade');
            $table->integer('group_criterion_id')->unsigned();
            $table->foreign('group_criterion_id')->references('id')->on('audits_group_criterion')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('audits_criterion_lists');
    }
}
