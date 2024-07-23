<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DatasetResource;
use App\Http\Resources\DatasetShareResource;
use App\Http\Resources\Repository\DatasetRepo;
use App\Http\Resources\Repository\DatasetStations;
use App\Http\Resources\SharedResource;
use App\Models\Dataset;
use App\Http\Requests\StoreDatasetRequest;
use App\Http\Requests\UpdateDatasetRequest;
use App\Models\DatasetAccess;
use App\Models\Profile;
use App\Models\Sample;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;


class DatasetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function shared()
    {
        $id = Auth::id();
        $ownedatset = DB::table('dataset')
            ->join('dataset_access', function ($query) use ($id) {
                $query->on('dataset.id', '=', 'dataset_access.dataset_id')
                    ->where('dataset_access.user_id', $id);
                $query->join('privilege', function ($query) {
                    $query->on('dataset_access.privilege_id', '=', 'privilege.id')
                        ->where('privilege.description', 'owner');
                });
            })
            ->select('dataset.id as dataset_id')
            ->get()
            ->pluck('dataset_id');
        $dataset1 = DB::table('dataset')
            ->join('dataset_access', function ($query) use ($ownedatset, $id) {
                $query->join('user', function ($query) {
                    $query->on('user.id', '=', 'dataset_access.user_id');
                });
                $query->join('privilege', function ($query) {
                    $query->on('dataset_access.privilege_id', '=', 'privilege.id')
                    ->where('privilege.description', 'requested');

                });
                $query->on('dataset.id', '=', 'dataset_access.dataset_id')
                    ->whereIn('dataset_access.dataset_id', $ownedatset)
                    ->where('dataset_access.user_id', '!=', $id);
            })
            ->select('dataset_access.user_id as user_id', 'dataset.id as dataset_id', 'dataset.datasetTitle as datasetTitle', 'dataset.state as state', 'privilege.description as status', 'user.email as email')
            ->get();

        $dataset2 = DB::table('dataset')
            ->join('dataset_access', function ($query) use ($id) {
                $query->on('dataset.id', '=', 'dataset_access.dataset_id')
                    ->where('dataset_access.user_id', $id);
                $query->join('privilege', function ($query) {
                    $query->on('dataset_access.privilege_id', '=', 'privilege.id')
                        ->whereIn('privilege.description', ['requested', 'rejected']);
                });
            })
            ->select('dataset_access.user_id as user_id', 'dataset.id as dataset_id', 'dataset.datasetTitle as datasetTitle', 'dataset.state as state', 'privilege.description as status', DB::raw("'myrequest' as email"))
            ->get();

        // $ownerlist = DB::table('dataset')
        // ->join('dataset_access',function ($query) use ($id){

        // })

        return DatasetShareResource::collection($dataset1->merge($dataset2));
    }

    public function cancelRequest(Request $request)
    {
        $item = DB::table('dataset_access')
            ->where('user_id', $request->user_id)
            ->where('dataset_id', $request->dataset_id)
            ->where('privilege_id', 3)
            ->delete();
        if ($item > 0)
            return response()->json(['message' => 'request deleted']);
        else
            return response()->json(['message' => 'fail to delete']);

    }

    public function requestResult(Request $request)
    {
        $id = Auth::id();

        $rights = DB::table('dataset_access')
            ->where('user_id', $id)
            ->where('dataset_id', $request->dataset_id)
            ->where('privilege_id', 1)
            ->get();

        if ($rights !== null) {

            if($request->operation === 'accept'){
            DB::table('dataset_access')
                ->where('user_id', $request->user_id)
                ->where('dataset_id', $request->dataset_id)
                ->update(['privilege_id'=>2]);
            }else{
                DB::table('dataset_access')
                ->where('user_id', $id)
                ->where('dataset_id', $request->dataset_id)
                ->delete();
            }
            return response()->json(['message' => 'Operation Success']);
        }
        return response()->json(['message' => 'Operation Failed']);

    }

    public function requestDataset(Request $request)
    {
        $id = Auth::id();
        DatasetAccess::create([
            'user_id' => $id,
            'dataset_id' => $request->datasetId,
            'privilege_id' => 3
        ]);

        return response()->json(['message'=>'Request has been sent']);
    }

    public function repository()
    {
        $id = Auth::id();
        $dataset = Dataset::whereHas('DatasetAccess', function ($query) use ($id) {
            $query->whereNotIn('dataset_id', function ($query) use ($id) {
                $query->select('dataset_id')
                    ->from('dataset_access')
                    ->where('user_id', $id);
            });
        })
            ->whereHas('Site', function ($query) {
                $query->where('status', 'completed');
            }, '>', 0)
            ->with([
                'Site' => function ($query) {
                    $query->where('status', 'completed');
                },
                'DatasetAccess.User.Profile'
            ])
            ->get();
        $data = collect($dataset);
        $data->map(function ($item) {
            $item->DatasetAccess->map(function ($dataset) use ($item) {
                $item->name = $dataset->user->profile->name;
            });
        });
        return DatasetRepo::collection($data);
    }
    public function repoDetails($id)
    {
        $dataset = Dataset::where('id', $id)
            ->with([
                'Site' => function ($query) {
                    $query->where('status', 'completed');
                },
                'DatasetAccess.User.Profile',
                'Site.Sample.Species',
                'Site.Sample'
            ])
            ->get();
        $data = collect($dataset);
        $data->map(function ($item) {
            $item->DatasetAccess->map(function ($dataset) use ($item) {
                $item->name = $dataset->user->profile->name;
            });
        });

        return DatasetStations::collection($data);
    }
    public function index()
    {
        $id = Auth::id();
        $dataset = Dataset::whereHas('DatasetAccess', function ($query) use ($id) {
            $query->where('user_id', $id)
                ->whereHas('Privilege', function ($query) {
                    $query->where('description', 'owner');
                });
        })->get();
        return DatasetResource::collection($dataset);
    }

    public function sharedDataset(){
        $id = Auth::id();
        $dataset = Dataset::whereHas('DatasetAccess', function ($query) use ($id) {
            $query->where('user_id', $id)
                ->whereHas('Privilege', function ($query) {
                    $query->where('description', 'shared');
                });
        })->get()->pluck('id');

        // $result = Dataset::whereHas('DatasetAccess', function ($query) use ($dataset) {
        //     $query->whereIn('dataset_id', $dataset);
        //     $query->whereHas('Privilege')
        //     ->where('Privelege.description','owner');
        // })->with(['DatasetAccess.User.Profile'])->get();

        $result = DB::table('dataset')
        ->join('dataset_access',function ($query) use ($dataset){
            $query->on('dataset_access.dataset_id','=','dataset.id');
            $query->whereIn('dataset_access.dataset_id',$dataset);
        })
        ->join('privilege',function ($query){
            $query->on('privilege.id','=','dataset_access.privilege_id');
            $query->where('privilege.description','owner');
        })
        ->join('user',function ($query){
            $query->on('user.id','=','dataset_access.user_id');
        })
        ->join('profile',function ($query){
            $query->on('user.profile_id','=','profile.id');
        })
        ->select('dataset.*','user.email','profile.name')
        ->get();
        return SharedResource::collection($result);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDatasetRequest $request)
    {
        $data = $request->validated();
        $user = Auth::id();
        $dataset = Dataset::create($data);
        DatasetAccess::create(
            [
                'user_id' => $user,
                'dataset_id' => $dataset->id,
                'privilege_id' => 1,
            ]
        );
        return response()->json(['message' => 'Dataset Successfully Created']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Dataset $dataset)
    {
        return DatasetResource::make($dataset->load('Site'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDatasetRequest $request, Dataset $dataset)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dataset $dataset)
    {
        return $dataset->delete();
    }

    public function unbind(Dataset $dataset){
        $id = Auth::id();
        DatasetAccess::where('dataset_id',$dataset->id)
        ->where('user_id',$id)
        ->delete();
        return response()->json(['message'=>'Dataset successfully unbound']);
    }

}
