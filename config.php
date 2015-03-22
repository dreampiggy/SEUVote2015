<?php
const database_ip = 'localhost';
const database_user = 'root';
const database_pwd = '123';
//Define the database connect
$con = mysql_connect(database_ip,database_user,database_pwd);
if (!$con){
	die('Could not connect: ' . mysql_error());
}
mysql_query("SET NAMES UTF8");
mysql_select_db("vote", $con);