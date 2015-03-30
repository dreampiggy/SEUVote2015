<?php
//投票后台
namespace Home\Controller;
use Think\Controller;
class VoteController extends Controller {
	private $Model;//数据库模型
	private $loginName;//登录名
	private $type;//登录类型，校内or校外
	private $db_table;//登录用户的类型对应的数据表名称，校内or校外
	private $my_t;//当前时间按照秒数得到的值
	private $voteFor;//用户投给毕业生的列表
	private $voteTotal;//用户投给毕业生列表的长度，暂时是15个
	private $currnetIP;//当前用户的IP地址
	private $currentUnixTime;//当前的UNIX时间戳
	private $validateNum;//验证码的值


	public function checkCaptcha(){

		if(!($this->validateNum == $_SESSION['validateNum'])){
			return false;
		}
		$_SESSION['validateNum'] = rand(0,25000000005);
		return true;
	}

	public function checkVoteTotal(){
		$canAll = $this->getAllGraduate();
		foreach ($this->voteFor as $va) {
		    if (in_array($va, $canAll)) {
		        continue;
		    }
		    else {
		        break;
		        return false;
		    }
		}
		return true;
	}

	public function checkIP(){
		$checkIP = $this->Model->query("SELECT IPvote,timevote FROM IP_db WHERE IPvote='%s'",$this->currnetIP);
		if($checkIP){
			$timeInDB = $checkIP[0]['timevote'];
			$timeGap = $this->currentUnixTime - $timeInDB;
			if ($timeGap <= 1800)
			{
				return false;
			}
			else{
				return true;
			}
		}
		else{
			$result = $this->Model->execute("INSERT INTO IP_db (IPvote,timevote) VALUES ('%s','%s')",$this->currnetIP,$this->currentUnixTime);
			if($result){
				return true;
			}
			else{
				return false;
			}
		}
	}

	//检查没有投票为true，投票了为false
	public function checkNotVoted(){
		$this->loginName = $_SESSION['loginName'];
		$this->type = $_SESSION['type'];
		$this->db_table = "users_".$this->type;
		$checked = $this->Model->query("SELECT voted FROM %s WHERE loginName='%s'",$this->db_table,$this->loginName);
		if($checked[0]['voted'] != 1){
			return true;
		}
		else if ($checked[0]['voted'] == 1) {
			return false;
		}
	}

	//添加投票数
	public function addVote(){
		$this->voteForStr = " ";
		for ($i=0; $i < $this->voteTotal; $i++) {
			$this->voteForStr = $this->voteForStr." ".$this->voteFor[$i];//这里将数组转化为字符串
		}

		//1.更新候选者数据库
		$polls = "polls_".$this->type;
		for ($i=0; $i < $this->voteTotal; $i++) {
			//先找出选手当下的得票情况
			$voteTempId = $this->voteFor[$i];
			$getCCINT = $this->Model->query("SELECT %s FROM candidates WHERE studentNumber='%s'",$polls,$voteTempId);
			if(!$getCCINT){
				die("Error in 02". mysql_error());
				return false;
			}
			$nowPoll = $getCCINT[0][$polls] + 1;
			//下面更新使票数+1
			$result = $this->Model->execute("UPDATE candidates SET %s='%s' WHERE studentNumber='%s'",$polls,$nowPoll,$voteTempId);
			if (!$result){
				die("Error2: ".mysql_error());
				return false;
			}
		}

		//2.更新用户数据库，将其已投票信息写入
		$result = $this->Model->execute("UPDATE %s SET voted = 1,voteFor = '%s' WHERE loginName = '%s'",$this->db_table,$this->voteForStr,$this->loginName);
		if(!$result){
			die("Error1: " . mysql_error());
			return false;
		}
		return true;
	}

	public function logger(){
		$currentTime = $this->my_t['year']."-".$this->my_t['mon']."-".$this->my_t['mday']." ".$this->my_t['hours'].":".$this->my_t['minutes'].":".$this->my_t['seconds']." ";
		$rinfo = "username: ".$_SESSION['loginName']." ip: ".$this->currnetIP." time: ".$currentTime.' vote for: ';
		for($i = 0;$i < $this->voteTotal;$i++){
			$rinfo .= ($this->voteFor[$i] . " ");
		}
		$keydb ="./voteLog.txt";//php写文本保存的文件名
		$fp=fopen($keydb,"a");//写入方法
		$result = fwrite($fp,$rinfo."\r\n\r\n"); //写入数据
		fclose($fp);
		$this->updateIP();
		if(!$result){
			return false;
		}
		return true;
	}

	public function updateIP(){
		$result = $this->Model->execute("UPDATE IP_db SET timevote = '%s' WHERE IPvote = '%s'",$this->currentUnixTime,$this->currnetIP);
	}


	public function init(){
		session_start();
		header('Content-Type:text/html;charset=UTF-8');
		date_default_timezone_set('prc');
		$this->my_t=getdate(date("U"));
		$return = 2;//默认为未登录状态

		$validateNum = $_REQUEST['postValidateNum'];
		$this->validateNum = strtolower($validateNum);

		$getVoteArray = $_REQUEST['voteArray'];
		$getVoteArray = json_decode($getVoteArray,true);

		$voteFor = $getVoteArray;//该用户选票的数组
		$this->voteFor = array_unique($voteFor);
		$this->voteTotal = count($this->voteFor);

		$this->currnetIP = get_client_ip();
		$this->currentUnixTime = time();
	}

    public function vote(){
    	//初始化
    	$this->init();
    	$this->Model = M();
		//是否存在Session
		if(!isset($_SESSION['loginName'])){
			$return = 2;
			echo $return;
			return;
		}
		//投票学号是否在毕业生数组中以及投够15个人
		if(!$this->checkVoteTotal()){
			$return = 3;
			echo $return;
			return;
		}
		//是否含有验证码
		if(!$this->checkCaptcha()){
			$return = 4;
			echo $return;
			return;
		}
		//是否已经在IP列表中
		if(!$this->checkIP()){
			$return = 5;
			echo $return;
			return;
		}
		//是否已经投过票
		if(!$this->checkNotVoted()){
			$return = 6;
			echo $return;
			return;
		}
		//开始投票，将投票信息写入数据库
		if(!$this->addVote()){
			$return = 7;
			echo $return;
			return;
		}
		//进行日志记录
		if(!$this->logger()){
			$return = 8;
			echo $return;
			return;
		}
		//成功！
		$return = 1;
		echo $return;
		return;
	}
	public function getAllGraduate(){
		return array("16010013"
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
	}
}
?>
