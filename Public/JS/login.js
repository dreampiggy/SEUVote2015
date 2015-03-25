var form_container=$("#form_container");

var lb_within_school_login=$("#lb_within_school_login");
var lb_outside_school_register=$("#lb_outside_school_register");
var lb_outside_school_login=$("#lb_outside_school_login");

var within_school_login_form=$("#within_school_login_form");
within_school_login_form.isShown=false;
within_school_login_form.lb=lb_within_school_login;
var outside_school_register_form=$("#outside_school_register_form");
outside_school_register_form.isShown=false;
outside_school_register_form.lb=lb_outside_school_register;
var outside_school_login_form=$("#outside_school_login_form");
outside_school_login_form.isShown=false;
outside_school_login_form.lb=lb_outside_school_login;

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