<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Poster extends Model
{
    protected $table = 'poster';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['longitude', 'latitude', 'token'];
}
