<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Socialite;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;
use App\Game;
use Illuminate\Support\Collection;

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
        $req = $request->all();

        $User = User::firstOrNew([
            'email' => $req["email"]
        ]);
        $User->full_name = $req["full_name"];
        $User->name = $req["last_name"];
        $User->facebook_email = $req["email"];
        $User->facebook_id = $req["facebook_id"];
        $User->facebook_token = $req["facebook_token"];
        $User->position_longitude = "-70.584075208";
        $User->position_latitude = "-33.415208";
        $User->save();

        $Game = Game::where('user_id', $User->user_id)->where('finish','0000-00-00 00:00:00')->select('game_id')->get();

        if(!$Game->count() > 0){
            $Game = new Game();
            $Game->user_id = $User->user_id;
            $Game->save();
        }else{
            $Game = $Game[0];
        }

        return response()->json(array('user' => $User,'game' => $Game));
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
