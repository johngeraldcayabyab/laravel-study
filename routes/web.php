<?php

use App\Http\Controllers\OptionController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/option', [OptionController::class, 'show'])->name('profile.show');
