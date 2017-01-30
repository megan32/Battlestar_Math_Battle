
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
            bgQuote();
        }else{
        //Wrong answer
            hide("correct");
            show("wrong");
            cylonQuote();
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

var bgArr = [
"Commander Adama: It smells like a trap. It feels like a trap. I believe it is a trap.",  
"Commander Adama: You have the tongue of an angel and the soul of a serpent.", 
"Captain Kara 'Starbuck' Thrace: Nothing but the rain.", 
"Admiral William Adama: Grab your gun and bring in the cat.",
"Captain Lee 'Apollo' Adama: Never could read your handwriting.",
"Captain Lee 'Apollo' Adama: Steady as she goes. Take us right into the center. ",
"Colonel Tigh: Quite simply, an overdose of pleasure.", 
"Col. Tigh: The void? Adama, there are probably as many voids in the universe as there are ideas.", 
"Adama: “Sometimes, you have to roll a hard six.",
"Starbuck: Frak me."
];

var cyArr = [
'Baltar: It was a mistake! I meant no harm. Adama, the Lords are with you. Use your power. Get us out of here!',

'Number Six: The one human flaw that you spend your lifetimes distressing over… Mortality is the one thing… Well, it’s the one thing that makes you whole.',

'Gaius Baltar: It’s all so pointless. We kill them, and they kill us, so we kill more of them, so they kill more of us. What’s the point anymore?',

'Number Six: Oh, come on, it is spectacular.',

'Number Six: It didn\'t frakkin\' happen.',

'Number Five: I can\'t understand how he was discovered. I heard it was Dr. Baltar.',

'Virtual Baltar: But the question remains, does all of this have to happen again?',

'Cavil: Frak!',

'Number Eight: Too much confusion.',

'Number One: In all your travels, have you ever seen a star go supernova?',

'Ellen Tigh: The five of us designed you to be as human as possible.'
];




//quote Generator BG side
function bgQuote(){
  var randomNum = Math.floor(Math.random()*(bgArr.length));
  document.getElementById("quoteLocale").innerHTML = bgArr[randomNum];
}
//quote Generator Cylon side
function cylonQuote(){
  var randomNum = Math.floor(Math.random()*(cyArr.length));
  document.getElementById("quoteLocale").innerHTML = cyArr[randomNum]
}

/*function quoteBattle(score){
  if(score % 2 === 0){
    docuemnt.getElementById("quoteLocale").innerHTML = bgArr();
  } else if (score % 2 !== 0){
   docuemnt.getElementById("quoteLocale").innerHTML = cylonQuote();
  }
}
*/
