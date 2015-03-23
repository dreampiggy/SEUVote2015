<?php
namespace Home\Controller;
use Think\Controller;
class CheckController extends Controller {
    public function check(){
		date_default_timezone_set('prc');
		$my_t=getdate(date("U"));
		$check_h = $my_t['hours'];
		$ret ='x';
		if ($check_h>=0 && $check_h<=22) {
			$ret = "x";
		} else {
			$ret = "cannot.html";
		}
		echo $ret;
	}
}
?>
