<?
  $recepient = "eyalivne@gmail.com, micha@targetcall.co.il,shiran@targetcall.co.il";
//  $recepient = "amitashdot@gmail.com";
$text_1 = trim($_POST["firstName"]);
$text_2 = trim($_POST["phone_1"]);
$text_3 = trim($_POST["input_10"]);
$keyword = trim($_POST["keyword1"]);
$dynamic3 = trim($_POST["dynamic_3"]);

$message = " \n מברוק! קיבלתם ליד חדש\n\n<br>
שם: $text_1 \n  </br>
טלפון: $text_2\n /<br>
ספק נוכחי : $text_3\n </br>
מילת חיפוש : $dynamic3\n<br>
בהצלחה!
";
$pagetitle = "ליד חדש - partnertv-sales.co.il";
$headers = "Content-Type: text/html; charset=UTF-8";
$from = "newlead@partner-tv.co";

header("Location: https://partnertv-sales.co.il/thankyoupage/");
// mail($recepient, $pagetitle, $message, $headers,$from);
$mymessage = quoted_printable_encode($message);

function mail_utf8($to, $subject = '(No subject)', $message = '', $from ='') { 
  $headers = "MIME-Version: 1.0\r\n";
  $headers .= "Content-type: text/html; charset=UTF-8\r\n";
  $headers .= "Content-Transfer-Encoding: quoted-printable\r\n";
  $headers .= "From: $from\r\n";
  mail($to, $subject, $message, $headers, $from);  
}
mail_utf8 ($recepient, $pagetitle, $mymessage , $from);
?>
