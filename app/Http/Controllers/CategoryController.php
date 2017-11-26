<?php

namespace App\Http\Controllers;

use App\Http\Models\Category;

class CategoryController extends Controller
{
    public function showAll()
    {
        return response()->json([
            'categories' => Category::all()
        ]);
    }
}
