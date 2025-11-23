<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\SaleController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // User management
    Route::apiResource('users', UserController::class);

    // Product management
    Route::apiResource('products', ProductController::class);
    Route::get('/products/search/{query}', [ProductController::class, 'search']);
    Route::get('/products/low-stock', [ProductController::class, 'lowStock']);
    Route::get('/products/near-expiry', [ProductController::class, 'nearExpiry']);

    // Sales
    Route::apiResource('sales', SaleController::class);
    Route::get('/sales/daily-report', [SaleController::class, 'dailyReport']);
    Route::get('/sales/summary', [SaleController::class, 'salesSummary']);
});