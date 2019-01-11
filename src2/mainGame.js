import Display from "./display.js";

// console.log("canvas");
document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById("game");
    // console.log("canvas2");
    let ctx = canvas.getContext('2d');
    let game = new Display(canvas.width, canvas.height, ctx);
    game.start();
})
