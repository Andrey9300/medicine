<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrganizationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('organizations', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique();
            $table->string('address');
            $table->string('legal_entity');
            $table->string('head_fio');
            $table->string('head_email')->unique();
            $table->string('regional_email');
            $table->string('chef_email');
            $table->string('phone');
            $table->boolean('is_certification');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('organizations');
    }
}
