// Simple .env loader
if (file_exists(__DIR__ . '/.env')) {
    $lines = file(__DIR__ . '/.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        putenv(trim($name) . "=" . trim($value));
        $_ENV[trim($name)] = trim($value);
    }
}

// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Simple Router
$requestUri = $_SERVER['REQUEST_URI'];
$apiPath = str_replace('/backend/index.php', '', $requestUri); // Adjust based on deployment path
$apiPath = parse_url($apiPath, PHP_URL_PATH);

// Basic route mapping
switch ($apiPath) {
    case '/api/visit':
        require_once __DIR__ . '/controllers/VisitController.php';
        if ($_SERVER['REQUEST_METHOD'] === 'POST')
            trackVisit();
        break;

    case '/api/feedback':
        require_once __DIR__ . '/controllers/FeedbackController.php';
        if ($_SERVER['REQUEST_METHOD'] === 'POST')
            submitFeedback();
        break;

    case '/api/enquiry':
        require_once __DIR__ . '/controllers/EnquiryController.php';
        if ($_SERVER['REQUEST_METHOD'] === 'POST')
            submitEnquiry();
        break;

    case '/':
    case '':
        echo json_encode(['message' => 'PHP API is running...']);
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found', 'path' => $apiPath]);
        break;
}
?>
