<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Editor;
use App\Models\FishInfo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
    public function userList(){
        $id = Auth::id();
        $users = User::where('id','!=',$id)->with('roles')->get();

        foreach($users as $user){
            foreach($user->roles as $role){
                if($role->name === "Editor"){
                    $fishids = DB::table('editor')
                    ->join('user', function ($query){
                        $query->on('user.id','=','editor.user_id');
                    })
                    ->select('editor.fish_info_id as ids')
                    ->where('editor.user_id',$user->id)
                    ->get()
                    ->pluck('ids');
                    $fishFam = FishInfo::whereIn('id',$fishids)->get();
                    $user->fishFamily = $fishFam;
                }
            }
        }


        return $users;
    }

    public function assignEditor(Request $request){
        $user = User::find($request->user_id);

        $list = json_decode($request->familylist);
        if($request->operation === "new"){
            $user->assignRole('Editor');
        }
        else{
            Editor::where('user_id',$user->id)->delete();
        }
        foreach($list as $id){
            Editor::create([
                'user_id'=>$user->id,
                'fish_info_id'=>$id
            ]);
        }
        return response()->json(['message'=>'Operation Succeess']);
    }
    
    public function removeEditor(Request $request){
        $user = User::find($request->id);

        DB::table('editor')->where('user_id',$user->id)->delete();

        $user->removeRole('Editor');
        return response()->json(['message'=>'Operation success']);
    }

    public function removeUser(Request $request){
        User::find($request->id)->delete();

        return response()->json(['message'=>'User deleted successfully']);
    }

    public function getFamily(){
        return FishInfo::all();
    }
}
