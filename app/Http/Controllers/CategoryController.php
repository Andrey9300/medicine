<?php

namespace App\Http\Controllers;

use App\Http\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function store()
    {
        return response()->json([
            'categories' => Category::all()
        ]);
    }
}
