<?php

namespace App\Http\Controllers;

use App\Http\Models\Category;

class CategoryController extends Controller
{
    /**
     * Вывести все категории
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function showAll()
    {
        return response()->json([
            'categories' => Category::all()
        ]);
    }
}
