<?php

use App\Http\Controllers\OptionController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    \App\Jobs\TestJob::dispatch();
    \App\Events\TestEvent::dispatch();
    return view('welcome');
});

Route::get('/option', [OptionController::class, 'show'])->name('profile.show');
