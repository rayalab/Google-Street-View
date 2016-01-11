<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserPoster extends Model
{
    protected $table = 'user_poster';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['user_poster_id', 'user_id', 'poster_id', 'game_id', 'token'];
}
