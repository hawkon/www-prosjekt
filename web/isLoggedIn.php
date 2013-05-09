<?php
header ('Content-type: application/json'); 
session_start();
require_once 'db.php';
$sql = 'SELECT * FROM users WHERE uid=?';
$sth = $db->prepare ($sql);
$sth->execute (array ($_SESSION['user']));
if ($row=$sth->fetch()) {
  echo json_encode (array ('login'=>'OK'));
} else {
  echo json_encode (array ('logon'=>'NOPE'));
}
?> 
