import Ball from "./ball.js";
import Paddle from "./paddle.js";
import Bricks from "./bricks.js";

class Display{
    constructor(width, height, ctx){
        // console.log("display")
        this.ball = new Ball(width,height, ctx);
        this.paddle = new Paddle(width,height, ctx);
        this.bricks = new Bricks(ctx);

        this.width = width;
        this.height = height;
        this.ctx = ctx;

        this.dx = 2;
        this.dy = -2;

        this.x = width / 2;
        this.y = height - 30;

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
        if (e.keyCode == 39) {
            this.right = true;
        }
        if (e.keyCode == 37) {
            this.left = true;
        }
    }

    keyUpHandler(e) {
        if (e.keyCode == 39) {
            this.right = false;
        }
        if (e.keyCode == 37) {
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
            this.dy = -this.dy;
        } else if (this.ball.y + this.dy + 5 > this.height - this.ball.ball_rad + 1) {
            //touch the ground game over
            // console.log("bottom");
            if (this.ball.x > this.paddle.paddlex && this.ball.x < this.paddle.paddlex + this.paddle.paddleW) {
                console.log(this.dy);
                this.dy = -this.dy;
            } else {
                
                alert("Game Over");
                document.location.reload();
            }
        }
        if (this.ball.x + this.dx > this.width - this.ball.ball_rad || this.ball.x + this.dx < this.ball.ball_rad) {
            // console.log("second if")
            this.dx = -this.dx;
        }
    }

    
    render(){
        // console.log("helo")
        // console.log(this.width, this.height)
        this.ctx.clearRect(0, 0, this.width, this.height); //clears ball from old position
        // console.log(this.ctx);
        this.ball.drawBall();
        this.paddle.drawPaddle();
        this.bricks.drawBricks();
        this.dy = this.bricks.breakBricks(this.ball.x, this.ball.y, this.dy);
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