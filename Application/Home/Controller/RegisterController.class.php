<?php
namespace Home\Controller;
use Think\Controller;
class RegisterController extends Controller {
    
	private $Model;
    
    public function register()
    {
		session_start();
		header('Content-Type:text/html;charset=UTF-8');
        
		$return = 2;//返回值，默认为错误

		$judge = $_POST['refere'];
		if ($judge=="reference1") {
			# code...
			$this->Model = M();
			$this->canRegister();
		} else {
			# code...
			$return = 3;//是越过前台的注册信息
			echo $return;
		}
	}
    
	public function canRegister()
    {
		$_SESSION['loginName'] = $_POST['loginName'];
		$_SESSION['type'] = "out";
		if($_SESSION['emailCheck'] != $_POST['emailCheck'])
        {
			$return = 7;//邮箱验证码不匹配
			echo $return;
			return;
		}
        
		$password = $_POST['password'];
		/*后台判断用户名和密码是否均为6-18位的字母和数字组合，防止注入，先判断用户名*/
		if (!ereg("([0-9a-zA-Z]+)([@])([0-9a-zA-Z]+)([.])([0-9a-zA-Z]{2,4})",$_SESSION['loginName']))
        {
			$return = 4;//邮箱不符合规范
			echo $return;
		}
        else
        {
			/*再判断密码是否符合规定*/
			if (!preg_match("/^[a-zA-Z\d]{6,18}$/",$password))
            {
				$return = 5;//密码不符合规范
				echo $return;
			}
            else
            {
				/*下面检测用户名是否存在*/
				$check = $this->Model->query("SELECT loginName FROM users_out WHERE loginName='%s'",$_SESSION['loginName']);
                
				if($check[0]['loginname'] != null)
                {
					$return = 6;//用户名已经存在
					echo $return;
				}
                else
                {
                    /*若用户名不存在*/
                    /*下面往数据库写入注册信息*/
                    $password = sha1($password);
					$result = $this->Model->execute("INSERT INTO users_out(loginName,password) VALUES ('%s','%s')",$_SESSION['loginName'],$password);
					if(result)
                    {
						$return = 1;//注册成功
					}
                    else
                    {
						$return = 2;//写入数据库失败
					}
					echo $return;
				}
			}	
		}		
	}
}
/**
*校外注册返回值列表
1 注册成功
2 注册失败
3 是越过前台的注册信息
4 邮箱格式不符合规范
5 密码格式不符合规范
6 用户名已经存在
7 邮箱验证码不匹配
*/
?>
