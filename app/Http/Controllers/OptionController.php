<?php

namespace App\Http\Controllers;

use App\Models\Option;

class OptionController
{
    public function show()
    {
        $options = Option::all();
        return view('option', ['options' => $options]);
    }
}
