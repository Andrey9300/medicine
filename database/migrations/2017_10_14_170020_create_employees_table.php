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
            $table->string('medical_book')->nullable();
            $table->integer('user_id')->unsigned();
            // при удалении начальника качества => удаляются все сотрудники и руководители
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('organization_name')->nullable();
            // при удалении организаци => сотрудник не удаляется, нужно предварительно
            // organization_name = null всем сотрудникам удаляемой организации
            $table->foreign('organization_name')->references('name')->on('organizations');
            $table->unique(array('user_id', 'fio', 'date_birthday', 'date_employment'));
            $table->softDeletes();
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
