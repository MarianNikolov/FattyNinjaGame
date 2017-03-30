class Ninja extends MovingObj {
    constructor(context, x, y, shapes, speed, boardSize) {
        super(context, x, y, shapes, speed, boardSize);
        this.isHited = false;
        this.oldSprite;
        this.start = 0;
        super.VerticalCallBack = () => {
            if (super.dy === 0) {
                super.sprites = shapes[0];
            }
        };
    }
    // methods
    jump() {
        if (this.y === this.boardSize.down) {
            this.dy = Constants.NINJA_VERTICAL_SPEED_UP;
            super.sprites = this.shapes[1]; // set jumping ninja
        }
    };

    hit() {
        if (this.isHited) {
            if ((Date.now() - this.start) > Constants.TIME_STAY_HIT_KEY) {
                this.sprites = this.oldSprite;
                this.isHited = false;
            }

        } else {
            this.start = Date.now();
            this.isHited = true;
            this.oldSprite = this.sprites;
            this.sprites = this.shapes[2];
        }
    }
}