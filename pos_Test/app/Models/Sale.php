<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = [
        'sale_date',
        'total_amount',
        'user_id',
        'notes'
    ];

    protected $casts = [
        'sale_date' => 'date',
        'total_amount' => 'decimal:2'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(SaleItem::class);
    }

    public function addItem(Product $product, $quantity)
    {
        $totalPrice = $product->selling_price * $quantity;

        return $this->items()->create([
            'product_id' => $product->id,
            'quantity' => $quantity,
            'unit_price' => $product->selling_price,
            'total_price' => $totalPrice
        ]);
    }

    public function updateTotalAmount()
    {
        $this->total_amount = $this->items->sum('total_price');
        $this->save();
    }
}