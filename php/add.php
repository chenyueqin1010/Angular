<?php
	include("connect.php");
	
	$user = $_REQUEST['user'];
	$name = $_REQUEST['name'];
	$sex = $_REQUEST['sex'];
	$remark = $_REQUEST['remark'];
	
	$sql="insert into tables (user,name,sex,remark)values('$user','$name','$sex','$remark')";
	
	if($conn->query($sql)===TRUE){
		echo '1';
	}else{
		echo '0';
	} 
?>