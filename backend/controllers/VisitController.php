<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../utils/email.php';

function trackVisit()
{
    $data = json_decode(file_get_contents('php://input'), true);

    $ipAddress = $data['ipAddress'] ?? $_SERVER['REMOTE_ADDR'];
    $userAgent = $data['userAgent'] ?? $_SERVER['HTTP_USER_AGENT'];
    $referrer = $data['referrer'] ?? 'Direct';
    $visitTime = date('Y-m-d H:i:s');

    $db = new Database();
    $collection = $db->getCollection('visits');

    $result = $collection->insertOne([
        'ipAddress' => $ipAddress,
        'userAgent' => $userAgent,
        'referrer' => $referrer,
        'visitTime' => $visitTime
    ]);

    if ($result->getInsertedCount() > 0) {
        $emailContent = "
            <h3>🚀 New Portfolio Visitor</h3>
            <p><strong>Time:</strong> {$visitTime}</p>
            <p><strong>IP Address:</strong> {$ipAddress}</p>
            <p><strong>User Agent:</strong> {$userAgent}</p>
            <p><strong>Referrer:</strong> {$referrer}</p>
        ";

        sendEmail('🚀 New Portfolio Visitor', $emailContent);

        header('Content-Type: application/json');
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => (string)$result->getInsertedId()]);
    }
    else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to record visit']);
    }
}
?>
