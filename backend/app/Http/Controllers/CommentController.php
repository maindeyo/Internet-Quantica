<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\User; 

class CommentController extends Controller
{
    public function index() {
        $comments = Comment::all(['content', 'usu_nome', 'created_at']);
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
    


    public function update(Request $request, $id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json(['message' => 'Comentário não encontrado!'], 404);
        }

        $request->validate([
            'content' => 'required|string|max:255',
        ]);

        $comment->content = $request->input('content');
        $comment->save();

        return response()->json(['message' => 'Comentário atualizado com sucesso!', 'comment' => $comment]);
    }

    public function destroy($id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json(['message' => 'Comentário não encontrado!'], 404);
        }

        $comment->delete();

        return response()->json(['message' => 'Comentário excluído com sucesso!']);
    }
}
