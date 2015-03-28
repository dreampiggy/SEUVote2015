var within_school_login_card=document.getElementById("within_school_login_card");
within_school_login_card.vallidation_func=function(){
    if(within_school_login_card.value!="")
    {
        return true;
    }
}
within_school_login_card.error_info="一卡通号格式错误";

var within_school_login_password=document.getElementById("within_school_login_password");
within_school_login_password.vallidation_func=function(){
    if(within_school_login_password.value!="")
    {
        return true;
    }
}
within_school_login_password.error_info="密码错误";

var within_school_login_captcha=document.getElementById("within_school_login_captcha");
within_school_login_captcha.vallidation_func=function(){
    if(within_school_login_captcha.value!="")
    {
        return true;
    }
}
within_school_login_captcha.error_info="验证码错误";

var within_school_login={
    within_school_login_card: within_school_login_card,
    within_school_login_password: within_school_login_password,
    within_school_login_captcha: within_school_login_captcha
}

var alert_within_school_login_form=$("#alert_within_school_login_form");
var alert_txt_within_school_login_form=document.getElementById("alert_txt_within_school_login_form");

var submit_within_school_login_form=$("#submit_within_school_login_form");

alert_within_school_login_form.click(function(){
    alert_within_school_login_form.slideUp();
});

submit_within_school_login_form.click(function(){
    onSubmit("within_school_login_form");
});

//
var outside_school_register_email=document.getElementById("outside_school_register_email");
outside_school_register_email.vallidation_func=function(){
    if(outside_school_register_email.value!="")
    {
        return true;
    }
}
outside_school_register_email.error_info="电子邮件格式错误";

var outside_school_register_email_psw=document.getElementById("outside_school_register_email_psw");
outside_school_register_email_psw.vallidation_func=function(){
    if(outside_school_register_email_psw.value!="")
    {
        return true;
    }
}
outside_school_register_email_psw.error_info="邮件验证码错误";

var outside_school_register_password=document.getElementById("outside_school_register_password");
outside_school_register_password.vallidation_func=function(){
    if(outside_school_register_password.value!="")
    {
        return true;
    }
}
outside_school_register_password.error_info="密码格式错误";

var outside_school_register_repassword=document.getElementById("outside_school_register_repassword");
outside_school_register_repassword.vallidation_func=function(){
    if(outside_school_register_repassword.value!=outside_school_register_password.value)
    {
        return false;
    }
    else
    {
        return true;
    }
}
outside_school_register_repassword.error_info="密码重复与密码输入不同";

var outside_school_register={
    outside_school_register_email: outside_school_register_email,
    outside_school_register_email_psw: outside_school_register_email_psw,
    outside_school_register_password: outside_school_register_password,
    outside_school_register_repassword: outside_school_register_repassword
}

var alert_outside_school_register_form=$("#alert_outside_school_register_form");
var alert_txt_outside_school_register_form=document.getElementById("alert_txt_outside_school_register_form");

var submit_outside_school_register=$("#submit_outside_school_register");

alert_outside_school_register_form.click(function(){
    alert_outside_school_register_form.slideUp();
});

submit_outside_school_register.click(function(){
    onSubmit("outside_school_register_form");
});

//
var outside_school_login_email=document.getElementById("outside_school_login_email");
outside_school_login_email.vallidation_func=function(){
    if(outside_school_login_email.value!="")
    {
        return true;
    }
}
outside_school_login_email.error_info="电子邮件格式错误";

var outside_school_login_password=document.getElementById("outside_school_login_password");
outside_school_login_password.vallidation_func=function(){
    if(outside_school_login_password.value!="")
    {
        return true;
    }
}
outside_school_login_password.error_info="密码错误";

var outside_school_login_captcha=document.getElementById("outside_school_login_captcha");
outside_school_login_captcha.vallidation_func=function(){
    if(outside_school_login_captcha.value!="")
    {
        return true;
    }
}
outside_school_login_captcha.error_info="验证码错误";

var outside_school_login={
    outside_school_login_email: outside_school_login_email,
    outside_school_login_password: outside_school_login_password,
    outside_school_login_captcha: outside_school_login_captcha
}

var alert_outside_school_login_form=$("#alert_outside_school_login_form");
var alert_txt_outside_school_login_form=document.getElementById("alert_txt_outside_school_login_form");

var submit_outside_school_login=$("#submit_outside_school_login");

alert_outside_school_login_form.click(function(){
    alert_outside_school_login_form.slideUp();
});

submit_outside_school_login.click(function(){
    onSubmit("outside_school_login_form");
});

//
var form_container=$("#form_container");

var lb_within_school_login=$("#lb_within_school_login");
var lb_outside_school_register=$("#lb_outside_school_register");
var lb_outside_school_login=$("#lb_outside_school_login");

var within_school_login_form=$("#within_school_login_form");
within_school_login_form.isShown=false;
within_school_login_form.lb=lb_within_school_login;
within_school_login_form.alt=alert_within_school_login_form;
within_school_login_form.alt.txt=alert_txt_within_school_login_form;
within_school_login_form.inputs=within_school_login;

var outside_school_register_form=$("#outside_school_register_form");
outside_school_register_form.isShown=false;
outside_school_register_form.lb=lb_outside_school_register;
outside_school_register_form.alt=alert_outside_school_register_form;
outside_school_register_form.alt.txt=alert_txt_outside_school_register_form;
outside_school_register_form.inputs=outside_school_register;

var outside_school_login_form=$("#outside_school_login_form");
outside_school_login_form.isShown=false;
outside_school_login_form.lb=lb_outside_school_login;
outside_school_login_form.alt=alert_outside_school_login_form;
outside_school_login_form.alt.txt=alert_txt_outside_school_login_form;
outside_school_login_form.inputs=outside_school_login;

var forms_shown={
    within_school_login_form: within_school_login_form,
    outside_school_register_form: outside_school_register_form,
    outside_school_login_form: outside_school_login_form
}

var isFormUp=false;

var form_playing=false;

var cancle_btn=$(".cancle_btn");

$("#lb_within_school_login").click(function(){
    if(!form_playing)
    {
        callupForm("within_school_login_form");
    }
});
$("#lb_outside_school_register").click(function(){
    if(!form_playing)
    {
        callupForm("outside_school_register_form");
    }
});
$("#lb_outside_school_login").click(function(){
    if(!form_playing)
    {
        callupForm("outside_school_login_form");
    }
});

cancle_btn.click(function(){
    hideLoginForm();
});

function showLoginForm()
{
    if(!isFormUp)
    {
        form_container.slideDown(function(){
            if(!form_playing)
            {
                form_playing=true;
                forms_shown["within_school_login_form"].slideDown(function(){
                    forms_shown["within_school_login_form"].isShown=true;
                    forms_shown["within_school_login_form"].lb.addClass("active");
                    isFormUp=true;
                    form_playing=false;
                });
            }
        });
    }
}

function hideLoginForm()
{
    for (form in forms_shown)
    {
        if(forms_shown[form].isShown==true)
        {
            forms_shown[form].lb.removeClass("active");
            if(!form_playing)
            {
                form_playing=true;
                forms_shown[form].slideUp(function(){
                    forms_shown[form].isShown=false;
                    form_container.slideUp(function(){
                        isFormUp=false;
                        form_playing=false;
                    });
                });
            }
            break;
        }
    }
}

function callupForm(name)
{
    for (form in forms_shown)
    {
        if(forms_shown[form].isShown==true)
        {
            if(form!=name)
            {
                if(!form_playing)
                {
                    form_playing=true;
                    forms_shown[form].lb.removeClass("active");
                    forms_shown[form].slideUp(function(){
                        forms_shown[form].isShown=false;
                        forms_shown[name].slideDown(function(){
                            forms_shown[name].lb.addClass("active");
                            forms_shown[name].isShown=true;
                            form_playing=false;
                        });
                    });
                }
                break;
            }
        }
    }
}

function triggerAlert(fm,txt)
{
    forms_shown[fm].alt.slideDown(function(){
        forms_shown[fm].alt.txt.innerHTML=txt;
    });
}

function onSubmit(fm)
{
    error_detected=false;
    for (input in forms_shown[fm].inputs)
    {
        var err=!forms_shown[fm].inputs[input].vallidation_func();
        if(err)
        {
            error_detected=true;
            triggerAlert(fm,forms_shown[fm].inputs[input].error_info);
        }
        if(error_detected)
        {
            break;
        }
    }
    if(!error_detected)
    {
        for (input in forms_shown[fm].inputs)
        {
            alert(forms_shown[fm].inputs[input].value);
        }
    }
}