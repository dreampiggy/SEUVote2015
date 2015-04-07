<?php
namespace Home\Controller;
use Think\Controller;
class VoteController extends Controller {
    
	private $Model;//Model对象，用于操作数据库
    
    private $user_table;
    private $polls_line;
    private $id_line;
    
    private $voteArr;//用户选票的数组
    
    private $VOTE_TOTAL=15;
    
    /**POST传入参数
    voteArray: 选票的数组，JSON.stringify()形式
    captcha: 验证码
    */
    
    /**SESSION
    loginType: 校内用户=>"in"
               校外用户=>"out"
    id:        校内用户=>一卡通号
               校外用户=>邮箱
    */

    //检查验证码-------------------------------------------------------------------------------------------------------
    /**参数
    */
    
    /**返回值
    boolean 是否通过验证码检查
    */
    
    private function checkCaptcha()
    {
		if(strtolower($_POST['captcha'])==$_SESSION['captcha'])
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    //获取所有候选人学号-------------------------------------------------------------------------------------------------
    /**参数
    */
    
    /**返回值
    string[] 候选人学号
    */
    
	private function getAllNumbers()
    {
        $this->Model=M();
        $result=$this->Model->query("SELECT number FROM vote_2015_candidates");
        if(!$result)
        {
            $this->response['status']='0';//系统故障
            $this->ajaxReturn($this->response);
            die();
        }
        
        $number=array();
        foreach($result as $r)
        {
            array_push($number,$r['number']);
        }
        
        return $number;
	}
    
    //检查是否投够15人--------------------------------------------------------------------------------------------------
    /**参数
    */
    
    /**返回值
    boolean 已投够15人并是合法结果
    */
    
    private function checkIsFull()
    {
		$number=$this->getAllNumbers();
        
        $counter=0;
        
		foreach ($this->voteArr as $va)
        {
		    if(in_array($va, $number))
            {
                $counter++;
		        continue;
		    }
		    else
            {
		        return false;
		    }
		}
        
        if($counter==15)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    //检查该IP是否合法--------------------------------------------------------------------------------------------------
    /**参数
    */
    
    /**返回值
    boolean IP是否合法或是否操作数据库成功
    */
    
    private function checkIPAddress()
    {
        $this->Model=M();
		$checkIP=$this->Model->query("SELECT IP,time FROM vote_2015_ip_record WHERE IP='%s'",$this->currnetIP);
        
		if($checkIP)
        {
			$timeInDB=$checkIP[0]['time'];
			$timeGap=$this->currentUnixTime-$timeInDB;
			if($timeGap<=1800)
			{
				return false;
			}
			else
            {
				return true;
			}
		}
        
		else
        {
			if($this->Model->execute("INSERT INTO vote_2015_ip_record (IP,time) VALUES ('%s','%s')",$this->currnetIP,$this->currentUnixTime))
            {
				return true;
			}
			else
            {
                $this->response['status']='0';//系统故障
                $this->ajaxReturn($this->response);
                die();
			}
		}
    }
    
    //检查该用户是否投票过-----------------------------------------------------------------------------------------------
    /**参数
    */
    
    /**返回值
    boolean 该用户是否投票过
    */
    
	private function checkCanVote()
    {
        session_start();
        
        if(!isset($_SESSION['id']))
        {
            return false;
        }
        
        $this->Model=M();
        
		switch($_SESSION['loginType'])
        {
        case "in":
            $this->user_table="vote_2015_within_user";
            $this->polls_line="polls_in";
            $this->id_line="card";
            if($this->Model->query("SELECT voted FROM %s WHERE card='%s'",$this->user_table,$_SESSION['id'])[0]['voted']!=1)
            {
                return true;
            }
            break;
        case "out":
            $this->user_table="vote_2015_outside_user";
            $this->polls_line="polls_out";
            $this->id_line="email";
            if($this->Model->query("SELECT voted FROM %s WHERE email='%s'",$this->user_table,$_SESSION['id'])[0]['voted']!=1)
            {
                return true;
            }
            break;
        default:
            return false;
            break;
        }
        
        return false;
	}
    
    //更新候选者数据库信息-----------------------------------------------------------------------------------------------
    /**参数
    */
    
    /**返回值
    boolean 是否成功更新数据库
    */
    
    private function updateCandidateDB()
    {   
        $this->Model=M();
		foreach ($this->voteArr as $va)
        {
            $select=$this->Model->query("SELECT %s FROM vote_2015_candidates WHERE number='%s'",$this->polls_line,$va);
            $polls=$select[0][$this->polls_line];
			if(!$select)
            {
                $this->response['status']='0';//系统故障
                $this->ajaxReturn($this->response);
                return false;
            }
            
            else if(!$this->Model->execute("UPDATE vote_2015_candidates SET %s='%s' WHERE number='%s'",$this->polls_line,$polls+1,$va))
            {
                $this->response['status']='0';//系统故障
                $this->ajaxReturn($this->response);
                return false;
            }
		}
        
        return true;
    }
    
    //更新用户数据库信息-------------------------------------------------------------------------------------------------
    /**参数
    */
    
    /**返回值
    boolean 是否成功更新数据库
    */
    
    private function updateUserDB()
    {
        $this->Model=M();
        session_start();
        
        $voteForStr=" ";
		foreach ($this->voteArr as $va)
        {
            $voteForStr=$voteForStr." ".$va;//这里将数组转化为字符串
		}
        
		if(!$this->Model->execute("UPDATE %s SET voted=1,vote_for='%s' WHERE %s='%s'",$this->user_table,$voteForStr,$this->id_line,$_SESSION['id']))
        {
            $this->response['status']='0';//系统故障
            $this->ajaxReturn($this->response);
			return false;
		}
        
		return true;
    }

    //进行日志记录------------------------------------------------------------------------------------------------------
    /**参数
    */
    
    /**返回值
    boolean 是否成功记录日志
    */
    
	private function logger()
    {
		//
        return true;
	}
    
    //更新IP数据库信息--------------------------------------------------------------------------------------------------
    /**参数
    */
    
    /**返回值
    boolean 是否成功更新数据库
    */

	private function updateIPDB()
    {
        $this->Model=M();
        if(!$this->Model->execute("UPDATE vote_2015_ip_record SET time='%s' WHERE IP = '%s'",$this->currentUnixTime,$this->currnetIP))
        {
            $this->response['status']='0';//系统故障
            $this->ajaxReturn($this->response);
			return false;
        }
        return true;
	}

    //对IP，时间及投票数组等信息进行初始化---------------------------------------------------------------------------------
    /**参数
    */
    
    /**返回值
    */
	private function init()
    {
		$this->currnetIP=get_client_ip();
		$this->currentUnixTime=time();
        
		$this->voteArr=array_unique(json_decode($_POST['voteArray'],true));
	}
    
    //JSON返回值-------------------------------------------------------------------------------------------------------
    private $response=array(
        'status'=>'0',
    );
    
    //进行投票---------------------------------------------------------------------------------------------------------
    /**POST传入参数
    voteArray: 选票的数组，JSON.stringify()形式
    captcha: 验证码
    */
    
    /**JSON返回值 $response
    status:
    {
        0: ERROR
        1: 投票成功
        2: 验证码错误
        3: 此ip在30min内已投过票
        4: 尚未登录
        5: 已投过票
        6: 未足15人
    }
    */

    public function vote()
    {
    	$this->init();
        
		if(!$this->checkCaptcha())
        {
            $this->response['status']='2';//验证码错误
            $this->ajaxReturn($this->response);
			return;
		}
        
		if(!$this->checkIPAddress())
        {
            $this->response['status']='3';//此ip在30min内已投过票
            $this->ajaxReturn($this->response);
			return;
		}
        
		else if(!isset($_SESSION['id']))
        {
            $this->response['status']='4';//尚未登录
            $this->ajaxReturn($this->response);
			return;
		}
        
		else if(!$this->checkCanVote())
        {
            $this->response['status']='5';//已投过票
            $this->ajaxReturn($this->response);
			return;
		}
        
		else if(!$this->checkIsFull())
        {
            $this->response['status']='6';//未足15人
            $this->ajaxReturn($this->response);
			return;
		}
        
        else if(!(($this->updateCandidateDB())&&($this->updateUserDB())&&($this->updateIPDB())))
        {
            $this->response['status']='0';//系统故障
            $this->ajaxReturn($this->response);
			return;
        }
        
        else
        {
            $this->response['status']='1';//投票成功
            $this->ajaxReturn($this->response);
			return;
        }
	}
}
?>
