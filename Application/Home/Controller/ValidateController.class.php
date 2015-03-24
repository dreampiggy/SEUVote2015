<?php
namespace Home\Controller;
use Think\Controller;
class ValidateController extends Controller {
    public function validate(){
    	define('validatURL','http://my.seu.edu.cn/userPasswordValidate.portal');
    	define('gotoURL','http://my.seu.edu.cn/loginSuccess.portal');
    	define('gotoFailURL','http://my.seu.edu.cn/loginFailure.portal');
    	define('validateTrue', '<script type="text/javascript">(opener || parent).handleLoginSuccessed();</script>
');
    	//根据校园信息门户的POST请求定义常量
		$userCardNumber = $_POST['loginName'];
		$userPassword = $_POST['password'];

		$postData = array(
			'Login.Token1' => $userCardNumber,
			'Login.Token2' => $userPassword,
			'goto' => gotoURL,
			'gotoOnFail' => gotoFailURL
		);
		//调用sendPost()发送POST请求
    	$result = $this->sendPost(validatURL,$postData);
    	//验证通过，返回json为{"status":1},否则为{"status":0}
	    if($result == validateTrue){
	    	$data['status']  = 1;
			$this->ajaxReturn($data);
	    }
	    else{
	    	$data['status']  = 0;
			$this->ajaxReturn($data);
	    }
    }

	public function sendPost($url, $post_data) {
		$postdata = http_build_query($post_data);
		$options = array(
			'http' => array(
			'method' => 'POST',
			'header' => 'Content-type:application/x-www-form-urlencoded',
			'content' => $postdata,
			'timeout' => 15 * 60 // 超时时间（单位:s）
			)
		);
		$context = stream_context_create($options);
		$result = file_get_contents($url, false, $context);
		return $result;
	}
}