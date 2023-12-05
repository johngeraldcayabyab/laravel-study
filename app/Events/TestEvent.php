<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Redis;

class TestEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private int $test;

    public function __construct($test = 12)
    {
        $this->test = $test;
        Redis::publish('sms-deposit-channel', 'bitch');
    }

    public function broadcastOn()
    {
        return new Channel('sms-deposit-channel');
    }
}
