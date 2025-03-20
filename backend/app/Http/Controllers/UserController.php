<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar que o nome e e-mail foram enviados
        $request->validate([
            'nome' => 'required|string|max:255', // Validação para o nome
            'email' => 'required|email|unique:users,email', // Validação para o email (único)
        ]);

        // Verificar se o e-mail já está cadastrado
        $emailExistente = User::where('email', $request->email)->first();

        if ($emailExistente) {
            return response()->json(['error' => 'Este e-mail já está cadastrado.'], 400); // Retorna erro se o email já existir
        }

        // Se o e-mail não existir, cria o novo usuário
        $usuario = User::create([
            'name' => $request->nome,  // 'nome' sendo o campo para o nome do usuário
            'email' => $request->email, // 'email' sendo o campo para o email do usuário
        ]);

        // Retorna uma resposta de sucesso
        return response()->json(['message' => 'Cadastro realizado com sucesso!', 'usuario' => $usuario], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(User $user) 
    { 
        return $user; 
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) 
    {
        // Validação dos dados recebidos
        $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $id,
        ]);

        // Buscar o usuário pelo ID
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'Usuário não encontrado'], 404);
        }

        // Atualizar os dados do usuário
        $user->update([
            'name' => $request->input('nome'),
            'email' => $request->input('email'),
        ]);

        return response()->json(['message' => 'Usuário atualizado com sucesso', 'user' => $user], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function delete(User $user) 
    { 
        try {
            $user->delete();
            return response()->json(['message' => 'Usuário excluído com sucesso!'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao excluir o usuário.'], 500);
        } 
    }
}
