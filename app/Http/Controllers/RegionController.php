<?php

namespace App\Http\Controllers;

use App\Http\Models\Region;
use Illuminate\Http\Request;

class RegionController extends Controller
{
    /**
     * Вывести все регионы
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function showAll()
    {
        return response()->json([
            'regions' => Region::all()
        ]);
    }
}
