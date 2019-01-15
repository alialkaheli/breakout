import Ball from "./ball.js";
import Paddle from "./paddle.js";
import Bricks from "./bricks.js";

class Display{
    constructor(canvas, ctx, bricksound, bounce, sound){
        // console.log("display")
        this.ball = new Ball(canvas.width, canvas.height, ctx);
        this.paddle = new Paddle(canvas.width, canvas.height, ctx);
        this.bricks = new Bricks(ctx, bricksound);

        this.score = 0;

        
        this.canvas = canvas
        
        this.sound = sound;
        this.bounce = bounce;

        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = ctx;

        this.dx = 2;
        this.dy = -2;

        this.x = canvas.width / 2;
        this.y = canvas.height - 30;

        this.right = false;
        this.left = false;
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);


        document.addEventListener("keydown",this.keyDownHandler);
        document.addEventListener("keyup", this.keyUpHandler);
        this.render();
        // this.start();
        // setInterval(this.render, 15);
    }

    start(){
        const animate = () => {
            this.frame = requestAnimationFrame(animate);
            this.render();

        }
        animate();
    }

    keyDownHandler(e) {
        if (e.keyCode == 39 || e.keyCode == 68) {
            this.right = true;
        }
        if (e.keyCode == 37 || e.keyCode == 65){
            this.left = true;
        }
    }

    keyUpHandler(e) {
        if (e.keyCode == 39 || e.keyCode == 68) {
          this.right = false;
        }
        if (e.keyCode == 37 || e.keyCode == 65) {
          this.left = false;
        }
    }

    paddleMotion(){
        /////paddle motion
        if (this.right && this.paddle.paddlex < this.width - this.paddle.paddleW) {
            this.paddle.paddlex += 7;
        }
        else if (this.left && this.paddle.paddlex > 0) {
            this.paddle.paddlex -= 7;
        }
    }

    ballMotion(){
        // console.log("ball motion")
        if (this.ball.y + this.dy < this.ball.ball_rad) {
            // console.log("first if ")
            this.bounce.play();
            this.dy = -this.dy;
        } else if (this.ball.y + this.dy + 5 > this.height - this.ball.ball_rad + 1) {
            //touch the ground game over
            // console.log("bottom");
            if (this.ball.x > this.paddle.paddlex && this.ball.x < this.paddle.paddlex + this.paddle.paddleW) {
                // console.log(this.dy);
                this.bounce.play();
                this.dy = -this.dy;
            } else {
                this.sound.stop();
                alert("Game Over, your score is " + this.score);
                document.location.reload();
                
            }
        }
        if (this.ball.x + this.dx > this.width - this.ball.ball_rad || this.ball.x + this.dx < this.ball.ball_rad) {
            // console.log("second if")
            this.bounce.play();
            this.dx = -this.dx;
        }
    }

    drawScore(){
        this.ctx.font = "25px Hemi Head";
        this.ctx.fillStyle = "red";
        this.ctx.fillText("Score: "+ this.score, 8, 20);
    }

    
    render(){
        // console.log("helo")
        // console.log(this.width, this.height)
        this.ctx.clearRect(0, 0, this.width, this.height); //clears ball from old position
        // console.log(this.ctx);
        this.ball.drawBall();
        this.paddle.drawPaddle();
        this.bricks.drawBricks();
        this.drawScore();
        let arr = this.bricks.breakBricks(this.ball.x, this.ball.y, this.dy, this.score);
        this.dy = arr[0]
        this.score = arr[1]
        // console.log(this.ball);
        // this.dy = this.bricks.switchDir(this.dy);
        

       this.ballMotion();
        

        /////paddle motion
        this.paddleMotion();

        this.ball.x += this.dx;
        this.ball.y += this.dy;

        this.bricks.win()
    }
}


export default Display;