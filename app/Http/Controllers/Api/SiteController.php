<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SiteResource;
use App\Models\DatasetAccess;
use App\Models\Site;
use App\Http\Requests\StoreSiteRequest;
use App\Http\Requests\UpdateSiteRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SiteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function OwnedSite($id)
    {
        $sites = Site::where('dataset_id', $id)->get();
        return SiteResource::collection($sites);
    }
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSiteRequest $request)
    {
        $data = $request->validated();
        $site = Site::create($data);


        return response()->json(['message'=>'Site Successfully Created']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Site $site)
    {
        return SiteResource::make($site->load(['Sample', 'Sample.Species', 'Sample.Species.FishInfo']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSiteRequest $request, Site $site)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Site $site)
    {
        return $site->delete();
    }
    public function request(Request $request)
    {
        $id = Auth::id();
        DatasetAccess::create([
            'user_id' => $id,
            'dataset_id' => $request->datasetId,
            'privilege_id' => 3
        ]);

        return response()->json(['message'=>'Request has been sent']);
    }


}
