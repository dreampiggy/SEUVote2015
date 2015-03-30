<?php
//登陆用，校内校外均可
namespace Home\Controller;
use Think\Controller;
class LoginController extends Controller {
	private $Model;
    public function login(){
		session_start();
		header('Content-Type:text/html;charset=UTF-8');
		$return = 5;//默认为用户名不存在
		$judge = $_POST['refere'];
		if ($judge=="reference2") {
			# code...
			$this->Model = M();
			$this->canLogin();
		} else {
			# code...
			//不是从前台发来的注册信息，驳回！
			$return = 3;
			echo $return;
		}
	}
	public function canLogin(){
		$loginName = $_REQUEST['loginName'];
		$password = $_REQUEST['password'];
		$type = $_REQUEST['type'];
		$getValidateNum = $_REQUEST['postValidateNum'];
		$getValidateNum = strtolower($getValidateNum);

		if ($getValidateNum == $_SESSION['validateNum']) {
			$_SESSION['validateNum']=rand(0,255);
			if( $type == "out"){
				if (ereg("([0-9a-zA-Z]+)([@])([0-9a-zA-Z]+)([.])([0-9a-zA-Z]{2,4})",$loginName) && preg_match("/^[a-zA-Z\d]{6,18}$/",$password)) {
					//校外用户
					$result = $this->Model->query("SELECT password FROM users_out WHERE loginName = '%s'",$loginName);
					if(!$result[0])
					{
						$return = 5;//邮箱不存在
						echo $return;
					}
					else {
						if( $password == $result[0]['password'] ){
							$return = 1;//登陆成功
							$_SESSION['loginName']=$loginName;
							$_SESSION['type']=$type;
							echo $return;
						 }
						else{
							$return = 4;//密码错误
							echo $return;
						}
					}
				} else {
					//校外用户邮箱或者密码格式不正确
					$return = 6;
					echo $return;
				}
			} 
			else if ($type=="in") {
				if (preg_match("/^[\d]{9}$/",$loginName) && preg_match("/^[a-z\d]{6,18}$/i",$password)) {
					# code...
					
						//校内用户
						$result = R('Validate/validate');
						if($result)
						{
							$_SESSION['loginName']=$loginName;
							$_SESSION['type']=$type;
							$return = 1;
							echo $return;
						}
						else {
							$return = 5;
							echo $return;
						}
					
				} else {
					//校内用户一卡通密码格式错误
					$return = 6;
					echo $return;
				}
			}
		}
		else {
			$return = 2;//验证码错误
			echo $return;
		}
	}
}
?>
