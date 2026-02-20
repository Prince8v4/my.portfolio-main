<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

function sendEmail($subject, $htmlContent) {
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = $_ENV['EMAIL_USER'] ?? getenv('EMAIL_USER');
        $mail->Password   = $_ENV['EMAIL_PASS'] ?? getenv('EMAIL_PASS');
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom($mail->Username, 'Portfolio Backend');
        $receiver = $_ENV['EMAIL_RECEIVER'] ?? getenv('EMAIL_RECEIVER') ?? $mail->Username;
        $mail->addAddress($receiver);

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $htmlContent;

        $mail->send();
        error_log("Email sent successfully");
        return true;
    } catch (Exception $e) {
        error_log("Email could not be sent. Mailer Error: {$mail->ErrorInfo}");
        return false;
    }
}
?>
