<?php
session_start();
require_once 'db.php';

$sql = 'SELECT * FROM users WHERE uid=? AND pwd=?';
$sth = $db->prepare ($sql);
$sth->execute (array ($_POST['uname'], md5($_POST['pwd'])));
if ($row = $sth->fetch()) {
	$_SESSION['user'] = $_POST['uname'];
	echo json_encode (array ('ok'=>'OK'));
} else
	echo json_encode (array ('bad_username'=>'No match for username/password'));
?>
	
