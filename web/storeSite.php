<?php

	session_start();

	require_once 'db.php';

	

	if (!isset($_SESSION['user']))

		die (json_encode (array ('message'=>'Du kan ikke lagre side når du ikke er logget på')));

	$sql = 'INSERT INTO entry (uid, title, entry, `when`) VALUES (?, ?, ?, now())';

	$sth = $db->prepare ($sql);

//	print_r ($db->errorInfo());

	$sth->execute (array ($_SESSION['user'], $_POST['title'], $_POST['content']));

//	print_r ($db->errorInfo());

	if ($sth->rowCount()==1)

		die (json_encode (array('ok'=>'OK', 'message'=>'Ny side lagret i databasen')));

	else

		die (json_encode (array('message'=>'Problemer oppsto ved lagring av side i databasen')));

?>
