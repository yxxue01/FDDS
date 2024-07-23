<?php

namespace App\Http\Controllers\Api;

use App\Exports\AnalysisResult;
use App\Exports\ExportSample;
use App\Exports\SpeciesListExport;
use App\Http\Controllers\Controller;
use App\Http\Resources\AnalysisResource;
use App\Http\Resources\SampleResource;
use App\Http\Resources\SampleSharedResource;
use App\Http\Resources\SummaryResource;
use App\Imports\ImportSample;
use App\Models\Dataset;
use App\Models\DatasetAccess;
use App\Models\EdtorTask;
use App\Models\Sample;
use App\Http\Requests\StoreSampleRequest;
use App\Http\Requests\UpdateSampleRequest;
use App\Models\Site;
use App\Models\Species;
use App\Models\User;
use Atomescrochus\StringSimilarities\Compare;
use DateTime;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;


class SampleController extends Controller
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
    public function store(StoreSampleRequest $request)
    {
        $date = new DateTime($request->datecollected);
        $species = Species::all();
        $value = 0;
        $holds = '';


        $comparison = new Compare();
        // comment if re-migrate
        // if ($request->file('data') != null) {
        //     $path = $request->file('data')->store('images', 'public');
        //     $request->merge([
        //         'photo' => $path
        //     ]);
        // }

        foreach ($species as $name) {
            $current = $comparison->similarText($request->species_id, $name->speciesName);
            if ($value < $current) {
                $value = $current;
                $holds = $name->id;
            }
        }
        $request->merge([
            'datecollected' => $date->format('Y-m-d'),
            'time' => $date->format('H:i:s'),
            'species_id' => $holds,
        ]);

        $newsample = Sample::create($request->all());

        $fishfamily = DB::table('sample')
            ->where('sample.id', $newsample->id)
            ->join('species', function ($query) {
                $query->on('species.id', '=', 'sample.species_id');
            })
            ->join('fish_info', function ($query) {
                $query->on('fish_info.id', '=', 'species.fish_info_id');
            })
            ->select('fish_info.id as fish_id')
            ->get()
            ->pluck('fish_id');

        $sample = DB::table('sample')
            ->where('sample.id', $newsample->id)
            ->join('species', function ($query) {
                $query->on('species.id', '=', 'sample.species_id');
            })
            ->join('fish_info', function ($query) {
                $query->on('fish_info.id', '=', 'species.fish_info_id');
            })
            ->select('sample.id as sample_id', 'fish_info.id as family_id')
            ->get();

        $editor = DB::table('editor')
            ->join('user', function ($query) {
                $query->on('editor.user_id', '=', 'user.id');
            })
            // ->join('editor_task',function ($query){
            //     $query->on('editor_task.user_id','=','user.id');
            // })
            ->whereIn('editor.fish_info_id', $fishfamily)
            ->select('editor.user_id as user_id', 'editor.fish_info_id as family_id')
            ->get();

        // $editorids = collect();
        // foreach($editor as $item){
        //     $editorids->push($item->user_id);
        // }
        // $editorids = $editorids->unique();

        foreach ($sample as $item) {
            foreach ($editor as $edit) {
                if ($item->family_id === $edit->family_id) {
                    EdtorTask::create([
                        'user_id' => $edit->user_id,
                        'sample_id' => $item->sample_id
                    ]);
                    $target = Sample::find($item->sample_id);
                    $target->status = 'inprocess';
                    $target->save();
                    break;
                }
            }
        }

        $this->statusVerification($request->site_id);

    }


    public function statusVerification($id)
    {
        $site = Site::find($id);

        $samples = Sample::where('site_id', $site->id)->get();

        $complete = true;

        foreach ($samples as $sample) {
            if ($sample->status == 'notassigned' || $sample->status == 'inprocess') {
                $complete = false;
            }
        }

        if ($complete)
            $site->status = 'completed';
        else
            $site->status = 'incomplete';
        $site->save();

    }
    /**
     * Display the specified resource.
     */
    public function show(Sample $sample)
    {
        return SampleResource::make($sample->load('Species', 'Species.FishInfo'));
    }

    public function showShared(Sample $sample)
    {
        return SampleSharedResource::make($sample->load('Species', 'Species.FishInfo'));
    }

    public function update(UpdateSampleRequest $request, Sample $sample)
    {
        $date = new DateTime($request->datecollected);
        $species = Species::all();
        $value = 0;
        $holds = '';
        $comparison = new Compare();
        if ($request->file('data') != null) {
            $path = $request->file('data')->store('images', 'public');
            $request->merge([
                'photo' => $path
            ]);
        }
        foreach ($species as $name) {
            $current = $comparison->similarText($request->species_id, $name->speciesName);
            if ($value < $current) {
                $value = $current;
                $holds = $name->id;
            }
        }
        $request->merge([
            'datecollected' => $date->format('Y-m-d'),
            'time' => $date->format('H:i:s'),
            'species_id' => $holds,
        ]);

        if ($request->species_id === $sample->species_id && $request->type === $sample->type && $request->commonname === $sample->commonname) {
            $sample->update($request->all());
        } else {
            $request->merge([
                'status' => 'notassigned'
            ]);
            $sample->update($request->all());
            $this->assignEditor($sample->site_id);
        }

        $this->statusVerification($sample->site_id);


    }

    public function destroy(Sample $sample)
    {
        $sample->delete();
        return response()->json('smaple with id:' . $sample->id . ' deleted');
    }


    public function excelExport($id)
    {
        $sitename = Site::find($id);
        $safeSitename = preg_replace('/[^A-Za-z0-9_\-]/', '_', $sitename->name);
        return Excel::download(new ExportSample($id), "{$safeSitename}_Station.xlsx");
    }
    public function excelImport(Request $request)
    {
        $id = $request->id;
        Excel::import(
            new ImportSample($id),
            $request->file('file')
        );

        // $sampleids = DB::table('sample')
        // ->join('site',function ($query) use ($id){
        //     $query->on('sample.site_id','=','site.id')
        //     ->where('site.id',$id);
        // })
        // ->where('sample.status','=','notassigned')
        // ->select('sample.id')
        // ->get()
        // ->pluck('id');

        $this->assignEditor($id);

        $this->statusVerification($id);
    }
    public function excelTemplate(Request $request)
    {
        if (Storage::disk('public')->exists('template/dataset_template.xlsx')) {
            $path = storage_path('app/public/template/dataset_template.xlsx');
            return response()->download($path);
        } else
            abort(404);
    }

    public function summary(Request $request)
    {
        $user = $request->user();

        $dataset = Dataset::whereHas('DatasetAccess', function ($query) use ($user) {
            $query->where('user_id', $user->id)
                ->whereHas('Privilege', function ($query) {
                    $query->where('description', 'owner');
                });
        })->pluck('id');
        // return ($dataset);
        $summary = DB::table('site')
            ->join('dataset', function ($join) use ($dataset) {
                $join->on('site.dataset_id', '=', 'dataset.id');
                $join->whereIn('dataset.id', $dataset);
            })
            ->join('sample', function ($join) {
                $join->on('site.id', '=', 'site_id');
                $join->join('species', function ($join) {
                    $join->on('species.id', '=', 'species_id');
                });
            })
            ->select('site.siteName', 'site.id', 'sample.type', 'species.speciesName', 'species.condition')
            ->get();
        $collection = collect($summary);

        $grouped = $collection->groupBy('siteName');

        $data = collect();
        $grouped->map(function ($item, $key) use ($data) {
            $data->push([
                'siteName' => $key,
                'data' => $item
            ]);
        });

        return SummaryResource::collection($data);

        /*
            table 'site', join with table 'dataset',
            $join is the instance, received from the second argument of join clause,
            join on dataset_id,
            stating to join only if either one of $id was matched
            species:name,condition means like im selecting only these two column, but in a simple syntax
        */
    }

    public function analysis(Request $request)
    {
        $user = $request->user();

        $summary = DB::table('dataset_access')
            ->join('dataset', function ($join) use ($user) {
                $join->on('dataset.id', '=', 'dataset_access.dataset_id');
                $join->where('dataset_access.user_id', $user->id);
                $join->where('dataset_access.privilege_id', '!=', 3);
                $join->join('site', function ($join) {
                    $join->on('site.dataset_id', '=', 'dataset.id');
                    $join->join('sample', function ($join) {
                        $join->on('site.id', '=', 'sample.site_id');
                        $join->join('species', function ($join) {
                            $join->on('species.id', '=', 'sample.species_id');
                        });
                    });
                });
            })
            ->join('privilege', function ($join) {
                $join->on('privilege.id', '=', 'dataset_access.privilege_id');
            })
            ->select('dataset.state', 'site.siteName', 'privilege.description', 'species.speciesName')
            ->get();

        $grouped = collect($summary)->groupBy('state')->map(function ($item) {
            return $item->groupBy('siteName')->map(function ($item) {
                return $item->groupBy('speciesName')->map->count();
            });
        });
        return $grouped;
    }

    public function reviewSample(Request $request)
    {
        $id = Auth::id();

        $sampleids = DB::table('editor_task')
            ->join('user', function ($query) use ($id) {
                $query->on('user.id', '=', 'editor_task.user_id')
                    ->where('user.id', $id);
            })
            ->get()
            ->pluck('sample_id');

        $sample = Sample::whereIn('id', $sampleids)->with(['Task', 'Species', 'Species.FishInfo'])->get();

        return SampleResource::collection($sample);
    }

    public function sampleResult(Request $request)
    {
        $sample = Sample::find($request->id);
        if ($request->status === 'accepted') {
            $id = Auth::id();

            $user = User::find($id);
            $editorname = $user->Profile->name;
            if ($sample->identifiedBy === null) {
                $sample->identifiedBy = $editorname;
                $sample->identifiedDate = date('Y-m-d');
            }
            if ($sample->species_id) {
                $species = Species::all();
                $value = 0;
                $holds = 0;
                $comparison = new Compare();

                foreach ($species as $name) {
                    $current = $comparison->similarText($request->species_id, $name->speciesName);
                    if ($value < $current) {
                        $value = $current;
                        $holds = $name->id;
                    }
                }
                $sample->commonname = $request->commonname;
                $sample->species_id = $holds;
            }
            if ($request->type != null)
                $sample->type = $request->type;
            $sample->status = 'accepted';
            $sample->save();
        } else {
            $sample->status = 'rejected';
            $sample->save();
        }

        EdtorTask::find($request->taskid)->delete();

        $this->statusVerification($sample->site_id);

        return response()->json(['message' => 'Operation Success']);
    }

    private function assignEditor($siteid)
    {
        $fishfamily = DB::table('sample')
            ->join('site', function ($query) use ($siteid) {
                $query->on('sample.site_id', '=', 'site.id')
                    ->where('site.id', $siteid);
            })
            ->join('species', function ($query) {
                $query->on('species.id', '=', 'sample.species_id');
            })
            ->join('fish_info', function ($query) {
                $query->on('fish_info.id', '=', 'species.fish_info_id');
            })
            ->select('fish_info.id')
            ->groupBy('fish_info.id')
            ->get()
            ->pluck('id');

        $sample = DB::table('sample')
            ->join('site', function ($query) use ($siteid) {
                $query->on('sample.site_id', '=', 'site.id')
                    ->where('site.id', $siteid);
            })
            ->join('species', function ($query) {
                $query->on('species.id', '=', 'sample.species_id');
            })
            ->join('fish_info', function ($query) {
                $query->on('fish_info.id', '=', 'species.fish_info_id');
            })
            ->where('sample.status', '=', 'notassigned')
            ->select('sample.id as sample_id', 'fish_info.id as family_id')
            ->get();

        $editor = DB::table('editor')
            ->join('user', function ($query) {
                $query->on('editor.user_id', '=', 'user.id');
            })
            // ->join('editor_task',function ($query){
            //     $query->on('editor_task.user_id','=','user.id');
            // })
            ->whereIn('editor.fish_info_id', $fishfamily)
            ->select('editor.user_id as user_id', 'editor.fish_info_id as family_id')
            ->get();

        // $editorids = collect();
        // foreach($editor as $item){
        //     $editorids->push($item->user_id);
        // }
        // $editorids = $editorids->unique();

        foreach ($sample as $item) {
            foreach ($editor as $edit) {
                if ($item->family_id === $edit->family_id) {
                    $exists = EdtorTask::
                        where('sample_id', $item->sample_id)
                        ->exists();
                    if ($exists) {
                        $target = Sample::find($item->sample_id);
                        $target->status = 'inprocess';
                        $target->save();
                        break;
                    }
                    EdtorTask::create([
                        'user_id' => $edit->user_id,
                        'sample_id' => $item->sample_id
                    ]);
                    $target = Sample::find($item->sample_id);
                    $target->status = 'inprocess';
                    $target->save();
                    break;
                }
            }
        }
    }

    public function analysisDownload(Request $request){
        $index = json_decode($request->input('index'), true);
        $station = json_decode($request->input('stations'), true);
        $speciesList = json_decode($request->input('speciesList'), true);

        return Excel::download(new AnalysisResult($speciesList,$station,$index),'Analysis.xlsx');
    }   
}
