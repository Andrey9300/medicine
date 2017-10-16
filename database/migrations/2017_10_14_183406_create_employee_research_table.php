<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmployeeResearchTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employee_research', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('employee_id')->unsigned();
            $table->integer('research_id')->unsigned();
            $table->date('date');
            $table->foreign('employee_id')->references('id')->on('employees');
            $table->foreign('research_id')->references('id')->on('researches');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employee_research');
    }
}
