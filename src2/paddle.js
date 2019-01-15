class Paddle{
    constructor(width, height, ctx){
        this.paddleW = 75;
        this.paddleH = 10
        this.paddlex = (width - this.paddleW) / 2;
        this.width = width;
        this.height = height;

        this.ctx = ctx;
    }

    drawPaddle() {
        this.ctx.beginPath();
        this.ctx.rect(this.paddlex, this.height - this.paddleH, this.paddleW, this.paddleH);
        this.ctx.fillStyle = "orange";
        this.ctx.fill();
        this.ctx.closePath();

    }
}

export default Paddle;