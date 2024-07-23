<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FishInfoResource;
use App\Models\FishInfo;
use Illuminate\Http\Request;

class FishInfoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       return FishInfoResource::collection(FishInfo::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'familyName' => ['required','unique:fish_info,familyName'],
            'background' => ['required'],
        ]);

        return FishInfo::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(FishInfo $fishInfo)
    {
        return $fishInfo;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FishInfo $fishInfo)
    {
        $rules = [
            'background' => ['required'],
        ];
        if(strtolower($fishInfo->familyName) !== strtolower($request->familyName)){
            $rules['familyName'] = ['required', 'regex:/^[A-Za-z\s]+$/','unique:fish_info,familyName'];
        }
        $data = $request->validate($rules);

        $fishInfo->update($data);

        return response()->json(['message'=>'Fish family updated']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FishInfo $fishInfo)
    {
        $fishInfo->delete();
        return response()->json(['messsage'=>'Fish family successfully deleted']);
    }
}
