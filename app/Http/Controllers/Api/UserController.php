<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UnverifiedUser;
use App\Http\Requests\LoginRequest;
use App\Models\Profile;
use App\Models\UnverfiedUser;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
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
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $profile = Profile::create($data);
        $data['profile_id'] = $profile->id;
        $data['token'] = Str::random(50);
        $user = UnverfiedUser::create($data);
        $link = route('verify', ['token' => $user->token]);
        $subject = 'Email Verification';
        $message = "Thanks for registering with us, please click this link to verify your account $link";

        Mail::raw($message, function ($mail) use ($user, $subject) {
            $mail->to($user->email)->subject($subject);
        });
        return response()->json(['message' => "Email verification has been sent to $user->email"], 200);
    }

    public function verify($token)
    {
        $unverfieduser = DB::table('unverified_user')->where('token', $token)->first();
        DB::table('unverified_user')->where('token', $token)->delete();
        if ($unverfieduser) {
            $user = User::create(json_decode(json_encode($unverfieduser), true))->assignRole($unverfieduser->role);
            return redirect()->away('http://localhost:5173/verified/success');
        } else
            return redirect()->away('http://localhost:5173/verified/fail');


    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $user->update($data);
        $profile = Profile::find($user->profile_id);
        $profile->update($data);

        return response()->json(['message'=>'Account updated successfuly']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }

    public function login(LoginRequest $request)
    {
        $data = $request->validated();

        if (Auth::attempt($data)) {
            $user = Auth::user();
            $user->tokens()->delete();
            $token = $user->createToken('main')->plainTextToken;

            return response()->json(['token' => $token, 'message' => 'Welcome ' . $user->Profile->name], 200);
        }

        return response()->json(['message' => 'Wrong Username or Password'], 401);
    }


    public function logout()
    {
        $user = Auth::user();
        $user->tokens()->delete();
        return response()->json(['message' => 'Successfully Log Out']);
    }

    public function changePassword(Request $request){
        $data = $request->validate([
            'oldpassword' => ['required'],
            'newpassword' => ['required','string',Password::min(8)->letters()->symbols()->numbers()],
        ]);

        $id = Auth::id();
        $user = DB::table('user')->where('id',$id)->first();
        if(Hash::check($data['oldpassword'],$user->password)){
            $authenticated = Auth::user();
            $authenticated->password = $data['newpassword'];
            $authenticated->save();
            return response()->json(['message'=>'Password updated'],200);
        }
        return response()->json(['message'=>'Old password are not matched'],400);

    }
}
