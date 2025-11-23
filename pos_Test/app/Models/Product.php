<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'barcode',
        'name',
        'cost_price',
        'selling_price',
        'stock_quantity',
        'unit',
        'expiry_date',
        'min_stock_level',
        'description',
        'is_active'
    ];

    protected $casts = [
        'cost_price' => 'decimal:2',
        'selling_price' => 'decimal:2',
        'expiry_date' => 'date',
        'is_active' => 'boolean'
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'product_category');
    }

    public function saleItems()
    {
        return $this->hasMany(SaleItem::class);
    }

    public function getStockStatusAttribute()
    {
        if ($this->stock_quantity == 0) {
            return 'out_of_stock';
        } elseif ($this->stock_quantity <= $this->min_stock_level) {
            return 'low_stock';
        } else {
            return 'in_stock';
        }
    }

    public function getIsExpiredAttribute()
    {
        return $this->expiry_date && $this->expiry_date < now();
    }

    public function getIsNearExpiryAttribute()
    {
        return $this->expiry_date && $this->expiry_date->diffInDays(now()) <= 30;
    }
}