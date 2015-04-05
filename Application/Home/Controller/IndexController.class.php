<?php
namespace Home\Controller;
use Think\Controller;

class IndexController extends Controller {
    
    //入口------------------------------------------------------------------------------------------------------------
    public function index()
    {
        //用户访问时间控制
        /*
        if($this->timeCheck())
        {
            $this->display('Index/pc-index');
        }
        else
        {
            $this->display('Index/out-of-time');
        }
        */
        
        //为调试方便取消时间控制
		$this->display('Index/pc-index');
    }
    
    //时间控制函数------------------------------------------------------------------------------------------------------
    private function timeCheck()
    {
        $START_TIME=7;//开始时间
        $END_TIME=22;//结束时间
        
        //获取时间
		date_default_timezone_set('prc');
		$my_t=getdate(date("U"));
		$check_h = $my_t['hours'];
        
        if($check_h>=$START_TIME && $check_h<=$END_TIME)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    
    //路由设置---------------------------------------------------------------------------------------------------------
    
    //页面------------------------------------------------------------------------------------------------------------
    
    //404
    public function _empty()
    {
        $this->display('Index:404');
    }
    
    //正在维护
    public function out_of_time()
    {
        $this->display('Index:out-of-time');
    }
    
    //手机端登录
    public function mobile_login()
    {
        $this->display('Index:mobile-login');
    }
    
    //手机端候选人
    public function mobile_candidates()
    {
        $this->display('Index:mobile-candidates');
    }
    
    //手机端候选人介绍
    public function mobile_intro()
    {
        $this->display('Index:mobile-intro');
    }
    
    //手机端候选人详情
    public function mobile_candidate_detail(){
        $this->display('Index:mobile-candidate-detail');
    }
    
    //操作------------------------------------------------------------------------------------------------------------
    
    //用户登录
    public function withinLogin()
    {
        R('User/withinLogin');
    }
    
    public function outsideLogin()
    {
        R('User/outsideLogin');
    }
    
    //校外注册
    public function outsideRegister()
    {
        R('User/outsideRegister');
    }
    
    //发送邮件验证码
    public function email(){
    	R('Email/email');
    }
    
    //验证码
    public function captcha()
    {
    	R('Captcha/captcha'); 
    }
    
    //myseu验证
    public function validateMYSEU()
    {
        R('ValidateMYSEU/validateMYSEU');
    }

    /*
    public function register(){
    	R('Register/register');
    }

    public function login(){
    	R('Login/login');
    }

    public function ranking(){
        $this->display('Index:ranking');
    }
    
    public function getRank(){
    	R('Rank/getRank');
    }

    public function vote(){
    	R('Vote/vote');
    }
*/
}