<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
        Schema::create('poster', function (Blueprint $table) {
            $table->increments('poster_id');
            $table->string('longitude');
            $table->string('latitude');
            $table->string('longitude_line');
            $table->string('latitude_line');
            $table->string('longitude_wall_line');
            $table->string('latitude_wall_line');
            $table->longText('image_default');
            $table->longText('first_clue_latitude');
            $table->longText('first_clue_longitude');
            $table->longText('first_clue_title');
            $table->longText('first_clue_description');
            $table->longText('second_clue_latitude');
            $table->longText('second_clue_longitude');
            $table->longText('second_clue_title');
            $table->longText('second_clue_description');
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
        Schema::drop('poster');
    }
}
