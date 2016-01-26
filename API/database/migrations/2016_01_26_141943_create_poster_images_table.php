<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePosterImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('poster_image', function (Blueprint $table) {
            $table->increments('poster_image_id');
            $table->integer('poster_id');
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
        Schema::drop('poster_image');
    }
}
