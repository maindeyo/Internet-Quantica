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

    public function destroy($id) {
        // Encontrar o comentário pelo ID
        $comment = Comment::findOrFail($id);
    
        // Verificar se o id do usuário autenticado é o mesmo que o id do usuário do comentário
        if ($comment->usu_id !== auth()->id()) {
            // Se os IDs não coincidem, retorna um erro 403 (Forbidden)
            return response()->json(['error' => 'Você não tem permissão para excluir este comentário.'], 403);
        }
    
        // Excluir o comentário
        $comment->delete();
    
        // Retornar uma resposta de sucesso
        return response()->json(['message' => 'Comentário excluído com sucesso.']);
    }
    
    

}
