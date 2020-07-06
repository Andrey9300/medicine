<?php

namespace App\Http\Controllers\Lmk;

use App\Http\Models\Lmk\Category;

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
