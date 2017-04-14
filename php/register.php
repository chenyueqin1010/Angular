<?php
	include("connect.php");
	
	$uname = $_REQUEST['username'];
	$upword = $_REQUEST['password'];
	
	$sql="insert into users (uname,upword)values('$uname','$upword')";
		
	if($conn->query($sql)===TRUE){
		echo '1';
	}else{
		echo '0';
	}
?>