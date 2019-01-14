import Display from "./display.js";
import { Howl } from 'howler';


// console.log("canvas");
document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById("game");
    // console.log("canvas2");
    let ctx = canvas.getContext('2d');
    var sound = new Howl({
        src: ['/src2/sound.mp3'],
        buffer: true,
        loop: true
    });
    var brick = new Howl({
      src: ["/src2/breaking.mp3"],
      
    });
    var bounce = new Howl({
        src: ["/src2/bounce.mp3"],

    });

    // sound.play();
    let game = new Display(canvas.width, canvas.height, ctx, brick,bounce, sound);
    document.querySelector("button").addEventListener("click", ()=> {
        game.start();
        sound.play();
        
    })
    // game.start();
})

/////////// python -m SimpleHTTPServer  <-----run server for audio
///localhost:8000