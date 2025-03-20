<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TagController;
use App\Models\Post;

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

//Usuario
Route::get('/usuarios', [UserController::class, 'index']);
Route::post('/usuario/insert', [UserController::class, 'store']);
Route::post('/usuario/edit/{id}', [UserController::class, 'update']);
Route::delete('/usuario/delete/{id}', [UserController::class, 'delete']);


//posts
Route::get('/posts', [PostController::class, 'index']);
Route::post('/post/insert', [PostController::class, 'store']);
Route::post('/post/update/{id}', [PostController::class, 'update']);
Route::delete('/post/{id}', [PostController::class, 'delete']);


//tags
Route::get('/tags', [TagController::class, 'index']);
Route::post('/tag/insert', [TagController::class, 'store']);
Route::post('/tags/update/{id}', [TagController::class, 'update']);
Route::delete('/tag/{id}', [TagController::class, 'delete']);
