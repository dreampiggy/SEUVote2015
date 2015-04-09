<?php
	session_start();
	header('Content-Type:text/html;charset=UTF-8');
	function load_Det(){
		$database_ip = 'localhost';
		$database_user = 'root';
		$database_pwd = '123';
		//Define the database connect
		$con = mysql_connect($database_ip,$database_user,$database_pwd);
		if (!$con){
			die('Could not connect: ' . mysql_error());
		}
		mysql_query("SET NAMES UTF8");
		mysql_select_db("vote", $con);

		$numberQuery = mysql_query("SELECT number FROM candidates",$con);
		$ret = "[";
		while($row = mysql_fetch_array($numberQuery)){
			$number = $row[0];
			$detailInfo_1 = mysql_query("SELECT number,name,describe,style,college FROM candidates WHERE number='$number'",$con);
			if(!$detailInfo_1){
				die("Error in getting details". mysql_error());
			}
			$detailInfo = mysql_fetch_row($detailInfo_1);
			$json_infoDet = array(
				"number"=>$detailInfo[0],
				"name"=>$detailInfo[1],
				"describe"=>$detailInfo[2],
				"style"=>$detailInfo[3],
				"college"=>$detailInfo[4]
			);
			foreach ($json_infoDet as $key => $value) {
				$json_infoDet[$key] = urlencode($value);
			}
			$jsonText = json_encode($json_infoDet);
			$ret .= urldecode($jsonText);
			$ret .= ",";
		}
		$ret = substr($ret, 0, -1);
		$ret .= "]";
		$jsonName = "introduce_all.json";
		$jsonFile = fopen($jsonName, "w");
		fwrite($jsonFile, $ret);
	}
	load_Det();
?>