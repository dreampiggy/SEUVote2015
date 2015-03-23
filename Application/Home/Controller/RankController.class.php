<?php
//查询排名情况
namespace Home\Controller;
use Think\Controller;
class RankController extends Controller {
	private $Model;
	public function rank(){
		session_start();
		header('Content-Type:text/html;charset=UTF-8');
		date_default_timezone_set('prc');
		$my_t=getdate(date("U"));

		$judge = $_POST['refere'];
		if ($judge=="reference4") {
			# code...
			$this->Model = M();
			$this->returnRanking();
		} else {
			# code...	
			//不是从前台发来的注册信息，驳回！
			$return = 3;
			echo $return;
		}
	}

	public function returnRanking(){
		$loginName = $_SESSION['loginName'];
		$type = $_SESSION['type'];
		$type_look = $_REQUEST['typeX'];

		//首先判断这个娃娃有没有投票
		$db_table = 'users_'.$type;
		$polls = "polls_".$type_look;
		$checked = $this->Model->query("SELECT voted FROM %s WHERE loginName='%s'",$db_table,$loginName);
		if(!$checked[0]){
			die("Error in 02". mysql_error());
		}
		if ($checked[0]['voted'] == 1) {
			//该用户投票了，去数据库找选手得票情况
			$row_max = $this->Model->query("SELECT %s FROM candidates WHERE %s=(SELECT max(%s) FROM candidates)",$polls,$polls,$polls);
			if (!$row_max[0]) {die("ERROR in max".mysql_errno());}
			$maxPoll = $row_max[0][$polls];//找到最大值
			$pollDetList = $this->Model->query("SELECT name,studentNumber,%s FROM candidates ORDER BY studentNumber ASC",$polls);
			if(!$pollDetList){
				die("Error in 01". mysql_error());
			}
			
			//声明1个数组，存储姓名，学号，票数
			$people = array();
			foreach ($pollDetList as $counter => $pollDet) {
				$who = array('nameA' => urlencode($pollDet['name']), 'numberA' => urlencode($pollDet['studentnumber']), 'pollA' => urlencode($pollDet[$polls]));
				array_push($people, $who);
			}

			$jsonReturn = array('people'=>$people,'maxPoll'=>$maxPoll);
			$ret = json_encode($jsonReturn);
			$return = urldecode($ret);
			echo $return;
		} else {
			//这孩子还没投票呢！
			$return = 2;
			echo $return;
		}
	}
}
?>
