const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const paddleHeight = 100;
const paddleWidth = 20;
const ballSize = 20;
const player1Color = 'lime';
const player2Color = 'blue';

let player1Y = (canvas.height - paddleHeight) / 2;
let player2Y = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 3;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Player 1 paddle
    ctx.fillStyle = player1Color;
    ctx.fillRect(0, player1Y, paddleWidth, paddleHeight);

    // Player 2 paddle
    ctx.fillStyle = player2Color;
    ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);

    // Ball
    ctx.fillStyle = 'white';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY + ballSize >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX <= paddleWidth && ballY >= player1Y && ballY <= player1Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX + ballSize >= canvas.width - paddleWidth && ballY >= player2Y && ballY <= player2Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX < 0 || ballX > canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
    }
}

function movePlayer1(e) {
    if (e.key === 'w' && player1Y > 0) {
        player1Y -= 10;
    } else if (e.key === 's' && player1Y < canvas.height - paddleHeight) {
        player1Y += 10;
    }
}

function movePlayer2(e) {
    if (e.key === 'o' && player2Y > 0) {
        player2Y -= 10;
    } else if
    (e.key === 'l' && player2Y < canvas.height - paddleHeight) {
        player2Y += 10;
    }
}

function touchHandler(e) {
    e.preventDefault();
    const touch = e.changedTouches[0];
    const touchY = touch.clientY - canvas.getBoundingClientRect().top;
    const touchX = touch.clientX - canvas.getBoundingClientRect().left;

    if (touchX < canvas.width / 2 && touchY > 0 && touchY < canvas.height - paddleHeight) {
        player1Y = touchY;
    } else if (touchX > canvas.width / 2 && touchY > 0 && touchY < canvas.height - paddleHeight) {
        player2Y = touchY;
    }
}

document.addEventListener('keydown', movePlayer1);
document.addEventListener('keydown', movePlayer2);
canvas.addEventListener('touchstart', touchHandler);
canvas.addEventListener('touchmove', touchHandler);

setInterval(draw, 1000 / 60);
