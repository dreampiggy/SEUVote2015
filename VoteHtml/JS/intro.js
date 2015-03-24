var introduction_btn=$("#introduction_btn");
var voting_rules_btn=$("#voting_rules_btn");
var ranking_rules_btn=$("#ranking_rules_btn");

var introduction_detail=$("#introduction_detail");
introduction_detail.isShown=false;
var voting_rules_detail=$("#voting_rules_detail");
voting_rules_detail.isShown=false;
var ranking_rules_detail=$("#ranking_rules_detail");
ranking_rules_detail.isShown=false;

var intro_details={
    introduction_detail:introduction_detail,
    voting_rules_detail:voting_rules_detail,
    ranking_rules_detail:ranking_rules_detail
}

var intro_palying=false;

function callupIntro(name)
{
    var foundShown=false;
    for (dtl in intro_details)
    {
        if(intro_details[dtl].isShown==true)
        {
            if(dtl!=name)
            {
                if(!intro_palying)
                {
                    intro_palying=true;
                    intro_details[dtl].slideUp(function(){
                        intro_details[dtl].isShown=false;
                        intro_details[name].slideDown(function(){
                            intro_details[name].isShown=true;
                            intro_palying=false;
                        });
                    });
                    foundShown=true;
                }
                break;
            }
            else
            {
                if(!intro_palying)
                {
                    intro_palying=true;
                    intro_details[name].slideUp(function(){
                        intro_details[name].isShown=false;
                        intro_palying=false;
                    });
                    foundShown=true;
                }
            }
        }
    }
    if(!foundShown)
    {
        if(!intro_palying)
        {
            intro_palying=true;
            intro_details[name].slideDown(function(){
                intro_details[name].isShown=true;
                intro_palying=false;
            });
        }
    }
}