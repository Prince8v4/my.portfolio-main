<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../utils/email.php';

function submitEnquiry()
{
    $data = json_decode(file_get_contents('php://input'), true);

    $name = $data['name'] ?? null;
    $email = $data['email'] ?? null;
    $projectType = $data['projectType'] ?? null;
    $budget = $data['budget'] ?? 'Not specified';
    $projectDetails = $data['projectDetails'] ?? null;

    if (!$name || !$email || !$projectType || !$projectDetails) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Please provide all required fields']);
        return;
    }

    $db = new Database();
    $collection = $db->getCollection('enquiries');

    $result = $collection->insertOne([
        'name' => $name,
        'email' => $email,
        'projectType' => $projectType,
        'budget' => $budget,
        'projectDetails' => $projectDetails,
        'submittedAt' => date('Y-m-d H:i:s')
    ]);

    if ($result->getInsertedCount() > 0) {
        $emailContent = "
            <h3>💼 New Project Enquiry</h3>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Project Type:</strong> {$projectType}</p>
            <p><strong>Budget:</strong> {$budget}</p>
            <p><strong>Details:</strong></p>
            <p>{$projectDetails}</p>
        ";

        sendEmail('💼 New Project Enquiry', $emailContent);

        header('Content-Type: application/json');
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => (string)$result->getInsertedId()]);
    }
    else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to save enquiry']);
    }
}
?>
