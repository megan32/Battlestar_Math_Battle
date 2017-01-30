
var playing = false;
var scoreValue;
var action;
var timeRemaining;
var correctAnswer;


show("startGame");
document.getElementById("launch").style.boxShadow ="0 0 20px 20px #0074a9";

document.getElementById("launch").onclick=
  function(){
    //remove start pop-up
    if(playing == true){
      location.reload;
    } else {

     playing = true; //re-assign to true

      document.getElementById("launch").style.boxShadow ="none";
      hide("startGame");
    //reset score
    score = 0;
      document.getElementById("scoreValue").innerHTML = score;


    //set timer
    show("timer");
    timer = 60;
    document.getElementById("timeRemaining").innerHTML = timer;

    hide("gameOver");

    countDown();

    generateQandA();
 }

  }


//choosing a question
for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
    //check if we are playing
    if(playing == true){//yes
        if(this.innerHTML == correctAnswer){
        //correct answer

            //increase score by 1
            score++;
            document.getElementById("scoreValue").innerHTML = score;
            //hide Wrong box and show correct box
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");
            }, 1000);

            //Generate new Q&A

            generateQandA();
        }else{
        //Wrong answer
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");
            }, 1000);
        }
    }
}
}


//making random math questions
function generateQandA(){
 var x = 1 + Math.round(9*Math.random());
 var y = 1 + Math.round(9*Math.random());
 correctAnswer = x*y;
 document.getElementById("equation").innerHTML = x + "x" + y;
 var correctPosition = 1+ Math.round(3*Math.random());
 document.getElementById("box" + correctPosition).innerHTML = correctAnswer; //fill random box w/ answer

//fill others with Wrong answers
 var answers = [correctAnswer];

 for(i=1; i<5; i++){
     if(i != correctPosition) {
         var wrongAnswer;
         do{
             wrongAnswer = (1+ Math.round(9*Math.random()))*(1+ Math.round(9*Math.random())); //a Wrong answer
         }while(answers.indexOf(wrongAnswer)>-1)
         document.getElementById("box"+i).innerHTML = wrongAnswer;
         answers.push(wrongAnswer);
     }
 }
}



function hide(Id){
  document.getElementById(Id).style.display = "none";
  //tell display to read "none";
}

function show(Id){
  document.getElementById(Id).style.display = "block";
  //keep display from reading "none";
}


function countDown(){
action =  setInterval(function(){
    timer -=1;
    document.getElementById("timeRemaining").innerHTML = timer;
    if(timer == 0) {
      stopCountdown();
      hide("timer");
      show("gameOver");
      hide("correct");
      hide("wrong");
      document.getElementById("launch").style.boxShadow ="0 0 20px 20px #0074a9";
      playing = false;
      document.getElementById("gameOver").innerHTML = "<p> You killed: " + score + " Cylons. </br> </br> click 'Re-launch' to play again. </p>";
}
      }, 1000);

}

function stopCountdown(){
  clearInterval(action);
}
