window.addEventListener('load', function () {
	let gameCanvas = document.getElementById('game-canvas'),
		gameContext1 = gameCanvas.getContext('2d'),
		gameContext = gameCanvas.getContext('2d'),
		gameContext2 = document.getElementById('game-canvas2').getContext('2d');

	let ninjaRunningImg = document.getElementById('ninja-running'),
		ninjaJumpingImg = document.getElementById('ninja-jumping'),
		obstacleCrateImg = document.getElementById('obstacle-crate'),
		music = document.getElementById('music'),
		pauseContainer = document.getElementById('pause-container'),
		pauseButton = document.getElementById('continue-button');

	let gameWalkingLine = gameCanvas.height - (ninjaRunningImg.height + 10),
		crateYLine = gameCanvas.height - (obstacleCrateImg.height + 10),
		isRunning = true;

	let ninjaSprite = createSprite({
		spriteSheets: [ninjaRunningImg, ninjaJumpingImg],
		spriteSheet: ninjaRunningImg,
		context: gameContext,
		width: ninjaRunningImg.width / 4,
		height: ninjaRunningImg.height,
		numberOfFrames: 4,
		loopTicksPerFrame: 5
	});

	let ninjaPhysicalBody = createPhysicalBody({
		coordinates: { x: 30, y: gameWalkingLine / 2 },
		speed: { x: 0, y: 0 },
		height: ninjaSprite.height,
		width: ninjaSprite.width * 2 / 3
	});

	let obstacleCrateSprite = createObstacle({
		spriteSheets: [obstacleCrateImg],
		spriteSheet: obstacleCrateImg,
		context: gameContext,
		width: obstacleCrateImg.width,
		height: obstacleCrateImg.height,
		obstacleCrateYLine: crateYLine,
		numberOfFrames: 1,
		loopTicksPerFrame: 1
	});

	window.addEventListener('keydown', function (ev) {
		let speed = 4;

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

		//Ninja's coordinatesX to be in the canvas only
		if ((ninjaPhysicalBody.coordinates.x > (gameWalkingLine * 2))) {
			ninjaPhysicalBody.speed.x = -speed * 1.3;
		} else if (ninjaPhysicalBody.coordinates.x <= 40) {
			ninjaPhysicalBody.speed.x = +speed * 1.3;
		}
	});
	pauseButton.addEventListener("click", function () {
		pauseGame("continue");
	});

	let background = createBackground();

	let gravity = gameGravity(gameWalkingLine);
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
	let counter = 0;
	function gameLoop() {
		counter += 1;
		gameContext.clearRect(0, 0, gameContext.canvas.width, gameContext.canvas.height);
		gameContext = counter % 2 === 1 ? gameContext2 : gameContext1;

		if (isRunning) {
			gravity.applyGravityVerticalY(ninjaPhysicalBody, 0.15);
			gravity.removeAccelerationHorizontalX(ninjaPhysicalBody, 0.1);

			let lastNinjaCoordinates = ninjaPhysicalBody.move();
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
