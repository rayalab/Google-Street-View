<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Socialite;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;
use App\Game;
use Illuminate\Support\Collection;
use DateTime;
use DB;

class SocialController extends Controller
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
        $Game = Game::where('user_id', 1)->where('finish','0000-00-00 00:00:00')->get();
        return $collection = collect($Game[0]);
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
        $dt = new DateTime;
        $req = $request->all();
        $User = [];
        $Game = [];     

        $User = User::where('facebook_id', $req["facebook_id"])->get();
        $position_longitude = "-70.584075208";
        $position_latitude = "-33.415208";
        $full_name = $req["full_name"];

        if($User->count() > 0){
            $UserNew = $User[0]->user_id;
            $full_name = $User[0]->full_name;
            $new = false;
        }else{
            $UserNew = DB::table('users')->insertGetId(
                [
                'full_name' => $req["full_name"],
                'name' => $req["last_name"],
                'facebook_id' => $req["facebook_id"],
                'facebook_token' => $req["facebook_token"],
                'position_longitude' => $position_longitude,
                'position_latitude' => $position_latitude
                ]
            );
            $new = true;
        }

        $Game = Game::where('user_id', $UserNew)->where('finish', '0000-00-00 00:00:00')->get();

        if($Game->count() > 0){
            $GameNew = $Game[0]->game_id;
        }else{
            $GameNew = DB::table('game')->insertGetId(
                [
                'user_id' => $UserNew,
                'start' => $dt->format('y-d-m H:i:s')
                ]
            );
        }


        return response()->json(array('full_name' => $full_name, 'user_id' => $UserNew,'game_id' => $GameNew, 'new' => $new));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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

    /**
     * Redirect the user to the Facebook authentication page.
     *
     * @return Response
     */
    public function redirectToProvider()
    {
        return Socialite::driver('facebook')->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return Response
     */
    public function handleProviderCallback()
    {
        $user = Socialite::driver('facebook')->user();

        $UserFind = User::firstOrNew([
            'email' => $user->id
        ]);
        $UserFind->full_name = $user->name;
        $UserFind->name = $user->name;
        $UserFind->facebook_id = $user->id;
        $UserFind->facebook_token = $user->token;
        $UserFind->position_longitude = "-70.584075208";
        $UserFind->position_latitude = "-33.415208";
        $UserFind->save();
        return redirect('/dashboard');
        return response()->json($UserFind);
    }
}
