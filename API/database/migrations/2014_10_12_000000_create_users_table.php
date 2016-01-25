<?php

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
            $table->increments('user_id');
            $table->string('name');
            $table->string('full_name');
            $table->string('run');
            $table->string('facebook_id');
            $table->string('facebook_email');
            $table->longText('facebook_token');
            $table->string('cellphone');
            $table->string('address');
            $table->string('email')->unique();
            $table->string('password', 60);
            $table->string('position_longitude');
            $table->string('position_latitude');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('users');
    }
}
