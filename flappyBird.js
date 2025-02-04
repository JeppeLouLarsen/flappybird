
let bodyWidth = window.innerWidth
let bodyHeight = window.innerHeight

let board;
let boardWidth = bodyWidth
let boardHeight = bodyHeight
let context;

let birdWidth = 35;
let birdHeight = 35;
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
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

let hastighetY = 0;
let hastighetX = -2;
let gravitasjon = 0.2

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


    requestAnimationFrame(oppdater);
    setInterval(placePipes, 1500);

}

function oppdater() {
    requestAnimationFrame(oppdater);

    if (gameOver) {
        return;
    }


    context.clearRect(0, 0, board.width, board.height);


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
        pipe.x += hastighetX
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (kollisjon(bird, pipe)) {
            gameOver = true;
        }
    }

    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(score, 5, 45);


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

