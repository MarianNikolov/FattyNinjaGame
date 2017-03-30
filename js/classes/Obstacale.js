class Obstacale extends MovingObj {
    constructor(context, x, y, shapes, speed, boardSize, rndHorizontal, sounEffect) {
        super(context, x, y, shapes, speed, boardSize, sounEffect);
        Validator.Number(rndHorizontal);
        this.rndHorizontal = rndHorizontal;
        this.dx = Constants.OBSTACLE_INIT_SPEED;
        this.dy = 0;
        this.HorizCallBack = () => {
            return (this.x === this.boardSize.left || this.x === this.boardSize.right)
        };

    }
    // methods
    horizontalEnd() {
        return this.HorizCallBack();
    }
}