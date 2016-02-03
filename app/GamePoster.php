<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GamePoster extends Model
{
    protected $table = 'game_poster';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['game_poster_id', 'user_id', 'poster_id', 'game_id'];
}
