<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('fio');
            $table->string('password');
            $table->date('date_birthday');
            $table->date('date_employment');
            $table->string('medical_book')->nullable();
            $table->string('role');
            $table->string('email')->unique()->nullable();
            $table->string('organization_name');
            $table->rememberToken();
            $table->timestamps();
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
        Schema::table('users', function($table)
        {
            $table->dropForeign('users_organization_name_foreign');
        });
        Schema::dropIfExists('users');
    }
}
