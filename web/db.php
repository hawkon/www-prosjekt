<?php
try {
        $db = new PDO('mysql:host=mysql.stud.hig.no;dbname=s100244', 's100244', '');
} catch (PDOException $e) {
    die ('Kunne ikke koble til serveren : ' . $e->getMessage());
}
?>

