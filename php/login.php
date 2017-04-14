<?php
	include("connect.php");
	
	$uname = $_REQUEST['username'];
	$upword = $_REQUEST['password'];
	
	$sql="select * from users where uname='$uname' and upword='$upword'";
	if($conn->query($sql)->num_rows>0){
		echo "1";
	}else{
		echo "0";
	}
?>