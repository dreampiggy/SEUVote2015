<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index()
    {
		date_default_timezone_set('prc');
		$my_t=getdate(date("U"));
        
		$check_h = $my_t['hours'];
        /*
		if ($check_h>=7 && $check_h<=22)
        {
            $this->display('Index:pc-index');
		}
        else
        {
            $this->display('Index:404');
		}
        */
		$this->display('Index/pc-index');
    }

    public function register(){
    	R('Register/register');
    }

    public function login(){
    	R('Login/login');
    }

    public function captcha(){
    	R('Captcha/captcha'); 
    }

    public function ranking(){
        $this->display('Index:ranking');
    }
    public function rank(){
    	R('Rank/rank');
    }

    public function validate(){
        R('Validate/validate');
    }

    public function email(){
    	R('Email/email');
    }

    public function vote(){
    	R('Vote/vote');
    }

    public function _empty(){
        $this->display('Index:404');
    }
    
    public function mobile_login(){
        $this->display('Index:mobile-login');
    }
    
    public function mobile_candidates(){
        $this->display('Index:mobile-candidates');
    }
    
    public function mobile_intro(){
        $this->display('Index:mobile-intro');
    }
    
    public function mobile_candidate_detail(){
        $this->display('Index:mobile-candidate-detail');
    }
}