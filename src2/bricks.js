// import Display from './display.js';

class Bricks {
  constructor(ctx, sound) {
    this.brickRow = 3;
    this.brickCol = 5;
    this.brickW = 80;
    this.brickH = 20;
    this.brickPadding = 15;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.ctx = ctx;
    this.sound = sound;
    ///array for bricks
    this.bricks = [];

    for (let i = 0; i < this.brickCol; i++) {
      this.bricks[i] = [];
      for (let j = 0; j < this.brickRow; j++) {
        this.bricks[i][j] = { x: 0, y: 0, status: 1 }; // add status to remove bricks
      }
    }
  }
  breakBricks(x,y,dy) {
    // console.log("breakbricks")
    for (let i = 0; i < this.brickCol; i++) {
      for (let j = 0; j < this.brickRow; j++) {
        let breakB = this.bricks[i][j];
        if (breakB.status == 1) {
          // console.log(breakB.x, breakB.y)
          if (
            x > breakB.x &&
            x < breakB.x + this.brickW &&
            y > breakB.y &&
            y < breakB.y + this.brickH
          ) {
            // console.log("nested if loop")
            this.sound.play();
            breakB.status = 0; // if hit turns status to 0 to remove it
            return -dy
            // dy = -dy;
          }
        }
      }
    }
    return dy
  }

  drawBricks() {
    for (let i = 0; i < this.brickCol; i++) {
      for (let j = 0; j < this.brickRow; j++) {
        // console.log(bricks[i][j].status);
        if (this.bricks[i][j].status == 1) {
          //the padding of the bricks
          let brickX =
            i * (this.brickW + this.brickPadding) + this.brickOffsetLeft;
          let brickY =
            j * (this.brickH + this.brickPadding) + this.brickOffsetTop;

          //placing and designing the brick
          this.bricks[i][j].x = brickX;
          this.bricks[i][j].y = brickY;
          this.ctx.beginPath();
          this.ctx.rect(brickX, brickY, this.brickW, this.brickH);
          this.ctx.fillStyle = "black";
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    }
  }
  win(){
    let count = 0
    for (let i = 0; i < this.brickCol; i++) {
      for (let j = 0; j < this.brickRow; j++) {
        if(this.bricks[i][j].status == 0){
          count+=1
        }
      }
    }
    if( count == 15){
      alert("You Win");
      document.location.reload()
    }
  }
}
export default Bricks;