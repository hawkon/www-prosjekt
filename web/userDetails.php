﻿<?php

session_start();

require_once 'db.php';

$sql = 'SELECT * FROM users WHERE uid=?';
$sth = $db->prepare ($sql);
$sth->execute (array ($_SESSION['user']));
if ($row=$sth->fetch())
	echo json_encode ($row);
else
	echo json_encode (array ('error'=>'Ikke logget på'));
?>

	
