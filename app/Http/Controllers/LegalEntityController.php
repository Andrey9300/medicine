<?php

namespace App\Http\Controllers;

use App\Http\Models\LegalEntity;
use App\Http\Requests\StoreLegalEntity;
use App\Http\Requests\UpdateLegalEntity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LegalEntityController extends Controller
{
    /**
     * Создать юридическое лицо
     *
     * @param  \Illuminate\Http\Request $request
     * @return void
     */
    public function store(StoreLegalEntity $request)
    {
        $user = Auth::user();
        $legal_entity = new LegalEntity;
        $legal_entity->name = $request->name;
        $legal_entity->address = $request->address;
        $legal_entity->phone = $request->phone;
        $legal_entity->inn = $request->inn;
        $legal_entity->user_id = $user->id;
        $legal_entity->save();
    }

    /**
     * Вывести юридическое лицо
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function showAll()
    {
        $user = Auth::user();

        return response()->json([
            'legal_entities' => $user->legal_entities
        ]);
    }

    /**
     * Показать юридическое лицо
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $legal_entity = LegalEntity::find($id);
        $this->authorize('isAdminAndOwner', $legal_entity);

        return response()->json([
            'legal_entity' => $legal_entity
        ]);
    }

    /**
     * Обновить юридическое лицо
     *
     * @param int $id
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    public function update(UpdateLegalEntity $request, $id)
    {
        $legal_entity_new = $request->all();
        $legal_entity = LegalEntity::find($id);
        $legal_entity->name = $legal_entity_new['name'];
        $legal_entity->address = $legal_entity_new['address'];
        $legal_entity->phone = $legal_entity_new['phone'];
        $legal_entity->inn = $legal_entity_new['inn'];
        $legal_entity->save();
    }

    /**
     * Удалить юридическое лицо
     *
     * @param int $id
     * @return void
     */
    public function destroy($id)
    {
        $legal_entity = LegalEntity::find($id);
        $this->authorize('isAdminAndOwner', $legal_entity);
        $legal_entity->destroy($id);
    }
}
