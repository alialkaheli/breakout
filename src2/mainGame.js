import Display from "./display.js";
import { Howl } from 'howler';


// console.log("canvas");
document.addEventListener('DOMContentLoaded', () => {
    // let canvas = document.getElementById("game");
    // // console.log("canvas2");
    // let ctx = canvas.getContext('2d');
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

    let fadeIntro = function (setForm, open, startBtn) {
        setForm.classList.add('close');
        open.classList.add('open');
        startBtn.classList.add('close');
        let h1 = document.getElementById("counter")
        setTimeout(function () {
            h1.innerHTML = 'GET READY';
            setTimeout(function () {
                h1.innerHTML = '3';
                setTimeout(function () {
                    h1.innerHTML = '2';
                    setTimeout(function () {
                        h1.innerHTML = '1';
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 2000);
        setTimeout(function () {
            open.parentNode.removeChild(open);
            setForm.parentNode.removeChild(setForm);
            startBtn.parentNode.removeChild(startBtn);
            getStarted();
        }, 7000);
    };

    let getStarted = function(){

        let gameCanvas = document.getElementsByClassName("game");
        console.log(gameCanvas);
        // debugger
        gameCanvas[0].classList.add('resize');
        gameCanvas[0].width = 650;
        gameCanvas[0].height = 500 ;
        let ctx = gameCanvas[0].getContext('2d');
        let game = new Display(
          gameCanvas[0],
          ctx,
          brick,
          bounce,
          sound,
          document
        );
        game.gameReady.then(() => game.start());

        

        
    }

    let opening = document.getElementById('pract');
    let instruction = document.getElementById('instruction');
    let startButton = document.getElementById('start-button');

    
    startButton.addEventListener('click', () =>
        fadeIntro(instruction, opening, startButton)
    );

    

    // sound.play();
    // let game = new Display(canvas, ctx, brick,bounce, sound, document);
    // document
    //   .getElementById("start-button")
    //   .addEventListener("click", () => {
    //     game.start();
    //     sound.play();
    //   });
    
    // document.addEventListener("keydown",(e) => {
    //     if (e.keyCode == 32) {
    //         game.start();
    //         sound.play();
    //     }
    // });

    // document.getElementById("restart").addEventListener("click", () => {
    //     document.location.reload();
        

    // })
    // game.start();
})


/////////// python -m SimpleHTTPServer  <-----run server for audio
///localhost:8000