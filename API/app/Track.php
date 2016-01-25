<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Track extends Model
{
           /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'track';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['longitude', 'latitude', 'title', 'description', 'poster_id'];


    public function Poster(){

        return $this->belongsTo('App\Poster');
    }
}
