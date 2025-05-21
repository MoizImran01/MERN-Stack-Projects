var stopAnimation = false;
var gameOver = false;
var pattern = [];
var clicked = [];
var level = 0;
var randomnumber = Math.floor(Math.random() * 4) + 1;


function headingAnimation() {
    $("h1").fadeOut().fadeIn(function() 
    {
        if (!stopAnimation) 
        {
            setTimeout(headingAnimation, 300); 
        }
    });
}


headingAnimation();


$(document).on("keypress", function () {
    stopAnimation = true;
    startGame();

});
function startGame()
{
    $("h1").text("Level " + level);
    var audio = new Audio("Sounds/pattern.mp3");
    audio.play();
    randomnumber = Math.floor(Math.random() * 4) + 1;
    switch (randomnumber)
    {
            case 1:
            $("#1").animate({opacity : 0.2}).animate({opacity: 1});
            break;
            case 2:
            $("#2").animate({opacity : 0.2}).animate({opacity: 1});
            break;
            case 3:
            $("#3").animate({opacity : 0.2}).animate({opacity: 1});
            break;
            case 4:
            $("#4").animate({opacity : 0.2}).animate({opacity: 1});
            break;
            
    }
    pattern.push(randomnumber);
}

function Over()
{
    $("h1").text("Game Over. Press Any Key to Continue");
    var audio1 = new Audio("Sounds/gameover.mp3");
    audio1.play();
gameOver = false;
pattern = [];
clicked = [];
level = 0;
$("body").addClass("end");
setTimeout(function (){

    $("body").removeClass("end");


},100);



}

function newPattern()
{
    clicked = [];
    randomnumber = Math.floor(Math.random() * 4) + 1;
    pattern.push(randomnumber);
    var audio = new Audio("Sounds/pattern.mp3");
    audio.play();
    switch (randomnumber)
    {
            case 1:
            $("#1").animate({opacity : 0.2}).animate({opacity: 1});
            break;
            case 2:
            $("#2").animate({opacity : 0.2}).animate({opacity: 1});
            break;
            case 3:
            $("#3").animate({opacity : 0.2}).animate({opacity: 1});
            break;
            case 4:
            $("#4").animate({opacity : 0.2}).animate({opacity: 1});
            break;
            
    }


}

function check(index)
{
    if(String(pattern[index]) === clicked[index])
        
        {
            if(pattern.length === clicked.length)
                {
                    level++;
                    $("h1").text("Level " + level);
                    setTimeout(function() {
                        newPattern();
                    }, 500);
                }
        }
  else
  {
    Over();
  }

}

$("button").on("click", function ()
{
    clicked.push($(this).attr("id"));
    check(clicked.length-1);

});
