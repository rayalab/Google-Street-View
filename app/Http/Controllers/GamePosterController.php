<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\GamePoster;
use App\Poster;

class GamePosterController extends Controller
{

    public function __construct(){

        $this->middleware('cors');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $poster = Poster::where('poster_id', 1)->value('image_default');
        return $poster;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $req = $request->all();

        $gamePoster = new GamePoster();
        $gamePoster->user_id = $req["user_id"];
        $gamePoster->game_id = $req["game_id"];
        $gamePoster->poster_id = $req["poster_id"];
        $gamePoster->save();

        $poster = Poster::where('poster_id', $req["poster_id"])->value('image_default');

        return response()->json(array('gamePoster' => $gamePoster, 'poster' => $poster[0]));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $objImgPoster = array();
        $gamePoster = GamePoster::where('user_id', $id)->select('poster_id')->get();

        if($gamePoster->count() > 0){

            foreach ($gamePoster as $value) {
                $find = Poster::where('poster_id', $value->poster_id)->select('image_default', 'poster_id')->get();
                array_push($objImgPoster, $find[0]); 
            }
            return response()->json($objImgPoster);
        }else{

            return false;
        }

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
