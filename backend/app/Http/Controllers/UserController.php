<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Services\ResponseService;
use Tymon\JWTAuth\Facades\JWTAuth;

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
            'email' => [
                'required',
                'email',
                'regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
                'unique:users,email',
            ],
            'senha' => 'required|string|min:6',
        ], [
            'nome.required' => 'É necessário informar um nome',
            'email.regex' => 'O campo email deve ter um formato válido, incluindo um domínio com TLD (exemplo: .com, .org).',
            'email.unique' => 'Este email já está em uso.',
            'senha.min' => 'Sua senha é muito curto, ela deve conter no mínimo 6 caracteres.',
            'senha.required' => 'O campo senha é obrigatório.', 
        ]);
        

        $validatedData['senha'] = Hash::make($validatedData['senha']);

        $user = User::create($validatedData);

        $token = JWTAuth::fromUser($user);

        return response()->json(
            ['location' => route('usuarios.perfil', ['id' => $user->id]), 'token' => $token], 201
        );
    }

    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuário não encontrado'], 404);
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
        
        $comments = Comment::where('usu_id', $id)->get();
        foreach ($comments as $comment) {
            $comment->delete();
        }

        $user->delete();

        return response()->json(['message' => 'Usuário deletado com sucesso']);
    }
        public function login(Request $request) {
            $credentials = $request->only('email', 'senha');

            try {
                $user = User::where('email', $credentials['email'])->first();
                if (!$user) {
                    return response()->json(['message' => 'O email fornecido não foi encontrado.'], 401);
                }
                if (!Hash::check($credentials['senha'], $user->senha)) {
                    return response()->json(['message' => 'A senha fornecida está incorreta.'], 401);
                }
                $token = JWTAuth::fromUser($user);
            } catch (\Throwable|\Exception $e) {
                return ResponseService::exception('users.login', null, $e);
            }
            
            return response()->json(compact('token'));
    }
    

    public function logout(Request $request) {
        try {
            JWTAuth::getToken(); 
            if (!JWTAuth::invalidate())  
                throw new \Exception('Erro. Tente novamente.', -404);
            return response(['status' => true, 'msg' => 'Deslogado com sucesso'], 200);
        } catch (\Throwable|\Exception $e) {
            return ResponseService::exception('users.logout', null, $e); 
        }
    }
}