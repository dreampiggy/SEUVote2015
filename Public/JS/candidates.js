/**
*候选人相关javascript
by Jason
*/
var MAX_CHOSEN=15;//最大可投票数

//GET候选者总表
$.get("public/RESORCE/json/introduction.json",function(candidates,result){
    if(result=="success")
    {
        reArrangeArray(candidates);
        initilize_candidates(candidates);
    }
});

/**
 * @param {Array} arr
 by WuTao, tks!
 对候选者总表进行随机打乱重排
 */
function reArrangeArray(arr) {
	if (!(arr instanceof Array)) {
		console.error("Parameter wrong : {" + arr + "} is not an Array");
		return null;
	};

	var tmp, index;
	for (var i=1; i<arr.length; i++) {
		
		index = Math.floor( Math.random() * arr.length ) % i; 
		
		tmp = arr[index];
		arr[index] = arr[i];
		arr[i] = tmp;
	};
    
	return arr;
}

var vote_completed=false;//是否完成投票

var candidates_arr=new Array();//打乱后的候选者总表
var voteArr=new Array();//被选中者列表

var details_shown=new Array();//某行的候选者详情是否展开

var candidates_container=$("#candidates_container");//候选者列表container

var submit_vote_btn_container=$("#submit_vote_btn_container");//确认投票按钮container

var submit_affirm_captcha_display=document.getElementById("submit_affirm_captcha_display");//确认投票验证码
submit_affirm_captcha_display.onclick=function(){
    submit_affirm_captcha_display.src='/captcha';
}
var submit_affirm_captcha_input=document.getElementById("submit_affirm_captcha_input");////确认投票验证码输入框

var submit_vote_btn=$("#submit_vote_btn");//投票按钮
submit_vote_btn.click(function(){
    submit_affirm.slideDown(function(){
            submit_vote_btn_container.slideUp();
            voted_list_txt="";
            for(var i=0;i<MAX_CHOSEN;i++)
            {
                voted_list_txt+=(i+1+"."+voteArr[i].realname+"&nbsp;"+voteArr[i].studentNumber+"<br>");
            }
        voted_list.innerHTML=voted_list_txt;
        submit_affirm_captcha_display.src='/captcha';
    });
});

var submit_affirm=$("#submit_affirm");//确认投票对话框
var submit_vote_confirmed=$("#submit_vote_confirmed");//确认提交选票按钮
submit_vote_confirmed.click(function(){
    voteSumbit();
});
var submit_vote_cancel=$("#submit_vote_cancel");//取消提交按钮
submit_vote_cancel.click(function(){
    submit_affirm.slideUp(function(){
        submit_vote_btn_container.slideDown();
    });
});

var voted_list=document.getElementById("voted_list");//被选者清单，位于确认投票对话框
var voted_list_txt="";//被选者清单文字

var voted_num=document.getElementById("voted_num");//顶栏中已选中数目
var voted_counter=0;//选中数目计数器

//以姓名搜素，仅能以全名匹配----------------------------------------------------------------------------------------------
var search_by_name=$("#search_by_name");
var search_by_name_input=document.getElementById("search_by_name_input");
                
search_by_name.click(function(){
    cleanStyleButtonChosen();
    var selected_candidates_arr=new Array();
    for(var i=0;i<candidates_arr.length;i++)
    {
        if(candidates_arr[i].realname==search_by_name_input.value)
            selected_candidates_arr.push(candidates_arr[i]);
    }
    outputCandidates(selected_candidates_arr);
    checkAllChosen();
});

//以类型搜素-----------------------------------------------------------------------------------------------------------
var type_btn_0=$("#type_btn_0");
type_btn_0.click(function(){
    cleanStyleButtonChosen();
    search_by_name_input.value="";
    outputCandidates(candidates_arr);
    type_btn_0.addClass("btn-primary");
    checkAllChosen();
});

var type_btn_1=$("#type_btn_1");
type_btn_1.click(function(){selectCandidatesByStyle(type_btn_1,"学术影响力")});
var type_btn_2=$("#type_btn_2");
type_btn_2.click(function(){selectCandidatesByStyle(type_btn_2,"创业影响力")});
var type_btn_3=$("#type_btn_3");
type_btn_3.click(function(){selectCandidatesByStyle(type_btn_3,"道德影响力")});
var type_btn_4=$("#type_btn_4");
type_btn_4.click(function(){selectCandidatesByStyle(type_btn_4,"公益影响力")});
var type_btn_5=$("#type_btn_5");
type_btn_5.click(function(){selectCandidatesByStyle(type_btn_5,"自强影响力")});
var type_btn_6=$("#type_btn_6");
type_btn_6.click(function(){selectCandidatesByStyle(type_btn_6,"正义影响力")});
var type_btn_7=$("#type_btn_7");
type_btn_7.click(function(){selectCandidatesByStyle(type_btn_7,"领袖影响力")});
var type_btn_8=$("#type_btn_8");
type_btn_8.click(function(){selectCandidatesByStyle(type_btn_8,"文体影响力")});
var type_btn_9=$("#type_btn_9");
type_btn_9.click(function(){selectCandidatesByStyle(type_btn_9,"其他")});

function selectCandidatesByStyle(btn,stl)
{
    cleanStyleButtonChosen();
    search_by_name_input.value="";
    var selected_candidates_arr=new Array();
    for(var i=0;i<candidates_arr.length;i++)
    {
        if(candidates_arr[i].style==stl)
            selected_candidates_arr.push(candidates_arr[i]);
    }
    outputCandidates(selected_candidates_arr);
    btn.addClass("btn-primary");
    checkAllChosen();
}

//当进行搜索时移除原有列表内容及效果
function cleanStyleButtonChosen()
{
    candidates_container.empty();
    submit_vote_btn_container.slideUp();
    submit_affirm.slideUp();
    for(var i=0;i<10;i++)
    {
        $("#type_btn_"+i).removeClass("btn-primary");
    }
}

//判断是否已选满候选人
function checkAllChosen()
{
    if(voted_counter==MAX_CHOSEN)
    {
        submit_vote_btn_container.slideDown();
    }
}

var vote_running=false;

var alert_submit_affirm_captcha=$("#alert_submit_affirm_captcha");//确认提交验证码的alert，兼做正在提交的提示
alert_submit_affirm_captcha.click(function(){
    alert_submit_affirm_captcha.slideUp();
})
var alert_txt_submit_affirm_captcha=document.getElementById("alert_txt_submit_affirm_captcha");

//触发alert
function triggerSubmitAffirmCaptchaAlert(txt)
{
    alert_submit_affirm_captcha.slideDown(function(){
        alert_txt_submit_affirm_captcha.innerHTML=txt;
    });
}

//触发提交完成
function triggerSubmitComplete()
{
    alert_txt_submit_affirm_captcha.innerHTML="";
    alert_submit_affirm_captcha.slideUp();
}

//提交选票事件----------------------------------------------------------------------------------------------------------
function voteSumbit()
{
    if(voteArr.length!=MAX_CHOSEN)
    {
        alert("请选满15位候选人");
    }
    else
    {
        if(vote_running)
        {
            alert("请等待上一操作完成");
        }
        else
        {
            vote_running=true;
            triggerSubmitAffirmCaptchaAlert("正在进行操作");
            var post_arr=new Array();
            for(var i=0;i<MAX_CHOSEN;i++)
            {
                post_arr.push(voteArr[i].studentNumber);
            }
            var post_json=JSON.stringify(post_arr);
            var post_str=
                "voteArray="+post_json+
                "&postValidateNum="+submit_affirm_captcha_input.value;
            $.post("/vote",post_str,function(data,status){
                if(status=="success")
                {
                    vote_running=false;
                    triggerSubmitComplete();
                    switch(data)
                    {
                        case "1":
                            triggerVoteSubmitSuccess();
                            break;
                        case "2":
                            triggerSubmitAffirmCaptchaAlert("请先登录再进行投票");
                            submit_affirm_captcha_input.value="";
                            submit_affirm_captcha_display.src='/captcha';
                            break;
                        case "3":
                            triggerSubmitAffirmCaptchaAlert("请诚信投票");
                            submit_affirm_captcha_input.value="";
                            submit_affirm_captcha_display.src='/captcha';
                            break;
                        case "4":
                            triggerSubmitAffirmCaptchaAlert("验证码错误");
                            submit_affirm_captcha_input.value="";
                            submit_affirm_captcha_display.src='/captcha';
                            break;
                        case "5":
                            triggerSubmitAffirmCaptchaAlert("同一IP两次投票的间隔不能小于30分钟");
                            submit_affirm_captcha_input.value="";
                            submit_affirm_captcha_display.src='/captcha';
                            break;
                        case "6":
                            triggerSubmitAffirmCaptchaAlert("您今天已投过票");
                            submit_affirm_captcha_input.value="";
                            submit_affirm_captcha_display.src='/captcha';
                            break;
                        case "7":
                            triggerSubmitAffirmCaptchaAlert("系统故障");
                            submit_affirm_captcha_input.value="";
                            submit_affirm_captcha_display.src='/captcha';
                            break;
                        case "8":
                            triggerSubmitAffirmCaptchaAlert("系统故障");
                            submit_affirm_captcha_input.value="";
                            submit_affirm_captcha_display.src='/captcha';
                            break;
                    }
                }
            });
        }
    }
}