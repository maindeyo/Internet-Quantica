<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\User; 

class CommentController extends Controller
{
    public function index() {
        $comments = Comment::all(['content', 'usu_nome', 'created_at', 'id', 'usu_id']);
        return response()->json($comments);
    }

    public function store(Request $request) {
        $dados = $request->validate([
            'content' => 'required|string|max:255',
            'usu_id' => 'required|integer|exists:users,id',
        ]);
    
        $user = User::findOrFail($dados['usu_id']); 
    
        $comment = Comment::create([
            'content' => $dados['content'],
            'usu_id' => $user->id,
            'usu_nome' => $user->nome, 
        ]);
    
        return response()->json([
            'message' => 'Comentário criado com sucesso!',
            'comment' => $comment,
        ]);
    }
    
    public function destroy($id) {
        $comment = Comment::findOrFail($id);

        if ($comment->usu_id !== auth()->id()) {
            return response()->json(['error' => 'Você não tem permissão para excluir este comentário.'], 403);
        }
    
        $comment->delete();

        return response()->json(['message' => 'Comentário excluído com sucesso.']);
    }
    
    

}
