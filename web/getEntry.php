<?php

session_start();

require_once 'db.php';



if (!isset($_POST['id']))

	die (json_encode (array ('message'=>'Jeg kan desverre ikke hjelp deg når du ikke vet hvilket blog innlegg du ønsker å vise')));



$sql = 'INSERT INTO log (entry_id, `when`) VALUES (?, now())';

$sth = $db->prepare ($sql);

$sth->execute (array ($_POST['id']));

$sql = 'SELECT id, users.uid, entry.title, entry.entry, entry.lat, entry.lng, 

               DATE_FORMAT(`when`, "%a %e/%c-%Y (%k:%i)") as `date`, 

							 givenname, surename 

				FROM users, entry 

				WHERE id=? AND users.uid=entry.uid';

$sth = $db->prepare ($sql);

$sth->execute (array ($_POST['id']));

if ($row = $sth->fetch()) {

	$data['lat'] = $row['lat'];

	$data['lng'] = $row['lng'];

	$data['name'] = $row['givenname'].' '.$row['surename'];

	$data['date'] = $row['date'];

	if (isset($_SESSION['user'])&&($row['uid']==$_SESSION['user']))

		$editlink = "<a class='editEntry' href='javascript:editEntry({$row['id']});'>Redigere innlegget</a>";

	else

		$editlink = '';

	$data['html'] = (isset($_POST['returnURL'])?"<a style='float:right; margin-right:10px;' href='javascript:back(\"{$_POST['returnURL']}\")'>Tilbake</a>":'').

								 "<div id='blogEntryDisplay'><div class='date'>{$row['date']}</div>".

								 "<div class='title'>{$row['title']}</div>".

								 $editlink.

								 "<div class='author'>{$data['name']}</div>".

								 "<div class='entry'>{$row['entry']}</div></div>";

	$data['uid'] = $row['uid'];

	$data['title'] = $row['title'];

	$data['ok'] = 'OK';

	echo json_encode ($data);

} else

	die (json_encode (array ('message'=>'Fant ikke noe blog innlegg med id='.$_POST['id'].'.')));

?>
