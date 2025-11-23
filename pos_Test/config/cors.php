<?php

return [

    'paths' => ['*'], // เปลี่ยนเป็น * เพื่อให้ทุก path ผ่าน CORS

    'allowed_methods' => ['*'],

    'allowed_origins' => ['*'], // เปลี่ยนเป็น * สำหรับ development

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false, // เปลี่ยนเป็น false สำหรับ mock data

];