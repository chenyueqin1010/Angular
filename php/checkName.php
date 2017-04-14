<?php
	include("connect.php");
	
	$uname = $_REQUEST['username'];
	
	$sql="select * from users where uname='$uname'";
	if($conn->query($sql)->num_rows>0){
		echo "1";
	}else{
		echo "0";
	}
?>