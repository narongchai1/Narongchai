<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
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
        $request->validate([
            'username' => 'required|string|unique:users',
            'password' => 'required|string|min:6',
            'name' => 'required|string',
            'role' => 'required|in:admin,seller'
        ]);

        $user = User::create([
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'name' => $request->name,
            'role' => $request->role
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 201);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'username' => 'required|string|unique:users,username,' . $user->id,
            'name' => 'required|string',
            'role' => 'required|in:admin,seller',
            'is_active' => 'boolean'
        ]);

        $user->update($request->only(['username', 'name', 'role', 'is_active']));

        if ($request->has('password') && $request->password) {
            $user->update(['password' => Hash::make($request->password)]);
        }

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully'
        ]);
    }
}