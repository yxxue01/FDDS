<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SpeciesResource;
use App\Models\FishInfo;
use App\Models\Species;
use App\Http\Requests\StoreSpeciesRequest;
use App\Http\Requests\UpdateSpeciesRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class SpeciesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return SpeciesResource::collection(Species::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSpeciesRequest $request)
    {
        $data = $request->validated();
        
        Species::create($data);

        return response()->json(['message'=>'New Species Created']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Species $species)
    {
        return $species;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Species $species)
    {
        $rules = 
        [
            'color' => ['nullable', 'regex:/^[A-Za-z\s]+$/'],
            'size' => ['nullable', 'regex:/^[A-Za-z\s]+$/'],
            'distribution' => ['nullable', 'regex:/^[A-Za-z\s]+$/'],
            'remarks' => ['nullable', 'regex:/^[A-Za-z\s]+$/'],
            'condition' => ['required', 'in:unknown,endangered,commercial,threatened'],
            'fish_info_id' => ['required', 'integer', 'exists:fish_info,id'],
        ];
        if(strtolower($species->speciesName) !== strtolower($request->speciesName)){
            $rules['speciesName'] = ['required', 'regex:/^[A-Za-z\s]+$/','unique:species,speciesName'];
        }
        $data = $request->validate($rules);

        $species->update($data);

        return response()->json(['message'=>'Species Updated']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Species $species)
    {
        $result = $species->delete();

        return response()->json(['message'=>'Species Successfully Deleted']);
    }

    public function loadGallery(Species $species){
        $details = DB::table('sample')
        ->where('sample.species_id', $species->id)
        ->where('sample.status', 'accepted')
        ->whereNotNull('sample.photo')
        ->join('site', 'sample.site_id', '=', 'site.id')
        ->join('dataset', 'dataset.id', '=', 'site.dataset_id')
        ->join('dataset_access', function ($query) {
            $query->on('dataset_access.dataset_id', '=', 'dataset.id')
                  ->where('dataset_access.privilege_id', 1);
        })
        ->join('user', 'dataset_access.user_id', '=', 'user.id')
        ->join('profile', 'profile.id', '=', 'user.profile_id')
        ->select('sample.photo as photo', 'user.email as email', 'profile.name as username')
        ->get();
        $count = 0;
        $data = collect([]);
        $total = $details->count();
        foreach($details as $item){
            $count += 1;
            $photo = Storage::disk('public')->url($item->photo);
            $item->photo = $photo;
            $item->count = $total;
            $data->push($item);
            if($count === 20){
                break;
            }
        }
        return $data;
    }


}
