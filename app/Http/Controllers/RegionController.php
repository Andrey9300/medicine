<?php

namespace App\Http\Controllers;

use App\Http\Models\Region;
use Illuminate\Http\Request;

class RegionController extends Controller
{
    public function store()
    {
        return response()->json([
            'regions' => Region::all()
        ]);
    }
}
