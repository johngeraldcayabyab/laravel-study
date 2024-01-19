<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TestEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private int $id;

    public function __construct($id = 12)
    {
        $this->id = $id;
    }

    public function broadcastWith(): array
    {
        return ['id' => $this->id];
    }

    public function broadcastOn()
    {
        return new Channel('sms-deposit-channel');
    }
}
