<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../utils/email.php';

function submitFeedback()
{
    $data = json_decode(file_get_contents('php://input'), true);

    $name = $data['name'] ?? null;
    $email = $data['email'] ?? null;
    $message = $data['message'] ?? null;

    if (!$name || !$email || !$message) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Please provide all fields']);
        return;
    }

    $db = new Database();
    $collection = $db->getCollection('feedbacks');

    $result = $collection->insertOne([
        'name' => $name,
        'email' => $email,
        'message' => $message,
        'submittedAt' => date('Y-m-d H:i:s')
    ]);

    if ($result->getInsertedCount() > 0) {
        $emailContent = "
            <h3>📩 New Feedback Received</h3>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Message:</strong></p>
            <p>{$message}</p>
        ";

        sendEmail('📩 New Feedback Received', $emailContent);

        header('Content-Type: application/json');
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => (string)$result->getInsertedId()]);
    }
    else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to save feedback']);
    }
}
?>
