
let bodyWidth = window.innerWidth
let bodyHeight = window.innerHeight

let board;
let boardWidth = bodyWidth
let boardHeight = bodyHeight
let context;

let birdWidth = 50;
let birdHeight = 50;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

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

    context.clearRect(0, 0, board.width, board.height);


    hastighetY += gravitasjon
    bird.y = bird.y + hastighetY
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += hastighetX
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
    }

}

function placePipes() {

    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);

    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false

    }

    pipeArray.push(topPipe);
}

function moveBird(trykk) {
    if (trykk.code === "Space") {
        hastighetY = -6;
    }
}

