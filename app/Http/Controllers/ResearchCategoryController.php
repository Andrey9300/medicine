<?php

namespace App\Http\Controllers;

use App\Http\Models\ResearchCategory;
use Illuminate\Http\Request;

class ResearchCategoryController extends Controller
{
    /**
     * Создать исследование
     *
     * @param  \Illuminate\Http\Request $request
     * @return void
     */
    public function store(Request $request)
    {

    }

    /**
     * Вывести исследования
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function showAll()
    {
        $researchCategory = ResearchCategory::all();
        $researchCategory->category;
        $researchCategory->research;
    }

    /**
     * Показать данные исследования
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {

    }

    /**
     * Обновить исследование
     *
     * @param int $id
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    public function update(Request $request, $id)
    {

    }

    /**
     * Удалить исследование
     *
     * @param int $id
     * @return void
     */
    public function destroy($id)
    {

    }
}
