// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


window.addEventListener('load', function() {
    var gameCanvas = document.getElementById('game-canvas'),
        gameContext1 = gameCanvas.getContext('2d'),
        gameContext = gameCanvas.getContext('2d'),
        gameContext2 = document.getElementById('game-canvas2').getContext('2d');

    var ninjaRunningImg = document.getElementById('ninja-running'),
        ninjaJumpingImg = document.getElementById('ninja-jumping'),
        ninjaHittingImg = document.getElementById('ninja-hitting'),
        obstacleCrateImg = document.getElementById('obstacle-crate'),
        music = document.getElementById('music'),
        pauseContainer = document.getElementById('pause-container'),
        pauseButton = document.getElementById('continue-button');

    var gameWalkingLine = gameCanvas.height - (ninjaRunningImg.height + 10),
        crateYLine = gameCanvas.height - (obstacleCrateImg.height + 10),
        isRunning = true;

    var ninjaSprite = createSprite({
        spriteSheets: [ninjaRunningImg, ninjaJumpingImg, ninjaHittingImg],
        spriteSheet: ninjaRunningImg,
        context: gameContext,
        width: ninjaRunningImg.width / 4,
        height: ninjaRunningImg.height,
        numberOfFrames: 4,
        loopTicksPerFrame: 5
    });

    var ninjaPhysicalBody = createPhysicalBody({
        coordinates: { x: 30, y: gameWalkingLine / 2 },
        speed: { x: 0, y: 0 },
        height: ninjaSprite.height,
        width: ninjaSprite.width * 2 / 3,
        image: ninjaRunningImg
    });

    var obstacleCrateSprite = createObstacle({
        spriteSheets: [obstacleCrateImg],
        spriteSheet: obstacleCrateImg,
        context: gameContext,
        width: obstacleCrateImg.width,
        height: obstacleCrateImg.height,
        obstacleCrateYLine: crateYLine,
        numberOfFrames: 1,
        loopTicksPerFrame: 1
    });

    var keyRepeatDuration = 1000, //interval in miliseconds to allow ninja to hit again obsticales
        lastHitPressed = Date.now(); //the time of first hit
    window.addEventListener('keydown', function(ev) {
        var speed = 4;

        // left arrow => walk left
        if (ev.keyCode === 37) {
            ninjaPhysicalBody.speed.x = -speed;
        }
        // up arrow => jump
        if (ev.keyCode === 38) {
            if (ninjaPhysicalBody.coordinates.y < gameWalkingLine) {
                return;
            }

            ninjaPhysicalBody.speed.y = -speed * 1.3;
        }
        // right arrow => walk right
        if (ev.keyCode === 39) {
            if (ninjaPhysicalBody.coordinates.y < gameWalkingLine) {
                return;
            }
            ninjaPhysicalBody.speed.x = speed;
        }
        // down arrow => fall faster
        if (ev.keyCode === 40) {
            ninjaPhysicalBody.speed.y = speed;
        }
        // p is pressed => game paused
        if (ev.keyCode === 80) {
            if (isRunning) {
                pauseGame('pause');
            } else {
                pauseGame('continue');
            }
        }

        // Space is pressed => hit
        if (ev.keyCode === 32) {
            //Do not allow repeated hit => the hit by sword can accure at least 
            //{ctrlKeyRepeatDuration} miiseconds after previous hit
            var now = Date.now();
            if (now - lastHitPressed < keyRepeatDuration) {
                ninjaPhysicalBody.image = null;
                return;
            } else {
                lastHitPressed = now;
                ninjaSprite.spriteSheet = ninjaHittingImg;
                ninjaSprite.width = ninjaHittingImg.width / 2;
                ninjaSprite.height = ninjaHittingImg.height;
                ninjaSprite.loopTicksPerFrame = 10;
                ninjaSprite.numberOfFrames = 2;
                ninjaSprite.frameIndex = 0;
                ninjaPhysicalBody.image = ninjaHittingImg;
            }
        }

        //Ninja's coordinatesX to be in the canvas only
        if ((ninjaPhysicalBody.coordinates.x > (gameWalkingLine * 2))) {
            ninjaPhysicalBody.speed.x = -speed * 1.3;
        } else if (ninjaPhysicalBody.coordinates.x <= 40) {
            ninjaPhysicalBody.speed.x = +speed * 1.3;
        }
    });

    window.addEventListener('keyup', function(ev) {
        if (ev.keyCode === 32) {
            ninjaPhysicalBody.image = null;
        }
    });
    pauseButton.addEventListener("click", function() {
        pauseGame("continue");
    });

    var background = createBackground();

    var gravity = gameGravity(gameWalkingLine);

    function pauseGame(gameStatus) {
        switch (gameStatus) {
            case "continue":
                isRunning = true;
                pauseContainer.style.display = "none";
                break;
            case "pause":
                isRunning = false;
                pauseContainer.style.display = "";
                break;

            default:
                break;
        }
    }

    // I have changes here
    var counter = 0;

    function gameLoop() {
        counter += 1;
        gameContext.clearRect(0, 0, gameContext.canvas.width, gameContext.canvas.height);
        gameContext = counter % 2 === 1 ? gameContext2 : gameContext1;

        if (isRunning) {
            gravity.applyGravityVerticalY(ninjaPhysicalBody, 0.15);
            gravity.removeAccelerationHorizontalX(ninjaPhysicalBody, 0.1);

            var lastNinjaCoordinates = ninjaPhysicalBody.move();
            ninjaSprite.render(ninjaPhysicalBody.coordinates, lastNinjaCoordinates, gameWalkingLine);
            ninjaSprite.update();

            obstacleCrateSprite.iterateObstaclesArray(ninjaPhysicalBody);
            obstacleCrateSprite.spawnBoxHurdle();

            background.render();

            background.update();
        }

        window.requestAnimationFrame(gameLoop);
    }

    gameLoop();
    regulateSound();
    showScores();
});
