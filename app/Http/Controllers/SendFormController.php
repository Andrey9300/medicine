<?php

namespace App\Http\Controllers;

use App\Mail\SendFormMailable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SendFormController extends Controller
{
    public function sendForm(Request $request)
    {
        Mail::to($request->email)->send(new SendFormMailable(['textForm' => $request->textForm]));
    }
}
