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
            $table->longText('image_1');
            $table->longText('image_2');
            $table->longText('image_3');
            $table->longText('image_4');
            $table->longText('image_5');
            $table->longText('image_6');
            $table->longText('image_7');
            $table->longText('image_8');
            $table->longText('image_9');
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
