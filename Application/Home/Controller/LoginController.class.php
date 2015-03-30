<?php
namespace Home\Controller;
use Think\Controller;
class LoginController extends Controller {
    
	private $Model;
    
    public function login()
    {
		session_start();
        
		header('Content-Type:text/html;charset=UTF-8');
        
		$return = 5;//返回值，默认为用户名不存在
        
		$judge = $_POST['refere'];
        
        /*判断是否是前台发来的注册信息*/
		if ($judge=="reference2")
        {
			$this->Model = M();
			$this->canLogin();
		}
        else
        {
			$return = 3;//是越过前台发来的注册信息
			echo $return;
		}
	}
    
    //能够登录时的操作
	public function canLogin()
    {
		$loginName = $_REQUEST['loginName'];
		$password = $_REQUEST['password'];
        
		$type = $_REQUEST['type'];
        
		$getValidateNum = $_REQUEST['postValidateNum'];
		$getValidateNum = strtolower($getValidateNum);
        
        /*首先判断验证码是否正确*/
		if ($getValidateNum == $_SESSION['validateNum'])
        {
			$_SESSION['validateNum']=rand(0,255);//重新生成验证码种子
            
            /*如果是校外登录*/
			if( $type == "out")
            {
                /*如果邮箱、密码符合规范*/
				if (ereg("([0-9a-zA-Z]+)([@])([0-9a-zA-Z]+)([.])([0-9a-zA-Z]{2,4})",$loginName) && preg_match("/^[a-zA-Z\d]{6,18}$/",$password))
                {
                    /*查找是否存在该邮箱*/
					$result = $this->Model->query("SELECT password FROM users_out WHERE loginName = '%s'",$loginName);
                    
                    /*如果不存在邮箱*/
					if(!$result[0])
					{
						$return = 5;//邮箱未注册
						echo $return;
					}
                    
                    /*如果存在邮箱*/
					else
                    {
                        /*判断密码是否正确*/
                        $password = sha1($password);
                        if( $password == $result[0]['password'] )
                        {
							$return = 1;//登录成功
							$_SESSION['loginName']=$loginName;
							$_SESSION['type']=$type;
							echo $return;
                        }
                        else
                        {
                            $return = 4;//密码错误
                            echo $return;
                        }
					}
				}
                
                /*如果邮箱、密码格式不正确*/
                else
                {
					$return = 6;//邮箱、密码格式不正确
					echo $return;
				}
			}
            
            /*如果是校内登录*/
			else if ($type=="in")
            {
                /*如果一卡通号、密码符合规范*/
				if (preg_match("/^[\d]{9}$/",$loginName) && preg_match("/^[a-z\d]{6,18}$/i",$password))
                {
                    /*通过myseu验证密码*/
                    $result = R('Validate/validate');
                    /*是否通过myseu验证*/
                    if($result)
                    {
                        //密码正确
                        $_SESSION['loginName']=$loginName;
                        $_SESSION['type']=$type;
                        $return = 1;//登录成功
                        echo $return;
                    }
                    else
                    {
                        //密码错误
                        $return = 5;//myseu验证不通过
                        echo $return;
                    }
				}
                
                else
                {
					$return = 6;//校内用户一卡通号、密码格式错误
					echo $return;
				}
			}
		}
        
        /*如果验证码错误*/
		else
        {
			$return = 2;//验证码错误
			echo $return;
		}
	}
}
/**
*校外登录返回值列表
1 登录成功
2 验证码错误
3 是越过前端的请求
4 密码错误
5 邮箱未注册
6 邮箱、密码格式不正确
*校内登录返回值列表
1 登录成功
2 验证码错误
3 是越过前端的请求
4 
5 myseu验证不通过
6 一卡通号、密码格式错误
*/
?>
