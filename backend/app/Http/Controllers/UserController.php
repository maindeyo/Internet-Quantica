<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }


    public function store(Request $request) 
    {
        $validatedData = $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'senha' => 'required|string|min:8',
        ]);

        $validatedData['senha'] = Hash::make($validatedData['senha']);

        $user = User::create($validatedData);

        return response()->json(['location' => route('usuarios.perfil', ['id' => $user->id])], 201);
    }


    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuário não encontrad'], 404);
        }

        return response()->json($user);
    }

 
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuário não encontrado'], 404);
        }

        $validatedData = $request->validate([
            'nome' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'senha' => 'sometimes|string|min:8',
        ]);

        if (isset($validatedData['senha'])) {
            $validatedData['senha'] = Hash::make($validatedData['password']);
        }

        $user->update($validatedData);

        return response()->json(['user' => $user]);
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuário não encontrado'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'Usuário deletado com sucesso']);
    }

    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'senha' => 'required'
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if ($user && Hash::check($credentials['senha'], $user->senha)) {
    
            return response()->json(['message' => 'Login realizado com sucesso'], 200);
        } else {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }
    }

    // public function login(Request $request) {
    //     $credentials = $request->only('email', 'senha');
    //     try {
    //         $user = User::where('email', $credentials['email'])->first();
    //         if (!$user || !Hash::check($credentials['senha'], $user->senha)) 
    //             return response()->json(['message' => 'Credenciais incorretas, verifique-as e tente novamente.'], 401);
                
    //         $token = JWTAuth::fromUser($user);
    //     } catch (\Throwable|\Exception $e) {
    //         return ResponseService::exception('users.login', null, $e);
    //     }
        
    //     return response()->json(compact('token'));
    // }



    
}
