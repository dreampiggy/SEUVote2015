<?php
namespace Home\Controller;
use Think\Controller;
class RankController extends Controller
{
	private $Model;
	public function rank()
    {
		session_start();
		header('Content-Type:text/html;charset=UTF-8');
		date_default_timezone_set('prc');
		$my_t=getdate(date("U"));
        
        /*验证是否是前台发来的请求*/
		$judge = $_POST['refere'];
		if ($judge=="reference4")
        {
			$this->Model = M();
			$this->returnRanking();
		}
        else
        {
			$return = 3;//是越过前台发来的请求
			echo $return;
		}
	}

    /*返回排名结果*/
	public function returnRanking()
    {
        //SESSION中的用户登录信息
		$loginName = $_SESSION['loginName'];
		$type = $_SESSION['type'];
		$type_look = $_REQUEST['typeX'];

		//判断该用户是否投票过
		$db_table = 'users_'.$type;
		$polls = "polls_".$type_look;
		$checked = $this->Model->query("SELECT voted FROM %s WHERE loginName='%s'",$db_table,$loginName);
		if(!$checked[0])
        {
			die("Error in 02". mysql_error());//该用户未投票
		}
        
        /*该用户已投过票*/
		if ($checked[0]['voted'] == 1)
        {
            //选出候选人
			$row_max = $this->Model->query("SELECT %s FROM candidates WHERE %s=(SELECT max(%s) FROM candidates)",$polls,$polls,$polls);
            
			if (!$row_max[0])
            {
                die("ERROR in max".mysql_errno());
            }
            
			$maxPoll = $row_max[0][$polls];//找到票数最大值
            
			$pollDetList = $this->Model->query("SELECT name,studentNumber,%s FROM candidates ORDER BY studentNumber ASC",$polls);
			if(!$pollDetList)
            {
				die("Error in 01". mysql_error());
			}
			
			//声明数组存储得票情况
			$people = array();
			foreach ($pollDetList as $counter => $pollDet)
            {
				$who = array('nameA' => urlencode($pollDet['name']), 'numberA' => urlencode($pollDet['studentnumber']), 'pollA' => urlencode($pollDet[$polls]));
				array_push($people, $who);
			}

			$jsonReturn = array('people'=>$people,'maxPoll'=>$maxPoll);
			$ret = json_encode($jsonReturn);
			$return = urldecode($ret);
            
			echo $return;
		}
        
        /*此用户尚未投票过*/
        else
        {
			$return = 2;//用户尚未投票
			echo $return;
		}
	}
}
/**
*查询排名情况
1 
2 用户尚未投票
3 是越过前台发来的请求
*/
?>
