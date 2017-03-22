function createObstacle(options) {
	let obstacles = [];

	let obstacle = {
		spriteSheets: options.spriteSheets,
		spriteSheet: options.spriteSheets[0],
		context: options.context,
		width: options.width,
		height: options.height,
		obstacleCrateYLine: options.obstacleCrateYLine,
		numberOfFrames: options.numberOfFrames,
		loopTicksPerFrame: options.loopTicksPerFrame,
		frameIndex: 0,
		loopTicksCount: 0,
		render: render,
		update: update,
		obstacles: obstacles,
		spawnBoxHurdle: spawnBoxHurdle,
		iterateObstaclesArray: iterateObstaclesArray
	};

	let clearOffset = 0;

	function render(drawCoordinates, clearCoordinates) {
		this.context.clearRect(
			clearCoordinates.x - clearOffset,
			clearCoordinates.y - clearOffset,
			this.width + clearOffset * 2,
			this.height + clearOffset * 2
		);

		this.context.drawImage(
			this.spriteSheet,
			this.frameIndex * this.width,
			0,
			this.width,
			this.height,
			drawCoordinates.x,
			drawCoordinates.y,
			this.width,
			this.height
		);
	}

	function update() {
		this.loopTicksCount += 1;

		if (this.loopTicksCount >= this.loopTicksPerFrame) {
			this.loopTicksCount = 0;
			this.frameIndex += 1;

			if (this.frameIndex >= this.numberOfFrames) {
				this.frameIndex = 0;
			}
		}
	}

	function spawnBoxHurdle() {
		var spawnChance = 0.01,
			spawnOffsetX = 200;
		var newBox = createPhysicalBody({
			coordinates: { x: 1000, y: this.obstacleCrateYLine },
			speed: { x: -3, y: 0 },
			height: this.height,
			width: this.width
		});

		if (Math.random() < spawnChance) {
			if (this.obstacles.length) {
				if (this.obstacles[obstacles.length - 1].coordinates.x < 700) {
					var lastBox = obstacles[obstacles.length - 1];
					this.obstacles.push(newBox);
				}
			} else {
				this.obstacles.push(newBox);
			}
		}
	}

	function obstacleGarbageCollector(obstacle, index, obstacleArray) {
		if (obstacle.coordinates.x < -obstacle.width) {
			obstacleArray.splice(index, 1);
			i -= 1;
			return true;
		}
	}

	function iterateObstaclesArray(ninjaPhysicalBody) {
		for (i = 0; i < this.obstacles.length; i += 1) {

			box = this.obstacles[i];

			if (obstacleGarbageCollector(box, i, this.obstacles)) {
				continue;
			}

			let lastObstacleCrateCoordinates = box.move();
			this.render(box.coordinates, lastObstacleCrateCoordinates);
			this.update();
			
			if (ninjaPhysicalBody.isBehind(box)) {
				increaseScore();
			}
			collisionCheck(box, ninjaPhysicalBody);

		}
	}

	function collisionCheck(box, ninjaPhysicalBody) {
		if (box.collidesWith(ninjaPhysicalBody)) {
			updateScores(document.getElementById('current-score').innerHTML)
			window.open("game-over-page.html", "_self", false);
		}
		else {
			updateScore(box, ninjaPhysicalBody);
		}
	}

// 	let score = 0;
// 	let labelElement = document.getElementById('lblScore');
// 	let deviation = 1;
	
// 	function updateScore(box, ninjaPhysicalBody) {
// 		if (box.coordinates.x <= ninjaPhysicalBody.coordinates.x + deviation &&
// 			box.coordinates.x + deviation >= ninjaPhysicalBody.coordinates.x) {
// 			score += 10;
// 			labelElement.innerHTML = 'Score: ' + score;
// 		}
// 	}

	return obstacle;
}
