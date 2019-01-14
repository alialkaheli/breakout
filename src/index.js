
let canvas = document.getElementById("breakout");
let ctx = canvas.getContext('2d');
// let keyCode = require("keycode");

/////set paddle keys 
let right = false;
let left = false;
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e){
  if (e.keyCode == 68 ){
    right = true;
  }
  if (e.keyCode == 65 )  {
    left = true;
  }
}

function keyUpHandler(e){
  if (e.keyCode == 68) {
    right = false;
  }
  if (e.keyCode == 65) {
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

//////Bricks
let brickRow = 3;
let brickCol = 5
let brickW = 75;
let brickH = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

///array for bricks
let bricks = []

for(let i= 0; i < brickCol; i++){
  bricks[i] = [];
  for(let j = 0; j < brickRow; j++){
    bricks[i][j] = {x:0, y:0, status:1} // add status to remove bricks
  }
}

////draw bricks
function drawBricks(){
  //////draw bricks only if status is 1
  
  for (let i = 0; i < brickCol; i++) {
    for (let j = 0; j < brickRow; j++) {
      // console.log(bricks[i][j].status);
      if (bricks[i][j].status == 1) {
        
        //the padding of the bricks
        let brickX = (i*(brickW + brickPadding)) + brickOffsetLeft
        let brickY = (j*(brickH + brickPadding)) + brickOffsetTop

        //placing and designing the brick
        bricks[i][j].x = brickX;
        bricks[i][j].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY,brickW, brickH);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

/////// break bricks
function breakBricks(){
  // console.log("breakbricks")
  for (let i = 0; i < brickCol; i++) {
    for (let j = 0; j < brickRow; j++) {
      let breakB = bricks[i][j]
      if(breakB.status == 1){
        console.log(breakB.x, breakB.y)
        if((x > breakB.x) && (x < (breakB.x + brickW)) && (y > breakB.y) && (y < (breakB.y + brickH))){
          // console.log("nested if loop")
          dy = -dy;
          breakB.status = 0; // if hit turns status to 0 to remove it 
        }
      }
    }
  }

}

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
  drawBricks();
  breakBricks();

  

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