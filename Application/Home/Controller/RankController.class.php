<?php
namespace Home\Controller;
use Think\Controller;
class RankController extends Controller
{
	private $Model;//Model对象，用于操作数据库
    
    /**POST传入参数
    type: 校内投票情况=>"in"
          校外投票情况=>"in"
    */
    
    /**SESSION
    loginType: 校内用户=>"in"
               校外用户=>"out"
    id:        校内用户=>一卡通号
               校外用户=>邮箱
    */
    
    //检查当前会话中的用户是否投票过---------------------------------------------------------------------------------------
    /**参数
    */
    
    /**返回值
    boolean 是否投票过
    */
    
    private function checkVoted()
    {
        //
        session_start();
        if(!isset($_SESSION['id']))
        {
            return false;
        }
        
        $this->Model=M();
		switch($_SESSION['loginType'])
        {
        case "in":
            if($this->Model->query("SELECT voted FROM vote_2015_within_user WHERE card='%s'",$_SESSION['id'])[0]['voted']!=1)
            {
                return false;
            }
            break;
        case "out":
            if($this->Model->query("SELECT voted FROM vote_2015_outside_user WHERE email='%s'",$_SESSION['id'])[0]['voted']!=1)
            {
                return false;
            }
            break;
        default:
            return false;
            break;
        }
        
        return true;
    }
    
    //JSON返回值-------------------------------------------------------------------------------------------------------
    
    private $response=array(
        'status'=>'0',
        'ranking'  =>array(
            'maxPoll' => null,
            'rank'=> null
        ),
    );
    
    //获取排名--------------------------------------------------------------------------------------------------------
    /**POST传入参数
    *
    type: 校内投票情况=>"in"
          校外投票情况=>"in"
    */
    
    /**JSON返回值 $response
    status:
    {
        0: ERROR
        1: 获取成功
    }
    ranking: maxPoll: 最多得票数
             rank:    name:   候选人名
                      number: 候选人学号
                      poll:   候选人得票数
    */
	public function getRank()
    {
        /*
		if(!$this->checkVoted())
        {
            $this->response['status']='2';//用户未登录
            $this->ajaxReturn($this->response);
        }
        */
        
        //else
        {
            $this->Model=M();
            $maxRow=$this->Model->query("SELECT %s FROM vote_2015_candidates WHERE %s=(SELECT max(%s) FROM vote_2015_candidates)","polls_".$_POST['type'],"polls_".$_POST['type'],"polls_".$_POST['type']);
            if(!$maxRow)
            {
                $this->response['status']='0';//系统故障
                $this->ajaxReturn($this->response);
                die();
            }
            $maxPoll=$maxRow[0]["polls_".$_POST['type']];
            
            $rankList=$this->Model->query("SELECT * FROM vote_2015_candidates");
            if(!$rankList)
            {
                $this->response['status']='0';//系统故障
                $this->ajaxReturn($this->response);
                die();
            }
            
            $rank=array();
            foreach($rankList as $counter=>$rk)
            {
				$person = array('name' => $rk['name'],
                                'number' => $rk['number'],
                                'poll' => $rk["polls_".$_POST['type']]
                               );
				array_push($rank,$person);
            }
            $this->response['status']='1';//获取排名成功
            $this->response['ranking']['maxPoll']=$maxPoll;
            $this->response['ranking']['rank']=$rank;
            $this->ajaxReturn($this->response);
        }
	}
}
?>
