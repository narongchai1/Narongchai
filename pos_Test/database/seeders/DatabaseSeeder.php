<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Create users
        User::create([
            'username' => 'admin',
            'password' => Hash::make('password123'),
            'name' => 'System Administrator',
            'role' => 'admin'
        ]);

        User::create([
            'username' => 'seller1',
            'password' => Hash::make('password123'),
            'name' => 'John Seller',
            'role' => 'seller'
        ]);

        // Create categories
        $categories = [
            ['name' => 'เครื่องดื่ม', 'description' => 'เครื่องดื่มต่างๆ'],
            ['name' => 'ขนมขบเคี้ยว', 'description' => 'ขนมขบเคี้ยว'],
            ['name' => 'นมและผลิตภัณฑ์', 'description' => 'นมและผลิตภัณฑ์จากนม'],
            ['name' => 'ของใช้ประจำวัน', 'description' => 'ของใช้ในชีวิตประจำวัน']
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }

        // Create products
        $products = [
            [
                'barcode' => '10000',
                'name' => 'น้ำส้ม',
                'cost_price' => 25,
                'selling_price' => 30,
                'stock_quantity' => 200,
                'unit' => 'ขวด',
                'expiry_date' => '2026-01-01',
                'min_stock_level' => 20
            ],
            [
                'barcode' => '10001',
                'name' => 'ขนมขาโก๋',
                'cost_price' => 30,
                'selling_price' => 40,
                'stock_quantity' => 100,
                'unit' => 'กระปุก',
                'expiry_date' => '2026-12-30',
                'min_stock_level' => 15
            ],
            [
                'barcode' => '10002',
                'name' => 'เค้กส้ม',
                'cost_price' => 55,
                'selling_price' => 60,
                'stock_quantity' => 50,
                'unit' => 'ชิ้น',
                'expiry_date' => '2026-11-30',
                'min_stock_level' => 10
            ]
        ];

        foreach ($products as $product) {
            Product::create($product);
        }

        $this->command->info('Database seeded successfully!');
        $this->command->info('Admin user: admin / password123');
        $this->command->info('Seller user: seller1 / password123');
    }
}