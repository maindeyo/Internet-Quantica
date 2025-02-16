<?php 

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Services\ResponseService;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    
    }

    public function id() {
        $usuarios = User::find(auth()->id());
        return $usuarios->id;
    }

    public function store(Request $request) {
        $validatedData = $request->validate([
            'nome' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                'regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
                'unique:users,email',
            ],
            'senha' => 'required|string|min:6'
        ], [
            'nome.required' => 'É necessário informar um nome',
            'email.regex' => 'O campo email deve ter um formato válido, incluindo um domínio com TLD (exemplo: .com, .org).',
            'email.required' => 'É necessário informar um email.',
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
        $token = JWTAuth::getToken();
        if (!$token) {
            throw new \Exception('Token não encontrado.', 400);
        }
        JWTAuth::invalidate($token);

        return response(['status' => true, 'msg' => 'Deslogado com sucesso'], 200);
    } catch (\Throwable|\Exception $e) {
        return response()->json(['status' => false, 'msg' => $e->getMessage()], 400);
    }
}

    
}