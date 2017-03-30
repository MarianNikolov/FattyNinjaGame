window.addEventListener('load', function () {

	var music = document.getElementById('music'),
		pauseContainer = document.getElementById('pause-container'),
		pauseButton = document.getElementById('continue-button');
	music.volume = Constants.MUSIC_VOLUME;
	var isRunning = true;

	pauseButton.addEventListener("click", function () {
		pauseGame();
	});

	window.addEventListener('keydown', function (ev) {

		// left arrow => walk left
		if (ev.keyCode === Constants.KEY_LEFT_ARROW) {
			ninja.dx = Constants.NINJA_HORIZONTAL_SPEED_LEFT;
		}
		// up arrow => jump
		if (ev.keyCode === Constants.KEY_UP_ARROW) {
			ninja.jump();
		}
		// right arrow => walk right
		if (ev.keyCode === Constants.KEY_RIGHT_ARROW) {
			ninja.dx = Constants.NINJA_HORIZONTAL_SPEED_RIGHT;
		}
		// down arrow => fall faster
		if (ev.keyCode === Constants.KEY_DOWN_ARROW) {
		}
		// p is pressed => game paused
		if (ev.keyCode === Constants.KEY_P) {
			pauseGame();
		}
		// space is pressed => hit sword
		if (ev.keyCode === Constants.KEY_SPACE) {
			ninja.hit();
		}
	});

	var gameContexts = [];
	gameContexts.push(document.getElementById('game-canvas').getContext('2d'));
	gameContexts.push(document.getElementById('game-canvas2').getContext('2d'));
	sndEffect = document.getElementById('explosion');
	sndEffectCash = document.getElementById('cash');

	var background = createBackground();
	var counter = 0;
	var timeWatingExplode = 0;
	var indexOfContext = 0;

	function pauseGame() {
		isRunning = !isRunning;
		if (isRunning) {
			pauseContainer.style.display = "none";
		} else {
			pauseContainer.style.display = "";
		}
	}

	function gameLoop() {
		CreatObstacle([bomb, chest], explidingBomb);
		CreatBonus([ball, ballCrushed, arrayOfMoney]);
		indexOfContext = 1 - indexOfContext;
		gameContext.clearRect(0, 0, gameContext.canvas.width, gameContext.canvas.height);
		gameContext = gameContexts[indexOfContext];

		if (isRunning) {
			counter += 1;
			if (ninja.isAlive) {
				ninja
					.horizontalMove(x => Constants.NINJA_HorizontalMoving(x), y => 0)
					.verticalMove(y => Constants.NINJA_VerticalMoving(y), y => 0);
			} else {
				ninja.horizontalMove(x => Constants.OBSTACLE_INIT_SPEED, y => 0).verticalMove(x => 0, y => 0);
				if (counter - timeWatingExplode > Constants.TIME_WAITING_BEFORЕ_RESTART) {
					localStorage.setItem('xBackground', background.coordinates.x);
					window.open("game-over-page.html", "_self", false);
				}
			}

			if (obstacles.length > 0) {
				obstacles.forEach((x, i) => {

					if (x.isAlive && x.isOn(ninja)) {
						x.isAlive = false;
						timeWatingExplode = counter;
						ninja.isAlive = false;
						x.sprites = x.shapes[1];
						if (x.soundEffect) {
							x.soundEffect.play();
						}
					};

					if (x.horizontalMove(x => x, y => 0).horizontalEnd()) {
						increaseScore(Constants.POINT_SCORE_WHEN_successfully_JUMP);
						obstacles.splice(i, 1);
					}
				});
			}

			if (bonuses.length > 0) {
				bonuses.forEach((x, i) => {
					if (x.isAlive && x.isOn(ninja)) {
						x.isAlive = false;
						if (x.soundEffect) {
							x.soundEffect.play();
						}
						increaseScore(Constants.POINT_SCORE_WHEN_GET_BONUS);
					}

					x.verticalMove(x => Constants.BONUS_VerticalMoving(x), y => -y);
					if (x.horizontalMove(x => x, y => 0).horizontalEnd()) {
						bonuses.splice(i, 1);
					}
				})
			}

			background.render();
			background.update();
		}

		window.requestAnimationFrame(gameLoop);
	}

	gameLoop();
	regulateSound();
	showScores();
});