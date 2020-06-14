<?php

namespace App\Http\Controllers;

use App\Http\Models\Research;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendMailable;
use App\User;
use App\Http\Models\Employee;

class CronController extends Controller
{
    public function checkResearches()
    {
        $employees = Employee::all();
        $employeesLink = [];
        $researches = Research::all();

        foreach ($employees as $employee) {
            EmployeesController::checkMedicalResearch($employee, $researches);
            if (count($employee->researches_ends) || count($employee->researches_expired)) {
                if (empty($employeesLink[$employee->user_id])) {
                    $employeesLink[$employee->user_id] = [];
                }

                $data = ['url' => '/employee/'.$employee->id, 'fio' => $employee->fio];
                array_push($employeesLink[$employee->user_id], $data);
            }
        }

        if (empty($employeesLink)) {
            return;
        }

        foreach ($employeesLink as $key => $data) {
            $user = User::find($key);

            Mail::to($user->email)->send(new SendMailable($data));
        }

    }
}
