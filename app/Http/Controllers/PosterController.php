<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Poster;
use App\GamePoster;
use DB;
class PosterController extends Controller
{
    
    public function __construct(){

        $this->middleware('cors');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function random($id)
    {
        $objInPoster = array();
        $find = 0;
        $gamePoster = GamePoster::where('user_id', $id)->select('poster_id')->get();
       
        if($gamePoster->count() > 0){

            foreach ($gamePoster as $key => $value) {
                array_push($objInPoster, $value->poster_id); 
            }
            $find = 12 - $gamePoster->count();
            if($find > 3){
                $poster = DB::table('poster')
                ->whereNotIn('poster_id', $objInPoster)
                ->orderByRaw('RAND()')
                ->take(3)
                ->get();
            }else{
                if($find > 0){
                    $poster = DB::table('poster')
                    ->whereNotIn('poster_id', $objInPoster)
                    ->orderByRaw('RAND()')
                    ->take($find)
                    ->get();
                }else{
                    $poster = [];
                }
            }

        }else{

            $poster = DB::table('poster')
            ->orderByRaw('RAND()')
            ->take(3)
            ->get(); 
        }

      

        return response()->json($poster);
    }

    public function index()
    {


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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $Poster = Poster::Where('poster_id', $id)->get();
        return response()->json($Poster);
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
