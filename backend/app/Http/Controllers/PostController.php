<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Post::select('posts.title', 'posts.created_at', 'users.name')
        ->join('users', 'users.id', '=', 'posts.user_id')
        ->orderBy('posts.created_at', 'desc') 
        ->get();
    }

    public function store(Request $request)
    {
        // Certifique-se de que o campo tags seja um array, caso contrário, defina como array vazio
        $tags = $request->has('tags') ? $request->tags : [];

        // dd($tags);
    
        $post = Post::create([
            'user_id' => $request->user_id,
            'title' => $request->titulo,
            'content' => $request->conteudo,
            'tags' => json_encode($tags), // Salva tags como JSON
        ]);
    
        return response()->json(['message' => 'Post criado com sucesso!', 'post' => $post], 201);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Post $post) 
    { 
        return $post; 
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post) 
    { 
        $post->update($request->all()); 
        return $post; 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post) 
    { 
        try {
            $post->delete();
            return response()->json(['message' => 'Post excluída com sucesso!'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao excluir o Post.'], 500);
        }
    }
}
