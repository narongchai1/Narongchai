<?php

namespace App\Http\Controllers\Api;

use App\Models\Sale;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class SaleController extends Controller
{
    public function index(Request $request)
    {
        $query = Sale::with(['user', 'items.product']);
        
        if ($request->has('date')) {
            $query->whereDate('sale_date', $request->date);
        }
        
        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('sale_date', [$request->start_date, $request->end_date]);
        }

        $sales = $query->orderBy('created_at', 'desc')->get();

        return response()->json($sales);
    }

    public function store(Request $request)
    {
        $request->validate([
            'sale_date' => 'required|date',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1'
        ]);

        return DB::transaction(function () use ($request) {
            $sale = Sale::create([
                'sale_date' => $request->sale_date,
                'total_amount' => 0,
                'user_id' => $request->user()->id,
                'notes' => $request->notes
            ]);

            $totalAmount = 0;

            foreach ($request->items as $item) {
                $product = Product::find($item['product_id']);
                
                if ($product->stock_quantity < $item['quantity']) {
                    throw new \Exception("Insufficient stock for product: {$product->name}");
                }

                $itemTotal = $product->selling_price * $item['quantity'];
                $totalAmount += $itemTotal;

                $sale->items()->create([
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->selling_price,
                    'total_price' => $itemTotal
                ]);

                // Update product stock
                $product->decrement('stock_quantity', $item['quantity']);
            }

            $sale->update(['total_amount' => $totalAmount]);

            return response()->json([
                'message' => 'Sale completed successfully',
                'sale' => $sale->load('items.product')
            ], 201);
        });
    }

    public function show(Sale $sale)
    {
        return response()->json($sale->load(['user', 'items.product']));
    }

    public function dailyReport(Request $request)
    {
        $date = $request->get('date', now()->toDateString());
        
        $sales = Sale::with(['items.product'])
            ->whereDate('sale_date', $date)
            ->get();

        $totalSales = $sales->sum('total_amount');
        $totalItems = $sales->sum(function ($sale) {
            return $sale->items->sum('quantity');
        });

        return response()->json([
            'date' => $date,
            'total_sales' => $totalSales,
            'total_items' => $totalItems,
            'sales' => $sales
        ]);
    }

    public function salesSummary(Request $request)
    {
        $startDate = $request->get('start_date', now()->subDays(7)->toDateString());
        $endDate = $request->get('end_date', now()->toDateString());

        $summary = Sale::whereBetween('sale_date', [$startDate, $endDate])
            ->selectRaw('
                COUNT(*) as total_transactions,
                SUM(total_amount) as total_revenue,
                AVG(total_amount) as average_sale,
                MIN(total_amount) as min_sale,
                MAX(total_amount) as max_sale
            ')
            ->first();

        $dailySales = Sale::whereBetween('sale_date', [$startDate, $endDate])
            ->selectRaw('sale_date, SUM(total_amount) as daily_total')
            ->groupBy('sale_date')
            ->orderBy('sale_date')
            ->get();

        return response()->json([
            'period' => [
                'start_date' => $startDate,
                'end_date' => $endDate
            ],
            'summary' => $summary,
            'daily_sales' => $dailySales
        ]);
    }
}