<?php
/**
 * MCP Server Implementation in PHP
 * This handles JSON-RPC 2.0 messages over stdio
 */

// Set error reporting to stderr so it doesn't corrupt stdout
ini_set('display_errors', '0');
error_reporting(E_ALL);

set_error_handler(function ($errno, $errstr, $errfile, $errline) {
    fwrite(STDERR, "PHP Error [$errno]: $errstr in $errfile on line $errline\n");
});

function logMessage($msg)
{
    fwrite(STDERR, "[LOG] $msg\n");
}

function sendResponse($id, $result = null, $error = null)
{
    $response = ['jsonrpc' => '2.0'];
    if ($id !== null) {
        $response['id'] = $id;
    }

    if ($error) {
        $response['error'] = $error;
    }
    else {
        $response['result'] = $result;
    }

    echo json_encode($response) . "\n";
}

logMessage("PHP MCP Server starting...");

while ($line = fgets(STDIN)) {
    $request = json_decode($line, true);
    if (!$request) {
        continue;
    }

    $method = $request['method'] ?? null;
    $id = $request['id'] ?? null;
    $params = $request['params'] ?? [];

    logMessage("Received method: $method");

    switch ($method) {
        case 'initialize':
            sendResponse($id, [
                'protocolVersion' => '2024-11-05',
                'capabilities' => [
                    'tools' => (object)[]
                ],
                'serverInfo' => [
                    'name' => 'my-mcp-server-php',
                    'version' => '1.0.0'
                ]
            ]);
            break;

        case 'notifications/initialized':
            // Client acknowledgment
            logMessage("Client initialized");
            break;

        case 'tools/list':
            sendResponse($id, [
                'tools' => [
                    [
                        'name' => 'get_server_time',
                        'description' => 'Returns the current server time',
                        'inputSchema' => [
                            'type' => 'object',
                            'properties' => (object)[]
                        ]
                    ]
                ]
            ]);
            break;

        case 'tools/call':
            $toolName = $params['name'] ?? '';
            if ($toolName === 'get_server_time') {
                sendResponse($id, [
                    'content' => [
                        [
                            'type' => 'text',
                            'text' => 'Current server time: ' . date('c')
                        ]
                    ]
                ]);
            }
            else {
                sendResponse($id, null, [
                    'code' => -32601,
                    'message' => "Tool not found: $toolName"
                ]);
            }
            break;

        case 'ping':
            sendResponse($id, (object)[]);
            break;

        default:
            if ($id !== null) {
                sendResponse($id, null, [
                    'code' => -32601,
                    'message' => "Method not found: $method"
                ]);
            }
            break;
    }
}
?>
