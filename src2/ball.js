class Ball{
    constructor(width, height, ctx){
        this.x = width / 2;
        this.y = height - 30;
        this.width = width;
        this.height = height;
        this.ball_rad = 10;
        this.ctx = ctx;
        // this.speed = 3;
    }

    drawBall() {  
        this.ctx.beginPath(); 
        this.ctx.arc(this.x, this.y, this.ball_rad, 0, Math.PI * 2, true);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.closePath();
    }
}
export default Ball;