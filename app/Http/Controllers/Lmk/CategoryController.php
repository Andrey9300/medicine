<?php

namespace App\Http\Controllers\Lmk;

use App\Http\Models\Lmk\Category;

class CategoryController extends Controller
{
    public function showAll()
    {
        return response()->json([
            'categories' => Category::all()
        ]);
    }
}
