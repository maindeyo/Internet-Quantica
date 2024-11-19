<?php

use App\Http\Controllers\UserController;
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
Route::prefix('/usuarios')->name('usuarios.')->group(function () {
    Route::get('', [UserController::class, 'index'])->name('lista'); // Listar todos os usuários
    Route::get('/{id}', [UserController::class, 'show'])->name('perfil'); // Obter um usuário específico
    Route::put('/{id}', [UserController::class, 'update'])->name('atualizar'); // Atualizar um usuário
    Route::delete('/{id}', [UserController::class, 'destroy'])->name('deletar'); // Deletar um usuário
});

// Rota para login de usuário
Route::post('/login', [UserController::class, 'login'])->name('login');

