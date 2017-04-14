<?php
	include("connect.php");
	
	$user = $_REQUEST['user'];
	
	$sql="select * from tables where user='$user'";
	
	$data=array();														
	$outp="";															
	class unote{														
		public $id;
		public $name;
		public $sex;
		public $remark;
	}
	$result=$conn->query($sql);											
	if($result->num_rows>0){
		while($row=$result->fetch_assoc()){								
			$unote=new unote();											
			$unote->id=$row["id"];										
			$unote->name=$row["name"];								
			$unote->sex=$row["sex"];
			$unote->remark=$row["remark"];
			$data[]=$unote;												
		}
	}

	$outp=json_encode($data);											
	echo $outp;															
	$conn->close();
?>