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

		$studentNumberQuery = mysql_query("SELECT studentNumber FROM candidates",$con);
		$ret = '';
		while($row = mysql_fetch_array($studentNumberQuery)){
			$studentNumber = $row[0];
			$detailInfo_1 = mysql_query("SELECT studentNumber,name,describeSelf FROM candidates WHERE studentNumber='$studentNumber'",$con);
			if(!$detailInfo_1){
				die("Error in getting details". mysql_error());
			}
			$detailInfo = mysql_fetch_row($detailInfo_1);
			$json_infoDet = array(
				"studentNumber"=>$detailInfo[0],
				"realname"=>$detailInfo[1],
				"describe"=>$detailInfo[2],
			);
			foreach ($json_infoDet as $key => $value) {
				$json_infoDet[$key] = urlencode($value);
			}
			//$json_return = serialize($json_infoDet);
			$jsonText = json_encode($json_infoDet);
			$ret .= urldecode($jsonText);
		}
		$jsonName = "introduction.json";
		$jsonFile = fopen($jsonName, "w");
		fwrite($jsonFile, $ret);
	}
	load_Det();
?>	