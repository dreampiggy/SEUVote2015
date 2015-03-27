<?php
//校外注册使用
namespace Home\Controller;
use Think\Controller;
class RegisterController extends Controller {
	private $Model;
    public function register(){
		session_start();
		header('Content-Type:text/html;charset=UTF-8');
		$return = 2;//默认为错误值

		$judge = $_POST['refere'];
		if ($judge=="reference1") {
			# code...
			$this->Model = M();
			$this->canRegister();
		} else {
			# code...
			//不是从前台发来的注册信息，驳回！
			$return = 3;
			echo $return;
		}
	}
	public function canRegister(){
		$_SESSION['loginName'] = $_POST['loginName'];
		$_SESSION['type'] = "out";
		if($_SESSION['emailCheck'] != $_POST['emailCheck']){
			$return = 7;
			echo $return;
			return;
		}
		$password = $_POST['password'];
		/*后台判断用户名和密码是否均为6-18位的字母和数字组合，防止注入，先判断用户名*/
		if (!ereg("([0-9a-zA-Z]+)([@])([0-9a-zA-Z]+)([.])([0-9a-zA-Z]{2,4})",$_SESSION['loginName'])) {
			# code...
			//用户名不符合规定
			$return = 4;
			echo $return;
		} else {
			# code...
			/*后台再判断密码是否符合规定*/
			if (!preg_match("/^[a-zA-Z\d]{6,18}$/",$password)) {
				# code...
				//密码不符合规定
				$return = 5;
				echo $return;
			} else {
				# code...
				//下面往数据可写入注册信息
				$check = $this->Model->query("SELECT loginName FROM users_out WHERE loginName='%s'",$_SESSION['loginName']);
				if($check[0]['loginname'] != null){
					# code...
					//用户名已经存在
					$return = 6;
					echo $return;
				} else {
					$result = $this->Model->execute("INSERT INTO users_out(loginName,password) VALUES ('%s','%s')",$_SESSION['loginName'],$password);
					if(result){
						$return = 1;//注册成功
					}else{
						$return = 2;//注册失败
					}
					echo $return;
				}
			}	
		}		
	}
}
?>
