
	<!--gebruiker gegevens ophalen vanuit json headers-->
<?php 
	$gebruiker=json_decode(file_get_contents('php://input'));  
	if($gebruiker->naam=='admin' && $gebruiker->pass=='admin') 
		session_start();
		$_SESSION['uid']=uniqid('ang_');
		print $_SESSION['uid'];
?>