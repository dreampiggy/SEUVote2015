<?php
namespace Home\Controller;
use Think\Controller;
class TestController extends Controller {
    public function test(){
        //"TMD真的是匹配正则，没发邮件",我到时候要一个SMTP服务器，用TP的Email函数发
        echo "<center><br/>检查电子邮件地址的正确性:<br/>"; 
        require("email_validation.php"); 
        $newmail = "283285993@qq.com"; 
        $validator=new email_validation_class; 
        $validator->timeout=10; 
         
        //if(IsSet($newemail) && strcmp($newemail,"")){
        if( ($result=$validator->ValidateEmailBox($newmail) )<0){ 
            echo "不能确定您的信箱是否正确. 您的信箱离这里太远了吧?<br/>"; 
            return; 
        }else{ 
                echo "22222222";
            if(!$result){ 
                echo "您输入的信箱地址是不正确的! :)<br/>"; 
                return; 
            }else{
                echo "邮箱合法!<br/>"; 
            } 
        }
    }
}
?>
