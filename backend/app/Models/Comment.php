<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'content',
        'usu_id',
        'usu_nome',
    ];

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(User::class, 'usu_id');
    }
}
