<?php
return array(
    'DB_TYPE'   => 'mysql', // 数据库类型
    'DB_HOST'   => 'localhost', // 服务器地址
    'DB_NAME'   => 'vote', // 数据库名
    'DB_USER'   => 'root', // 用户名
    'DB_PWD'    => '123', // 密码
    'DB_PORT'   => 3306, // 端口
    'DB_PREFIX' => '', // 数据库表前缀
    'DB_CHARSET' =>    'utf8',
    'DB_FIELDS_CACHE'=> false, //调试用
    'DB_DEBUG'    =>    false,
    'SHOW_PAGE_TRACE' => false, //显示页面调试明细


    //邮件配置
    'THINK_EMAIL' => array(
        'SMTP_HOST'   => 'smtp.xx.com', //SMTP服务器
        'SMTP_PORT'   => '25', //SMTP服务器端口
        'SMTP_USER'   => 'xxxxxx@xx.com', //SMTP服务器用户名
        'SMTP_PASS'   => 'xxxxxx', //SMTP服务器密码
        'FROM_EMAIL'  => 'xxxxxx@xx.com', //发件人EMAIL
        'FROM_NAME'   => '东南大学最有影响力毕业生', //发件人名称
        'REPLY_EMAIL' => '', //回复EMAIL（留空则为发件人EMAIL）
        'REPLY_NAME'  => '', //回复名称（留空则为发件人名称）
    ),
);