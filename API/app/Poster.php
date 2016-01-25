<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Poster extends Model
{
    protected $table = 'poster';
    protected $primaryKey = 'poster_id';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['longitude', 'latitude', 'longitude_line', 'latitude_line', 'longitude_wall_line', 'latitude_wall_line'];

	public function track(){

    	return $this->hasMany('App\Track');
    }
}
