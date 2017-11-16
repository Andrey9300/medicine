<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->increments('id');
            $table->string('fio');
            $table->date('date_birthday');
            $table->date('date_employment');
            $table->date('date_inactive')->nullable();
            $table->string('medical_book')->nullable();
            $table->boolean('active')->default(true);
            $table->string('organization_name');
            $table->foreign('organization_name')->references('name')->on('organizations');
            $table->unique(array('fio', 'date_birthday', 'date_employment'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('employees');
    }
}
