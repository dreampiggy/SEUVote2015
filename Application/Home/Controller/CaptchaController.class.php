<?php
namespace Home\Controller;
use Think\Controller;
class CaptchaController extends Controller {
    public function captcha(){
        session_start();
        header("Content-type: image/jpeg"); 
        //创建真彩色白纸 
        $im = @imagecreatetruecolor(60, 25) or die("建立图像失败"); 
        //获取背景颜色 
        $background_color = imagecolorallocate($im, 232, 232, 232); 
        //填充背景颜色(这个东西类似油桶) 
        imagefill($im,0,0,$background_color); 

        //设置字体大小 
        $font_size=15; 

        //设置印上去的文字 
        $Str[0] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
        $Str[1] = "abcdefghijklmnopqrstuvwxyz"; 
        $Str[2] = "01234567891234567890123456"; 

        //获取第1个随机文字 
        $imstr[0]["s"] = $Str[rand(0,2)][rand(0,25)]; 
        $imstr[0]["x"] = rand(2,5); 
        $imstr[0]["y"] = rand(2,7); 

        //获取第2个随机文字 
        $imstr[1]["s"] = $Str[rand(0,2)][rand(0,25)]; 
        $imstr[1]["x"] = $imstr[0]["x"]+$font_size-1+rand(0,2); 
        $imstr[1]["y"] = rand(1,5); 

        //获取第3个随机文字 
        $imstr[2]["s"] = $Str[rand(0,2)][rand(0,25)]; 
        $imstr[2]["x"] = $imstr[1]["x"]+$font_size-1+rand(0,2); 
        $imstr[2]["y"] = rand(1,5); 

        //获取第4个随机文字 
        $imstr[3]["s"] = $Str[rand(0,2)][rand(0,25)]; 
        $imstr[3]["x"] = $imstr[2]["x"]+$font_size-1+rand(0,2); 
        $imstr[3]["y"] = rand(1,5); 

        $_SESSION['validateNum'] = $imstr[0]["s"].$imstr[1]["s"].$imstr[2]["s"].$imstr[3]["s"];
        $_SESSION['validateNum'] = strtolower($_SESSION['validateNum']);
        //写入随机字串
        for ($i=0; $i < 150; $i++) { 
            $p_color = imagecolorallocate($im, rand(0,255), rand(0,255), rand(0,255));
            imagesetpixel($im, rand(1,75), rand(1,25), $p_color);
        }

        for($i=0;$i<4;$i++){ 
            //获取随机较深颜色 
            $text_color = imagecolorallocate($im,rand(0,255),rand(0,255),rand(0,255)); 
            //画文字 
            imagechar($im,$font_size,$imstr[$i]["x"],$imstr[$i]["y"],$imstr[$i]["s"],$text_color); 
        } 

        //显示图片 
        imagejpeg($im); 
        //销毁图片 
        imagedestroy($im); 
    }
}
?>