<?php
namespace Home\Controller;
use Think\Controller;

class UserController extends Controller {
    
    private $Model;//Model对象，用于操作数据库
    
    /**POST传入参数
    
    /*校内登录
    card: 一卡通号
    password: 密码
    captcha: 验证码
    
    /*校外登录
    email: 邮箱地址
    password: 密码
    captcha: 验证码
    
    /*校外注册
    email:         邮箱地址
    emailPassword: 邮件验证码
    password:      密码
    
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
    
    public function checkCaptcha()
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
    
    //JSON返回值-------------------------------------------------------------------------------------------------------
    
    private $response=array(
        'status'=>'0',
    );
    
    //校内登录---------------------------------------------------------------------------------------------------------
    /**POST传入参数
    *
    card: 一卡通号
    password: 密码
    captcha: 验证码
    */
    
    /**JSON返回值 $response
    status:
    {
        0: ERROR
        1: 登录成功
        2: 验证码错误
        3: 一卡通号、密码格式错误
        4: 未通过myseu验证
    }
    */
    
    public function withinLogin()
    {
        $this->Model=M();
        
        if(!$this->checkCaptcha())
        {
            $this->response['status']='2';//验证码错误
            $this->ajaxReturn($this->response);
        }
        
        else if(!(preg_match("/^[\d]{9}$/",$_POST['card'])&&preg_match("/^[a-z\d]{6,18}$/i",$_POST['password'])))
        {
            $this->response['status']='3';//一卡通号、密码格式错误
            $this->ajaxReturn($this->response);
        }
        
        else if(!(($this->Model->query("SELECT * FROM vote_2015_within_user WHERE card='%s'",$_POST['card'])[0]['card']!=null)&&(R('ValidateMYSEU/validateMYSEU'))))
        {
            $this->response['status']='4';//未通过myseu验证
            $this->ajaxReturn($this->response);
        }
        
        else
        {
            session_start();
            $_SESSION['id']=$_POST['card'];
            $_SESSION['loginType']="in";
            $this->response['status']='1';//登录成功
            $this->ajaxReturn($this->response);
        }
    }
    
    //校外登录--------------------------------------------------------------------------------------------------------
    /**POST传入参数
    *
    email: 邮箱地址
    password: 密码
    captcha: 验证码
    */
    
    /**JSON返回值 $response
    status:
    {
        0: ERROR
        1: 登录成功
        2: 验证码错误
        3: 邮箱、密码格式错误
        4: 邮箱未注册
        5: 密码错误
    }
    */
    
    public function outsideLogin()
    {
        $this->Model=M();
        
        if(!$this->checkCaptcha())
        {
            $this->response['status']='2';//验证码错误
            $this->ajaxReturn($this->response);
        }
        
        else if(!(ereg("([0-9a-zA-Z]+)([@])([0-9a-zA-Z]+)([.])([0-9a-zA-Z]{2,4})",$_POST['email'])&&preg_match("/^[a-zA-Z\d]{6,18}$/",$_POST['password'])))
        {
            $this->response['status']='3';//邮箱、密码格式错误
            $this->ajaxReturn($this->response);
        }
        
        else if($this->Model->query("SELECT * FROM vote_2015_outside_user WHERE email='%s'",$_POST['email'])[0]['email']==null)
        {
            $this->response['status']='4';//该邮箱未注册过
            $this->ajaxReturn($this->response);
        }
        
        else if($this->Model->query("SELECT * FROM vote_2015_outside_user WHERE email='%s'",$_POST['email'])[0]['password']!=sha1($_POST['password']))
        {
            $this->response['status']='5';//密码错误
            $this->ajaxReturn($this->response);
        }
        
        else
        {
            session_start();
            $_SESSION['id']=$_POST['email'];
            $_SESSION['loginType']="out";
            $this->response['status']='1';//登录成功
            $this->ajaxReturn($this->response);
        }
    }
    
    //注册------------------------------------------------------------------------------------------------------------
    /**POST传入参数
    *
    email:         邮箱地址
    emailPassword: 邮件验证码
    password:      密码
    */
    
    /**JSON返回值 $response
    status:
    {
        0: ERROR
        1: 登录成功
        2: 邮件验证码错误
        3: 邮箱、密码格式错误
        4: 邮箱已被注册
    }
    */
    
    public function outsideRegister()
    {
        $this->Model=M();
        
        if(strtolower($_POST['emailPassword'])!=$_SESSION['emailPassword'])
        {
            $this->response['status']='2';//邮件验证码错误
            $this->ajaxReturn($this->response);
        }
        
        else if(!(ereg("([0-9a-zA-Z]+)([@])([0-9a-zA-Z]+)([.])([0-9a-zA-Z]{2,4})",$_POST['email'])&&preg_match("/^[a-zA-Z\d]{6,18}$/",$_POST['password'])))
        {
            $this->response['status']='3';//邮箱、密码格式错误
            $this->ajaxReturn($this->response);
        }
        
        else if($this->Model->query("SELECT * FROM vote_2015_outside_user WHERE email='%s'",$_POST['email'])[0]['email']!=null)
        {
            $this->response['status']='4';//该邮箱已注册过
            $this->ajaxReturn($this->response);
        }
        
        else if(!$this->Model->execute("INSERT INTO vote_2015_outside_user(email,password) VALUES ('%s','%s')",$_POST['email'],sha1($_POST['password'])))
        {
            $this->response['status']='0';//系统故障
            $this->ajaxReturn($this->response);
        }
        
        else
        {
            $this->response['status']='1';//注册成功
            $this->ajaxReturn($this->response);
        }
    }
}
?>