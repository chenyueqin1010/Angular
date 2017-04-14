<?php
	include("connect.php");
	
	$id = $_REQUEST['id'];
	$name = $_REQUEST['name'];
	$sex = $_REQUEST['sex'];
	$remark = $_REQUEST['remark'];
	
	$sql="update tables set name='$name',sex='$sex',remark='$remark' where id=$id";
	
	if($conn->query($sql)===TRUE){
		echo '1';
	}else{
		echo '0';
	} 
?>