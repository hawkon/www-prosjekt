<?php

	session_start();

	require_once 'db.php';

	

	if (!isset($_SESSION['user']))

		die (json_encode (array ('message'=>'Du kan ikke lagre blog innlegg når du ikke er logget på')));

	$sql = 'INSERT INTO entry (uid, title, entry, lat, lng, `when`) VALUES (?, ?, ?, ?, ?, now())';

	if (isset($_POST['latitude']))

		$lat = $_POST['latitude'];

	else

		$lat = null;

	if (isset($_POST['longitude']))

		$lng = $_POST['longitude'];

	else

		$lng = null;

	$sth = $db->prepare ($sql);

//	print_r ($db->errorInfo());

	$sth->execute (array ($_SESSION['user'], $_POST['title'], $_POST['content'], $lat, $lng));

//	print_r ($db->errorInfo());

	if ($sth->rowCount()==1)

		die (json_encode (array('ok'=>'OK', 'message'=>'Nytt blogg innlegg lagret i databasen')));

	else

		die (json_encode (array('message'=>'Problemer oppsto ved lagring av innlegget i databasen')));

?>
