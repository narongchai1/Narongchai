<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('categories')->get();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $request->validate([
            'barcode' => 'required|string|unique:products',
            'name' => 'required|string',
            'cost_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'unit' => 'required|string',
            'expiry_date' => 'nullable|date',
            'min_stock_level' => 'required|integer|min:0'
        ]);

        $product = Product::create($request->all());

        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product
        ], 201);
    }

    public function show(Product $product)
    {
        return response()->json($product->load('categories'));
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'barcode' => 'required|string|unique:products,barcode,' . $product->id,
            'name' => 'required|string',
            'cost_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'unit' => 'required|string',
            'expiry_date' => 'nullable|date',
            'min_stock_level' => 'required|integer|min:0'
        ]);

        $product->update($request->all());

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product
        ]);
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->get('query');
        
        $products = Product::where('barcode', $query)
            ->orWhere('name', 'LIKE', "%{$query}%")
            ->where('is_active', true)
            ->get();

        return response()->json($products);
    }

    public function lowStock()
    {
        $products = Product::where('stock_quantity', '<=', DB::raw('min_stock_level'))
            ->where('is_active', true)
            ->get();

        return response()->json($products);
    }

    public function nearExpiry()
    {
        $products = Product::where('expiry_date', '<=', now()->addDays(30))
            ->where('expiry_date', '>=', now())
            ->where('is_active', true)
            ->get();

        return response()->json($products);
    }
}