// import Display from './display.js';

class Bricks {
  constructor(ctx, sound) {
    this.image = new Image();
    this.onReady = () => {}
    this.image.onload = () => this.onReady();
    this.image.src = "/images/bricksheet.png"
    this.brickRow = 5;
    this.brickCol = 7;
    this.brickW = 85;
    this.brickH = 30;
    this.brickPadding = 0;
    this.brickOffsetTop = 40;
    this.brickOffsetLeft = 25;
    this.ctx = ctx;
    this.sound = sound;
    ///array for bricks
    this.bricks = [];

    for (let i = 0; i < this.brickCol; i++) {
      this.bricks[i] = [];
      for (let j = 0; j < this.brickRow; j++) {
        this.bricks[i][j] = { x: 0, y: 0, status: (Math.floor(Math.random() * 3) + 1)}; // add status to remove bricks
      }
    }
  }
  breakBricks(x,y,dy,score) {
    // console.log("breakbricks")
    for (let i = 0; i < this.brickCol; i++) {
      for (let j = 0; j < this.brickRow; j++) {
        let breakB = this.bricks[i][j];
        if (breakB.status >= 1) {
          // console.log(breakB.x, breakB.y)
          if (
            x > breakB.x &&
            x < breakB.x + this.brickW &&
            y > breakB.y &&
            y < breakB.y + this.brickH
          ) {
            // console.log("nested if loop")
            this.sound.play();
            breakB.status -= 1; // if hit turns status to 0 to remove it

            return [-dy, score+=100]
            // dy = -dy;
          }
        }
      }
    }
    return [dy, score]
  }

  drawBricks() {
    for (let i = 0; i < this.brickCol; i++) {
      for (let j = 0; j < this.brickRow; j++) {
        // console.log(bricks[i][j].status);
        if (this.bricks[i][j].status >= 1) {
          //the padding of the bricks
          let brickX =
            i * (this.brickW + this.brickPadding) + this.brickOffsetLeft;
          let brickY =
            j * (this.brickH + this.brickPadding) + this.brickOffsetTop;

          //placing and designing the brick
          this.bricks[i][j].x = brickX;
          this.bricks[i][j].y = brickY;
          this.ctx.beginPath();
          // console.log(this.bricks[i][j].status);
          if(this.bricks[i][j].status == 1){
            // this.ctx.fillStyle = "#f00";
            // this.ctx.fill();
            this.ctx.globalAlpha = 0.5;
            this.ctx.drawImage(
              this.image,
              8,
              200,
              this.brickW,
              this.brickH,
              brickX,
              brickY,
              this.brickW,
              this.brickH
            );
            this.ctx.globalAlpha = 1;            
          }
          if (this.bricks[i][j].status == 2) {
            this.ctx.drawImage(
              this.image,
              8,
              100,
              this.brickW,
              this.brickH,
              brickX,
              brickY,
              this.brickW,
              this.brickH
            );
          }
          if (this.bricks[i][j].status == 3) {
            this.ctx.fillStyle = "#0000";
            this.ctx.drawImage(
              this.image,
              8,
              20,
              this.brickW,
              this.brickH,
              brickX,
              brickY,
              this.brickW,
              this.brickH
            );
          }
          // this.ctx.fillStyle = "blue";
          this.ctx.rect(brickX, brickY, this.brickW, this.brickH);
          // this.ctx.fill();
          // this.ctx.stroke();
          this.ctx.lineWidth = 5;
          this.ctx.strokeRect(brickX, brickY, this.brickW, this.brickH);
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
    if( count == (this.brickCol * this.brickRow)){
      alert("You Win");
      document.location.reload()
    }
  }
}
export default Bricks;