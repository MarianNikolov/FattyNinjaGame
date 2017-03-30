function createBackground() {
	var backgroundCanvas = document.getElementById('background-canvas');
	var backgroundContext = backgroundCanvas.getContext('2d');
	var backgroundImg = document.getElementById('background');

	function render() {
		backgroundContext.drawImage(
			this.image,
			this.coordinates.x,
			0
		);

		backgroundContext.drawImage(
			this.image,
			this.image.width - Math.abs(this.coordinates.x),
			0
		);
	}

	function update() {
			this.coordinates.x -= 3;

			if( Math.abs(this.coordinates.x) > this.image.width) {
				this.coordinates.x = 0;
			}
	}

	var background = {
		image: backgroundImg,
		coordinates: { x: 0, y: 0 },
		render: render,
		update: update
	};

	return background;
}
