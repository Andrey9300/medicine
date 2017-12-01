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
            $table->date('date')->nullable();
            $table->integer('employee_id')->unsigned();
            $table->foreign('employee_id')->references('id')->on('employees');
            $table->integer('user_researches_id')->unsigned();
            $table->foreign('user_researches_id')->references('id')->on('user_researches')->onDelete('cascade');
            $table->unique(array('user_researches_id', 'employee_id'));
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
