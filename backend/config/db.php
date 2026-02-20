<?php
require 'vendor/autoload.php'; // Assuming composer is used

class Database {
    private $uri;
    private $client;
    private $db;

    public function __construct() {
        $this->uri = $_ENV['MONGO_URI'] ?? getenv('MONGO_URI');
        if (!$this->uri) {
            // Fallback for local testing or if .env isn't loaded yet
            $this->uri = "mongodb+srv://kumarguptarohit6328_db_user:portfolio123@cluster0.ziseyxv.mongodb.net/?appName=Cluster0";
        }
        
        try {
            $this->client = new MongoDB\Client($this->uri);
            $this->db = $this->client->selectDatabase('portfolio'); // You might need to change the DB name
        } catch (Exception $e) {
            error_log("Connection failed: " . $e->getMessage());
            die("Database connection failed.");
        }
    }

    public function getCollection($name) {
        return $this->db->selectCollection($name);
    }
}
?>
