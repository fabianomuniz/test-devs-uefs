<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Tag::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) 
    { 

        dd($request);
        $request->validate([
        'name' => 'required|string|max:255',
        
        ]);

       
        $tag = Tag::create([
            'name' => $request->name,  
            
        ]);

        
        return response()->json($tag, 201); 
    }

    /**
     * Display the specified resource.
     */
    public function show(Tag $tag) 
    { 
        return $tag; 
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tag $tag) 
    { 
        $tag->update($request->all()); 
        return $tag; 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete($id) 
    { 
        $tag = Tag::find($id);

        try {
            $tag->delete();
            return response()->json(['message' => 'Tag excluída com sucesso!'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao excluir a Tag.'], 500);
        }
         
    }
}
