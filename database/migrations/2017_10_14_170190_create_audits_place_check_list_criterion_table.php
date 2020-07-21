<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

// связка проведенного аудита и оценка по конкретному критирию
class CreateAuditsPlaceCheckListCriterionTable extends Migration
{
    public function up()
    {
        Schema::create('audits_place_check_list_criterion', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('place_check_lists_id')->unsigned();
            $table->foreign('place_check_lists_id')->references('id')->on('audits_place_check_lists')->onDelete('cascade');
            $table->integer('criterions_id')->unsigned();
            $table->foreign('criterions_id')->references('id')->on('audits_criterions')->onDelete('cascade');
            $table->enum('mark', [3, 2, 1, 0]); // 3 - A, 2 - B, 1 - C, 0 - N
            $table->string('comment_from_auditor', 5000)->nullable();
            $table->string('comment_at_auditor', 5000)->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('audits_place_check_list_criterion');
    }
}
