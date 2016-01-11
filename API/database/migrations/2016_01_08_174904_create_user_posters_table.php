<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserPostersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_poster', function (Blueprint $table) {
            $table->increments('user_poster_id');
            $table->integer('user_id');
            $table->integer('play_id');
            $table->integer('poster_id');
            $table->longText('token');            
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
        Schema::drop('user_poster');
    }
}
