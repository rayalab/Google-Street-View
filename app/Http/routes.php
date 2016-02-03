<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::resource('social', 'SocialController', ['only' => ['index', 'store', 'update', 'destroy', 'show']]);
/*Route::get('auth/facebook', 'SocialController@redirectToProvider');
Route::get('auth/facebook/callback', 'SocialController@handleProviderCallback');*/

Route::resource('user', 'UserController', ['only' => ['index', 'store', 'update', 'destroy', 'show']]);
Route::resource('poster', 'PosterController', ['only' => ['index', 'store', 'update', 'destroy', 'show']]);
Route::resource('cluePoster', 'CluePosterController', ['only' => ['index', 'store', 'update', 'destroy', 'show']]);
Route::resource('gamePoster', 'GamePosterController', ['only' => ['index', 'store', 'update', 'destroy', 'show']]);
Route::resource('posterImage', 'PosterImageController', ['only' => ['index', 'store', 'update', 'destroy', 'show']]);