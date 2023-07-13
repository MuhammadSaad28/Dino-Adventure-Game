score = 0;
cross = true;
music = new Audio("music.mp3");
turn = new Audio("turnchange.wav");
gameOverS = new Audio("gameover.mp3");
music.play();
document.onkeydown = function (e) {
    console.log("key code: ", e.keyCode);
    if (e.keyCode == 38 || e.keyCode == 32) {
        dino = document.querySelector(".dino");
        dino.classList.add(`animatedino`);
        turn.play();
        setTimeout(() => {
            dino.classList.remove(`animatedino`);
        }, 700);
    }
    else if (e.keyCode == 39) {
        dino = document.querySelector(".dino");
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue(`left`));
        dino.style.left = dinoX + 112 + "px";
    }
    else if (e.keyCode == 37) {
        dino = document.querySelector(".dino");
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue(`left`));
        dino.style.left = (dinoX - 112) + "px";

    }
}


setInterval(() => {
    dino = document.querySelector(".dino");
    obstacle = document.querySelector(".obstacle");
    gameOver = document.querySelector(".gameOver");
    btn = document.querySelector(".btn");

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue(`left`));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue(`top`));
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue(`left`));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue(`top`));

    X = Math.abs(dx - ox);
    Y = Math.abs(dy - oy);

    if (X < 79 && Y < 52) {

        obstacle.classList.remove(`obstacleani`);
        dino.style.bottom = -10 + "vw";
        gameOver.innerHTML = `Game Over - Reload to Play Again`;
        btn.style.display = "flex";
        gameOverS.play();
        setTimeout(() => {
            music.pause();
            gameOverS.pause();
        }, 1000);

    }
    else if (X < 100 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            if (aniDur >= 2.0) {
                newDur = aniDur - 0.1;
            }
            else {
                newDur = 2.0;
            }
            obstacle.style.animationDuration = newDur + 's';

        }, 500);
    }


}, 10);



function updateScore(score) {
    scoreCont.innerHTML = "Score: " + score
}

btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
    location.reload();
})