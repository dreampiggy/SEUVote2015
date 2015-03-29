<?php
namespace Home\Controller;
use Think\Controller;
class EmailController extends Controller {
	/**
	 * 系统邮件发送函数
	 * @param string $to    接收邮件者邮箱
	 * @param string $name  接收邮件者名称
	 * @param string $subject 邮件主题 
	 * @param string $body    邮件内容
	 * @param string $attachment 附件列表
	 * @return boolean 
	 */
	function email($to, $name = '东南大学最有影响力毕业生校外验证', $subject = '', $body = '', $attachment = null){
		session_start();
		$to = $_POST['address'];
		$this->generateCode();
		$body = '欢迎加入最有影响力毕业生投票！<p>这里是验证码：<p>'.$_SESSION['emailCheck'];
	    $config = C('THINK_EMAIL');
	    $mail             = new \Org\PHPMailer\PHPMailer(); //PHPMailer对象
	    $mail->CharSet    = 'UTF-8'; //设定邮件编码，默认ISO-8859-1，如果发中文此项必须设置，否则乱码
	    $mail->IsSMTP();  // 设定使用SMTP服务
	    $mail->SMTPDebug  = 0;                     // 关闭SMTP调试功能
	                                               // 1 = errors and messages
	                                               // 2 = messages only
	    $mail->SMTPAuth   = true;                  // 启用 SMTP 验证功能
	    // $mail->SMTPSecure = 'ssl';                 // 使用安全协议
	    $mail->Host       = $config['SMTP_HOST'];  // SMTP 服务器
	    $mail->Port       = $config['SMTP_PORT'];  // SMTP服务器的端口号
	    $mail->Username   = $config['SMTP_USER'];  // SMTP服务器用户名
	    $mail->Password   = $config['SMTP_PASS'];  // SMTP服务器密码
	    $mail->SetFrom($config['FROM_EMAIL'], $config['FROM_NAME']);
	    $replyEmail       = $config['REPLY_EMAIL']?$config['REPLY_EMAIL']:$config['FROM_EMAIL'];
	    $replyName        = $config['REPLY_NAME']?$config['REPLY_NAME']:$config['FROM_NAME'];
	    $mail->AddReplyTo($replyEmail, $replyName);
	    $mail->Subject    = $subject;
	    $mail->MsgHTML($body);
	    $mail->AddAddress($to, $name);
	    if(is_array($attachment)){ // 添加附件
	        foreach ($attachment as $file){
	            is_file($file) && $mail->AddAttachment($file);
	        }
	    }
	    //发送成功，返回json为{"status":1},否则为{"status":0}
	    if($mail->Send()){
	    	$data['status']  = 1;
			$this->ajaxReturn($data);
	    }
	    else{
	    	$data['status']  = 0;
			$this->ajaxReturn($data);
		}
	}

	public function generateCode(){
		session_start();
		$Str[0] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
        $Str[1] = "abcdefghijklmnopqrstuvwxyz"; 
        $Str[2] = "01234567891234567890123456"; 
        $checkCode = '';
		//获取6位随机验证码
		for($i = 0;$i < 6;$i++){
			$imstr[$i]["s"] = $Str[rand(0,2)][rand(0,25)];
			$checkCode .= $imstr[$i]["s"];
		}

        $_SESSION['emailCheck'] = strtolower($checkCode);
	}
}
?> 
