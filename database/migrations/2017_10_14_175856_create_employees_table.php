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
            $table->date('date_employment');
            $table->date('date_birthday');
            $table->string('medical_book');
            $table->string('organization_head_email');
            $table->foreign('organization_head_email')->references('head_email')->on('organizations');
            $table->unique(array('fio', 'date_birthday'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('employees', function($table)
        {
            $table->dropForeign('employees_organization_id_foreign');
        });
        Schema::dropIfExists('employees');
    }
}
