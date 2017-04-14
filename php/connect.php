<?php
	header("Content-type:text/json;charset=utf-8");//解决乱码
	
	$path="localhost";
	$name="root";
	$pword="";
	$db="angular";
	
	$conn=new mysqli($path,$name,$pword,$db);
	
	$program_char = "utf8";//解决乱码
	mysqli_set_charset( $conn, $program_char );//解决乱码
?>