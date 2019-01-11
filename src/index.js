
let canvas = document.getElementById("breakout");
let ctx = canvas.getContext('2d');
// let keyCode = require("keycode");

/////set paddle keys 
let right = false;
let left = false;
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e){
  if (e.keyCode == 39 ){
    right = true;
  }
  if (e.keyCode == 37 )  {
    left = true;
  }
}

function keyUpHandler(e){
  if (e.keyCode == 39) {
    right = false;
  }
  if (e.keyCode == 37) {
    left = false;
  }
}

//starting position of the ball
let x = canvas.width/2;
let y = canvas.height - 30;

//ball radius
let ball_rad = 10;
let dx = 2;
let dy = -2;

//paddle
let paddleH = 10;
let paddleW = 75;
let paddlex = (canvas.width - paddleW)/2;

//the actual ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ball_rad, 0, Math.PI*2, true);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

//paddle 
function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddlex, canvas.height-paddleH, paddleW, paddleH);
  ctx.fillStyle = "gray";
  ctx.fill();
  ctx.closePath();

}


////////The action/motion
function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height); //clears ball from old position
  drawBall();
  drawPaddle();

  if(y + dy < ball_rad){
    dy = -dy
  } else if (y + dy + 5 > canvas.height - ball_rad +1){//touch the ground game over
    if (x > paddlex && x < paddlex + paddleW) {
        dy = -dy
      }else{
        alert("Game Over");
        document.location.reload();
      }
  }
  if (x + dx > canvas.width - ball_rad || x + dx < ball_rad) {
    dx = -dx
  }

  /////paddle motion
  if(right && paddlex < canvas.width - paddleW){
    paddlex += 7;
  }
  else if(left && paddlex > 0){
    paddlex -= 7;
  }

  x += dx;
  y += dy;
}
//template: setInterval(function, milliseconds);
setInterval(draw, 15);