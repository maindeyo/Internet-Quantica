<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment; // Certifique-se de ter o modelo Comment configurado

class CommentController extends Controller
{
    public function index()
    {
        $comments = Comment::all(); 
        return response()->json($comments); 
    }


    public function store(Request $request) {
        $request->validate([
            'content' => 'required|string|max:255',
            'usu_id' => 'required|integer|exists:users,id',
        ]);
    
        $comment = new Comment();
        $comment->content = $request->input('content');
        $comment->usu_id = $request->input('usu_id'); 
        $comment->save();
    
        return response()->json(['message' => 'Comentário criado com sucesso!', 'comment' => $comment]);
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
