<?php

session_start();



if (!isset($_SESSION['user']))

	die ('Du er jo ikke logget på!!!!');

?>

<a style="float: right" href="javascript:newBlogEntry();">Nytt blog innlegg</a>

<ul class="myBlogEntries">

<?php

require_once 'db.php';

$sql = 'SELECT id, title, entry,  DATE_FORMAT(`when`, "%a %e/%c-%Y (%k:%i)") as `date` FROM entry WHERE uid=? ORDER BY `when` DESC limit 20';

$sth = $db->prepare ($sql);

$sth->execute (array ($_SESSION['user']));

while ($row = $sth->fetch()) {

	echo "<li><a href='javascript:showEntry({$row['id']}, \"mineBloggInnlegg.php\")'>{$row['title']}</a> ({$row['date']})</li>";

}

?>

</ul>
