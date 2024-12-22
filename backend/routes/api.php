<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\CommentController; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Aqui é onde você pode registrar rotas da API para sua aplicação.
| Essas rotas são carregadas pelo RouteServiceProvider dentro de um grupo
| que é atribuído ao grupo de middleware "api". Aproveite para construir sua API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/signup', [UserController::class, 'store'])->name('signup');
Route::post('/login', [UserController::class, 'login'])->name('login');

Route::group(['middleware'=> 'jwt.verify'], function () {
    Route::prefix('/usuarios')->get('/{id}', [UserController::class, 'show'])->name('usuarios.perfil');

    Route::post('/logout', [UserController::class, 'logout'])->name('users.logout');

    Route::prefix('comments')->name('comments.')->group(function () {
        Route::get('', [CommentController::class, 'index'])->name('lista');
        Route::post('', [CommentController::class, 'store'])->name('criar');
        Route::get('/{id}', [CommentController::class, 'show'])->name('mostrar');
        Route::put('/{id}', [CommentController::class, 'update'])->name('atualizar');
        Route::delete('/{id}', [CommentController::class, 'destroy'])->name('deletar');
    });
});

Route::prefix('/usuarios')->name('usuarios.')->group(function () {
    Route::get('', [UserController::class, 'index'])->name('lista');
    Route::put('/{id}', [UserController::class, 'update'])->name('atualizar');
    Route::delete('/{id}', [UserController::class, 'destroy'])->name('deletar');
});