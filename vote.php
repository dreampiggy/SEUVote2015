<?php
//投票后台
session_start();
header('Content-Type:text/html;charset=UTF-8');

date_default_timezone_set('prc');
$my_t=getdate(date("U"));
$check_h = $my_t['hours'];

$return = 2;//默认为未登录状态
$getValidateNum = $_REQUEST['postValidateNum'];
$getValidateNum = strtolower($getValidateNum);
$getVoteArray = $_REQUEST['voteArray'];
$getVoteArray = json_decode($getVoteArray,true);
$voteFor = $getVoteArray;//这是该用户选择的人组成的数组
$voteFor = array_unique($voteFor);
$voteTotal = count($voteFor);
$currnetIP = getIP();
$currentUnixTime = time();

$canAll = array("16010013"
,"19110211"
,"19210108"
,"22010218"
,"21110129"
,"02010117"
,"01209119"
,"02610218"
,"04210726"
,"02010110"
,"04210718"
,"04010438"
,"13110111"
,"03010007"
,"10110109"
,"01109319"
,"24010113"
,"06010301"
,"14110126"
,"06010240"
,"24010119"
,"13210128"
,"14210137"
,"10310109"
,"43209115"
,"07210104"
,"43209222"
,"04010213"
,"14810133"
,"43109221"
,"22010113"
,"07110128"
,"10210110"
,"14410210"
,"14710109"
,"05110528"
,"06010124"
,"14210144"
,"02010535"
,"05110326"
,"43209109"
,"14410109"
,"07310104"
,"42109107"
,"21710124"
,"21010130"
,"21710225"
,"17110317"
,"21010224"
,"21110230"
,"16010118"
,"09010309"
,"02010116"
,"09010334"
,"61310104"
,"43109102"
,"05210125"
,"04210732"
,"43109103"
,"71110112"
,"07310131"
,"01109109"
,"14310114"
,"71110404"
,"04010035"
,"05110209"
,"03010527"
,"03010123"
,"03210727"
,"03010424"
,"03110631"
,"03010227"
,"03010404"
,"12010323"
,"25010122"
,"11110125"
,"13310127");//所有的学号 
$flag = 1;  
foreach ($voteFor as $va) {  
    if (in_array($va, $canAll)) {  
        continue;  
    }else {  
        $flag = 0;  
        break;  
    }  
}  

function getIP() { 
if (getenv('HTTP_CLIENT_IP')) { 
$ip = getenv('HTTP_CLIENT_IP'); 
} 
elseif (getenv('HTTP_X_FORWARDED_FOR')) { 
$ip = getenv('HTTP_X_FORWARDED_FOR'); 
} 
elseif (getenv('HTTP_X_FORWARDED')) { 
$ip = getenv('HTTP_X_FORWARDED'); 
} 
elseif (getenv('HTTP_FORWARDED_FOR')) { 
$ip = getenv('HTTP_FORWARDED_FOR'); 

} 
elseif (getenv('HTTP_FORWARDED')) { 
$ip = getenv('HTTP_FORWARDED'); 
} 
else { 
$ip = $_SERVER['REMOTE_ADDR']; 
} 
return $ip; 
} 

if(!isset($_SESSION['loginName'])){
	$return = 2;
	echo $return;
}
else{
	if ($flag)	{	
			if($check_h>=7 && $check_h<=22){
				if (true) {
					//判断 是前台数据
					if ($getValidateNum == $_SESSION['validateNum']) {
						$_SESSION['validateNum']=rand(0,25000000005);	
						if ($voteTotal == 15) {

							//下面根据该用户名去数据库查是否已经投过票
							$loginName = $_SESSION['loginName'];
							$type = $_SESSION['type'];
							include('config.php');
							
							$db_table = "users_".$type;
							$checked_1 = mysql_query("SELECT voted FROM $db_table WHERE loginName='$loginName'",$con);
							if(!$checked_1){
								die("Error in 02". mysql_error());
							}
							$checked = mysql_fetch_row($checked_1);
							
							if ($checked[0] == 1) {
								//该用户已经投票;
								$return = 4;
								echo $return;
							} else {
								$checkIP_1 = mysql_query("SELECT IPvote,timevote FROM IP_db WHERE IPvote='$currnetIP'",$con);
								if(!$checkIP_1){die("ERROR IN IP:".mysql_error());}
								$checkIP = mysql_fetch_row($checkIP_1);
								if (!$checkIP)
								{	
									//---------------------------------------------------------------------------
									//下面将投票信息写入数据库
									$voteForStr = " ";
									for ($i=0; $i < $voteTotal; $i++) { 
										$voteForStr = $voteForStr." ".$voteFor[$i];//这里讲数组转化为字符串
									}
									//1.更新候选者数据库
									$polls = "polls_".$type;
									for ($i=0; $i < $voteTotal; $i++) {
										//先找出选手当下的得票情况
										$voteTempId = $voteFor[$i];
										$getCC = mysql_query("SELECT $polls FROM candidates WHERE studentNumber='$voteTempId'",$con);
										if(!$getCC){
											die("Error in 02". mysql_error());
										}
										$getCCINT = mysql_fetch_row($getCC);
										$nowPoll = $getCCINT[0] +1;
										//下面更新使票数+1
										$result = mysql_query("UPDATE candidates SET $polls='$nowPoll' WHERE studentNumber='$voteTempId'",$con);
										if (!$result){
											die("Error2: ".mysql_error());
										}
									}
									
									//2.更新用户数据库，将其已投票信息写入
									$result = mysql_query("UPDATE $db_table SET voted=1,voteFor='$voteForStr'  WHERE loginName = '$loginName'",$con);
									if(!$result){	
										die("Error1: " . mysql_error());
									}
									
									//3.下面为日志记录
									$currentTime = $my_t['year']."-".$my_t['mon']."-".$my_t['mday']." ".$my_t['hours'].":".$my_t['minutes'].":".$my_t['seconds']." ";
									$rinfo=$_SESSION['loginName']." ".$currentTime.'VOTE FOR: '.$voteFor[0]." ".$voteFor[1]." ".$voteFor[2]." ".$voteFor[3]." ".$voteFor[4]." ".$voteFor[5]." ".$voteFor[6]." ".$voteFor[7]." ".$voteFor[8]." ".$voteFor[9]." ".$voteFor[10]." ".$voteFor[11]." ".$voteFor[12]." ".$voteFor[13]." ".$voteFor[14]." ";//php写文本的内容
									$keydb ="../voteLog.txt";//php写文本保存的文件名
									$fp=fopen($keydb,"a");//写入方法
									fwrite($fp,$rinfo."\r\n\r\n"); //写入数据
									fclose($fp);

									//4.下面将IP和时间戳记录进数据库
									$writeIP = mysql_query("INSERT INTO IP_db(IPvote,timevote) VALUES ('$currnetIP','$currentUnixTime')",$con);
									if(!$writeIP){die("ERROR IN WriteIP:".mysql_error());}

									$return = 1;
									echo $return;
									//--------------------------------------------------------//以上为投票成功
								}//yishang是数据库里没有这样的ip时的操作，记录ip和时间戳
								else
								{
									$timeInDB = $checkIP[1];
									$timeGap = $currentUnixTime - $timeInDB;
									if ($timeGap<=1800) 
									{
										$return = 8;
										echo $return;//同一个ip一天内只能投票一次
									} 
									else {
										//---------------------------------------------------------------------------
										//下面将投票信息写入数据库
										$voteForStr = " ";
										for ($i=0; $i < $voteTotal; $i++) { 
											$voteForStr = $voteForStr." ".$voteFor[$i];//这里讲数组转化为字符串
										}
										//1.更新候选者数据库
										$polls = "polls_".$type;
										for ($i=0; $i < $voteTotal; $i++) {
											//先找出选手当下的得票情况
											$voteTempId = $voteFor[$i];
											$getCC = mysql_query("SELECT $polls FROM candidates WHERE studentNumber='$voteTempId'",$con);
											if(!$getCC){
												die("Error in 02". mysql_error());
											}
											$getCCINT = mysql_fetch_row($getCC);
											$nowPoll = $getCCINT[0] +1;
											//下面更新使票数+1
											$result = mysql_query("UPDATE candidates SET $polls='$nowPoll' WHERE studentNumber='$voteTempId'",$con);
											if (!$result){
												die("Error2: ".mysql_error());
											}
										}
										
										//2.更新用户数据库，将其已投票信息写入
										$result = mysql_query("UPDATE $db_table SET voted=1,voteFor='$voteForStr'  WHERE loginName = '$loginName'",$con);
										if(!$result){	
											die("Error1: " . mysql_error());
										}
										
										//3.下面为日志记录
										$currentTime = $my_t['year']."-".$my_t['mon']."-".$my_t['mday']." ".$my_t['hours'].":".$my_t['minutes'].":".$my_t['seconds']." ";
										$rinfo=$_SESSION['loginName']." ".$currentTime.'VOTE FOR: '.$voteFor[0]." ".$voteFor[1]." ".$voteFor[2]." ".$voteFor[3]." ".$voteFor[4]." ".$voteFor[5]." ".$voteFor[6]." ".$voteFor[7]." ".$voteFor[8]." ".$voteFor[9]." ".$voteFor[10]." ".$voteFor[11]." ".$voteFor[12]." ".$voteFor[13]." ".$voteFor[14]." ";//php写文本的内容
										$keydb ="../voteLog.txt";//php写文本保存的文件名
										$fp=fopen($keydb,"a");//写入方法
										fwrite($fp,$rinfo."\r\n\r\n"); //写入数据
										fclose($fp);

										//4.xiamian则update ip的数据库
										$updateIP = mysql_query("UPDATE IP_db SET timevote = '$currentUnixTime' WHERE IPvote = '$currnetIP'",$con);
										if(!$updateIP){die("ERROR IN updateIP:".mysql_error());}

										$return = 1;
										echo $return;
										//--------------------------------------------------------//以上为投票成功
									}//zhege依旧是投票成功，但是要更新对应ip的time

								}//yishang是数据库里有这样的ip时的操作，更新ip对应的时间戳
							}//end of 是否已经投过票
							
						} else {
							$return = 5;
							echo $return;
						}//end of 判断人数是否正确
						
					} else {
						$return = 6;
						echo $return;
					}//end of 判断验证码
				} else {
					$return = 3;
					echo $return;
				}//end of 是否前台
			} else {
				$return = 7;
				echo $return;
			}//end of time

	}
	else {
		$return = 9;
		echo $return;
	}
}//end of 是否已经登陆


?>
