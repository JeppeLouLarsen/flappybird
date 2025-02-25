
let bodyWidth = window.innerWidth
let bodyHeight = window.innerHeight

let board;
let boardWidth = bodyWidth
let boardHeight = bodyHeight
let context;

let birdWidth = 50;
let birdHeight = 45;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

let gameOver = false;
let score = 0;

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
}


let pipeArray = [];
let pipeWidth = 75;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

let hastighetY = 0;
let hastighetX = -3;
let gravitasjon = 0.4
let speedIncrease = 0.0005

let gameHeight = 300
let gameWidth = 300
let gameY = (boardHeight-gameHeight)/2;
let gameX = (boardWidth-gameWidth)/2;

let game = {
    x: gameX,
    y: gameY,
    width: gameWidth,
    height: gameHeight
}

let highScore = 0


let lastPipeX = boardWidth;
let pipeSpacing = 250; 



window.onload = function () {

    document.addEventListener("keydown", moveBird);


    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");


    birdImg = new Image();
    birdImg.src = "bilder/flappybird.gif";
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "bilder/toppipe.png";


    bottomPipeImg = new Image();
    bottomPipeImg.src = "bilder/bottompipe.png"

    gameImg = new Image();
    gameImg.src = "bilder/gameover.png";


    requestAnimationFrame(oppdater);
    

}

function oppdater() {
    requestAnimationFrame(oppdater);

    if (gameOver) {
        return;
    }


    context.clearRect(0, 0, board.width, board.height);

    hastighetX -= speedIncrease;




    hastighetY += gravitasjon
    bird.y = bird.y + hastighetY
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y < 0) {
        gameOver = true;
    }

    if (bird.y > window.innerHeight) {
        gameOver = true;
    }


    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += hastighetX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (kollisjon(bird, pipe)) {
            gameOver = true;
        }

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5;
            pipe.passed = true;
        }

        if (gameOver) {

            context.fillStyle = "yellow"
            context.fillText("Score:", 525, 400);
            context.fillText(score, 725, 400);


            context.fillStyle = "red";
            context.fillText("Restart", 535, 450);

            context.drawImage(gameImg, game.x, game.y, game.width, game.height );

            addNewScore();

            drawHighScore();

        }


    }

    if (pipeArray.length === 0 || boardWidth - pipeArray[pipeArray.length - 1].x > pipeSpacing) {
        placePipes();
      }

    

    context.fillStyle = "yellow";
    context.font = "30px 'Press Start 2P', sans-serif";
    context.fillText(score, 5, 45);
    context.fillText("High Score:", 850, 45);
    context.fillText(highScore, 1185, 45);
    


}

function placePipes() {

    if (gameOver) {
        return;
    }


    let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
    let åpning = board.height / 4;

    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false

    }

    pipeArray.push(topPipe);

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + åpning,
        width: pipeWidth,
        height: pipeHeight,
        passed: false

    }

    pipeArray.push(bottomPipe);

}


function moveBird(trykk) {
    if (trykk.code === "Space") {
        hastighetY = -6;
    }
}

function kollisjon(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

function addNewScore(){
    let newScore = score
    if(newScore > highScore){
        highScore = newScore
    }
}

function drawHighScore(){
    context.fillText(highScore, 1185, 45);
}

function restartGame() {
    gameOver = false;
    score = 0;
    bird.y = boardHeight / 2;
    hastighetY = 0;
    pipeArray = [];
    hastighetX = -3;
}

function handleRestartClick(event) {
    if (!gameOver) return;

    let clickX = event.clientX;
    let clickY = event.clientY;

    let restartX = 535;
    let restartY = 450;
    let restartWidth = 150;  
    let restartHeight = 40; 

    if (
        clickX >= restartX &&
        clickX <= restartX + restartWidth &&
        clickY >= restartY - restartHeight &&
        clickY <= restartY
    ) {
        restartGame();
    }
}

document.addEventListener("click", handleRestartClick);







