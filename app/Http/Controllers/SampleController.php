<?php

namespace App\Http\Controllers;

use App\Http\Models\Sample;
use Illuminate\Http\Request;

class SampleController extends Controller
{
    public function store(Request $request)
    {
        $sample = new Sample;
        $sample->name = $request->name;
        $sample->id =  $request->id;
        $sample->save();
    }

    public function show($id)
    {
        $sample = Sample::find($id);

        $this->authorize('owner', $sample);

        return response()->json([
            'sample' => $sample
        ]);
    }

    public function showAll()
    {
        $currentUser = Auth::user();

        return response()->json([
            'samples' => $currentUser->samples()->get()
        ]);
    }

    public function update(Request $request, $id)
    {
        $sample = Sample::find($id);

        $this->authorize('owner', $sample);

        $sample->name = $request->name;
        $sample->save();
    }

    public function destroy($id)
    {
        $sample = Sample::find($id);

        $this->authorize('owner', $sample);

        $sample->delete();
    }
}
