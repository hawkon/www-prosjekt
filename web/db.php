<?php
try{
$db = new PDO('mysql:host=db4free.net;dbname=openpub', 's100244', 'passord');
} catch (PDOException $e) {
    die ('Kunne ikke koble til serveren : ' . $e->getMessage());
}
?>
