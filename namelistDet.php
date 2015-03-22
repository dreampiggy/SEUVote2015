<?php
	session_start();
	header('Content-Type:text/html;charset=UTF-8');
	function load_Short(){
		$json_infoDet=array();
		include('config.php');

		$detailInfo_1 = mysql_query("SELECT name,describeSelf
			FROM candidates ",$con);
		if(!$detailInfo_1){
			die("Error in 01". mysql_error());
		}
		while($detailInfo = mysql_fetch_row($detailInfo_1)){
			$temp = array(
				"realname"=>urlencode($detailInfo[0]),
				"describe"=>urlencode($detailInfo[1]),
				);
			array_push($json_infoDet,$temp);
		}
		mysql_close();
		//$json_return = serialize($json_infoDet);
		$ret = json_encode($json_infoDet);
		$ret = urldecode($ret);
		echo "$ret";
	}
	function load_Det(){
		$studentNumber = $_POST['studentId'];
		include('config.php');

		$detailInfo_1 = mysql_query("SELECT name,studentNumber,college,style,proof,introduce
			FROM candidates WHERE studentNumber='$studentNumber'",$con);
		if(!$detailInfo_1){
			die("Error in 01". mysql_error());
		}
		$detailInfo = mysql_fetch_row($detailInfo_1);
		$json_infoDet = array(
			"realname"=>$detailInfo[0],
			"number"=>$detailInfo[1],
			"college"=>$detailInfo[2],
			"style"=>$detailInfo[3],
			"proof"=>$detailInfo[4],
			"introduce"=>$detailInfo[5]
		);
		mysql_close();
		foreach ($json_infoDet as $key => $value) {
			$json_infoDet[$key] = urlencode($value);
		}
		//$json_return = serialize($json_infoDet);
		$ret = json_encode($json_infoDet);
		$ret = urldecode($ret);
		echo "$ret";
	}
	$signal = $_POST['signal'];
	if ($signal == 'shortIntroduce')
		load_Short();
	else if($signal == 'loadDetails')
		load_Det();

?>	