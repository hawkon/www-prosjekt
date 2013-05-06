<?php
require_once 'db.php';
$sql = 'INSERT INTO `openpub`.`users`(uid, givenname, surename, pwd) VALUES (?, ?, ?, ?)';
$sth = $db->prepare ($sql);
$res = $sth->execute (array ($_POST['uname'], $_POST['givenname'], $_POST['surename'], md5($_POST['pwd'])));
if ($res==1)
	echo json_encode (array ('ok'=>'OK'));
else
	echo json_encode (array ('message'=>'Brukernavnet finnes allerede i databasen.'));
?>
