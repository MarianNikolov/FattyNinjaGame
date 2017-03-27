function createSprite(options) {
    var sprite = {
        spriteSheets: options.spriteSheets,
        spriteSheet: options.spriteSheets[1],
        context: options.context,
        width: options.width,
        height: options.height,
        numberOfFrames: options.numberOfFrames,
        loopTicksPerFrame: options.loopTicksPerFrame,
        frameIndex: 0,
        loopTicksCount: 0,
        render: render,
        update: update,
        switchAnimationSprite: switchAnimationSprite
    };

    var clearOffset = 20;

    function isJumping(yCoordinate, gameWalkingLine) {
        if (yCoordinate !== gameWalkingLine) {
            return true;
        }
        return false;
    }

    function switchAnimationSprite(yCoordinate, gameWalkingLine) {

        if (sprite.spriteSheet !== sprite.spriteSheets[2]) {
            if (isJumping(yCoordinate, gameWalkingLine) === true) {
                sprite.spriteSheet = sprite.spriteSheets[1];
            } else {
                sprite.spriteSheet = sprite.spriteSheets[0];
            }
        }
    }

    function render(drawCoordinates, clearCoordinates, gameWalkingLine) {
        // this.context.clearRect(
        // 	clearCoordinates.x - clearOffset,
        // 	clearCoordinates.y - clearOffset,
        // 	this.width + clearOffset * 2,
        // 	this.height + clearOffset * 2
        // );

        switchAnimationSprite(drawCoordinates.y, gameWalkingLine);

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
        //after end of hitting animation reset sprite to initial state

        if (this.loopTicksCount >= this.loopTicksPerFrame) {
            this.loopTicksCount = 0;
            this.frameIndex += 1;
            if (this.spriteSheet === this.spriteSheets[2] && this.frameIndex >= this.numberOfFrames) {
                resetSprite();
            }
            if (this.frameIndex >= this.numberOfFrames) {
                this.frameIndex = 0;
            }
        }

        function resetSprite() {
            sprite.spriteSheet = sprite.spriteSheets[0];
            sprite.width = sprite.spriteSheet.width / 4;
            sprite.height = sprite.spriteSheet.height;
            sprite.numberOfFrames = 4;
            sprite.loopTicksPerFrame = 5;
        }

    }

    return sprite;
}
