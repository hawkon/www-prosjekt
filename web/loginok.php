<?php
session_start();
require_once 'db.php';
$sql = 'SELECT * FROM users WHERE uid=?';
$sth = $db->prepare ($sql);
$sth->execute (array ($_SESSION['user']));
if ($row=$sth->fetch()) {?>
<b>Velkommen<br/>
<img src="userImage.php">
	<?php echo $row['givenname']; ?> <?php echo $row['surename']; ?></b><br>
	<a href="javascript:changeUserDetailsDialog()">Endre brukerdata</a><br/>
	<input type="button" value="Logg ut" onclick="javascript:logOut();"/>
	<?php
} else {
	echo "Du er jo ikke logget inn!?!?!";
}
?>

