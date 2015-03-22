<?php
date_default_timezone_set('prc');
$my_t=getdate(date("U"));
$check_h = $my_t['hours'];
if ($check_h>=7 && $check_h<=22) {
	header("Location: vote.html");
} else {
	header("Location: vote.html");
}
?>
