const gravity=2;
const bird=document.getElementById('bird');
let birdTop=310;
let birdLeft=50;
let gamespeed=3;
let isGameover=true;
let gameInterval=null;
let prevScore=0;
const scoreBoard=document.getElementById('score');
const pipes=document.querySelectorAll('.pipe');
const pipes1=document.querySelectorAll('.pipe1');
let score=0;
const scoreCard=document.getElementById('scoreCard');
const gameOverBox=document.getElementById('gameOverBox');
const restartBtn=document.getElementById('restart-btn');
const instructions=document.getElementById('instructions');
const startButton=document.getElementById('startbtn');

function resetPipes(){
    pipes.forEach((pipe, index) => {
        pipe.style.left = (500 + index * 400) + 'px'; // Spread the pipes horizontally
    });
    pipes1.forEach((pipe, index) => {
        pipe.style.left = (500 + index * 400) + 'px'; // Spread the pipes horizontally
    });
}

window.onload =()=>{
    startButton.addEventListener('click', startGame);
    restartBtn.addEventListener('click', restartGame);
    instructions.style.display = "block";  
    gameOverBox.style.display = "none";
    displayInstructions(); 
}

function startGame(){
    instructions.style.display="none";
    gameOverBox.style.display='none';
    resetPipes();
    gamespeed=3;
    birdTop=310;
    birdLeft=50;
    isGameover=false;
    bird.style.top=birdTop+"px";
    bird.style.left=birdLeft+"px";
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    gameInterval=setInterval(()=>{
        if(!isGameover){
            changeBirdTop();
            pipeMovement();
        }
        else{
            clearInterval(gameInterval);
        }
    },30);
    document.addEventListener('keydown',jump);

}

function changeBirdTop(){
    birdTop+=gravity;
    bird.style.top=birdTop+"px";
    checkCollision();
}

function jump(event){
    if(isGameover){
        return;
    }
    if(event.code==='Space' || event.key===' '){
        birdTop-=23;
        bird.style.top=birdTop+'px';
    }
}

function pipeMovement(){
    pipes.forEach((pipe)=>{
        let pipeleft=parseInt(pipe.style.left);
        if(pipeleft>-60){
            pipe.style.left=(pipeleft-gamespeed)+"px";
        }
        else{
            pipe.style.left="1200px";
            if (birdLeft > pipeleft + pipe.clientWidth) {
                score++;
                displayScore(); // Update score display
            }
        }
    })
    pipes1.forEach((pipe)=>{
        let pipeleft=parseInt(pipe.style.left);
        if(pipeleft>-60){
            pipe.style.left=(pipeleft-gamespeed)+"px";
        }
        else{
            pipe.style.left="1200px";
            if (birdLeft > pipeleft + pipe.clientWidth) {
                score++;
                displayScore(); 
                if(score % 5 === 0 && score !== prevScore){ // Increase speed every 5 points
                    prevScore = score;
                    if(gamespeed < 10) { // Cap the speed at 10
                        gamespeed += 0.5; 
                    }
                }
            }
        }
    })
}

function checkCollision(){
    let birdBottom=birdTop+bird.clientHeight;
    if(birdBottom>=window.innerHeight){
        gameover();
        return;
    }
    pipes.forEach((pipe)=>{
        let pipeLeft=parseInt(pipe.style.left);
        if(birdLeft+bird.clientWidth>pipeLeft && birdTop<pipe.clientHeight){
            gameover();
        }
    
    });
    pipes1.forEach((pipe)=>{
        let pipeLeft=parseInt(pipe.style.left);
        if(birdLeft+bird.clientWidth>pipeLeft && birdBottom>window.innerHeight-pipe.clientHeight){
            gameover();
        }
        
    });
    
}

function displayScore(){
    scoreBoard.textContent="Score: " + score/2;
}

function gameover(){
    isGameover=true;
    // alert("Game over! Click ok to restart");
    displayGameBoard();
}

function displayGameBoard(){
    scoreCard.textContent=`Score: ${score/2}`;
    gameOverBox.style.display="block";
    restartBtn.addEventListener('click',()=>{

        
    })
}

function restartGame(){
    score=0;
        displayScore();
        resetPipes();
        gameOverBox.style.display="none";
        displayInstructions();
}

function displayInstructions(){
    gameOverBox.style.display="none";
    instructions.style.display="block";
}