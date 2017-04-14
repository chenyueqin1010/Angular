<?php
	include("connect.php");
	
	$id = $_REQUEST['id'];
	
	$sql="delete from tables where id=$id";
	
	if($conn->query($sql)===TRUE){
		echo '1';
	}else{
		echo '0';
	} 
?>