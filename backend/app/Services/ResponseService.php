<?php

namespace App\Services;

class ResponseService
{
    public static function exception($context, $data = null, $exception = null)
    {
        return response()->json([
            'error' => [
                'context' => $context,
                'message' => $exception ? $exception->getMessage() : 'An error occurred',
                'data' => $data,
            ]
        ], 500); 
    }
}