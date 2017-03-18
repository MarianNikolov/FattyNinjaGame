function createSprite(options) {
	let clearOffset = 20;
	
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

	let sprite = {
		spriteSheet: options.spriteSheet,
		context: options.context,
		width: options.width,
		height: options.height,
		numberOfFrames: options.numberOfFrames,
		loopTicksPerFrame: options.loopTicksPerFrame,
		frameIndex: 0,
		loopTicksCount: 0,
		render: render,
		update: update
	};

	return sprite;
}