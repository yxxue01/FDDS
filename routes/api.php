<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\DatasetController;
use App\Http\Controllers\Api\FishInfoController;
use App\Http\Controllers\Api\SampleController;
use App\Http\Controllers\Api\SiteController;
use App\Http\Controllers\Api\SpeciesController;
use App\Http\Controllers\Api\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user = $request->user()->load(['roles','Profile']);
    return $user;
});
Route::middleware(['auth:sanctum', 'role:Researcher'])->group(function () {
    Route::apiResource('/researcher/dataset', DatasetController::class);
    Route::get('/researcher/shared/dataset', [DatasetController::class, 'shared']);
    Route::get('/researcher/summary', [SampleController::class, 'summary']);
    Route::get('/analysis', [SampleController::class, 'analysis']);
    Route::get('/repository', [DatasetController::class, 'repository']);
    Route::get('/repository/{id}', [DatasetController::class, 'repoDetails']);
    Route::post('/repository/request', [DatasetController::class, 'requestDataset']);
    Route::post('/repository/cancelrequest', [DatasetController::class, 'cancelRequest']);
    Route::post('/repository/requestresult', [DatasetController::class, 'requestResult']);
    Route::get('/user/logout', [UserController::class, 'logout']);
    Route::get('/dataset/shared',[DatasetController::class, 'sharedDataset']);
    Route::get('/researcher/sample/shared/{sample}',[SampleController::class, 'showShared']);
    Route::post('/researcher/dataset/unbind/{dataset}',[DatasetController::class, 'unbind']);
    Route::post('/analysis/download',[SampleController::class,'analysisDownload']);
});
Route::post('/researcher/user/update/{user}',[UserController::class,'update'])->middleware(['auth:sanctum']);
Route::post('/changepassword',[UserController::class,'changePassword'])->middleware(['auth:sanctum']);

Route::get('/sample/review', [SampleController::class, 'reviewSample'])->middleware(['auth:sanctum', 'role:Editor']);
Route::post('/sample/result', [SampleController::class, 'sampleResult'])->middleware(['auth:sanctum', 'role:Editor']);

Route::middleware(['auth:sanctum', 'role:Super_Admin'])->group(function () {
    Route::get('/admin/userlist', [AdminController::class, 'userList']);
    Route::get('/admin/familylist', [AdminController::class, 'getFamily']);
    Route::post('/admin/assigneditor', [AdminController::class, 'assignEditor']);
    Route::post('/admin/removeditor', [AdminController::class, 'removeEditor']);
    Route::post('/admin/removeuser', [AdminController::class, 'removeUser']);
    Route::get('/admin/logout', [UserController::class, 'logout']);
});

//for public use

Route::get('/discovery/family', [FishInfoController::class, 'index']);
Route::get('/discovery/species', [SpeciesController::class, 'index']);

// 

Route::get('/loadGallery/{species}', [SpeciesController::class, 'loadGallery']);
Route::get('/template', [SampleController::class, 'excelTemplate']);

Route::post('/register', [UserController::class, 'store']);
Route::post('/login', [UserController::class, 'login']);
Route::get('/verify/{token}', [UserController::class, 'verify'])->name('verify');

Route::post('/researcher/sample/update/{sample}', [SampleController::class, 'update']);
Route::get('/exceltemplate', [SampleController::class, 'excelTemplate']);
Route::post('/researcher/sample/import', [SampleController::class, 'excelImport']);
Route::get('/researcher/sample/export/{id}', [SampleController::class, 'excelExport']);
Route::get('/researcher/{user_id}/dataset', [DatasetController::class, 'OwnedDataset']);
Route::get('/researcher/{id}/site', [SiteController::class, 'OwnedSite']);
Route::post('/researcher/family/{fishInfo}', [FishInfoController::class,'update']);
Route::delete('/researcher/family/{fishInfo}', [FishInfoController::class,'destroy']);
Route::post('/researcher/species/{species}', [SpeciesController::class,'update']);
Route::delete('/researcher/species/{species}', [SpeciesController::class,'destroy']);
Route::apiResource('/researcher/site', SiteController::class);
Route::apiResource('/researcher/sample', SampleController::class);
Route::apiResource('/researcher/species', SpeciesController::class);
Route::apiResource('/researcher/family', FishInfoController::class);

