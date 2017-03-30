class Bonus extends MovingObj {
    constructor(context, x, y, shapes, speed, boardSize, rndHorizontal, rndVertical, sounEffect) {
        super(context, x, y, shapes, speed, boardSize, sounEffect);
        Validator.Number(rndHorizontal);
        this.rndHorizontal = rndHorizontal;
        this.dx = rndHorizontal;
        this.dy = rndVertical;
        this.HorizCallBack = () => {
            return (this.x === this.boardSize.left || this.x === this.boardSize.right)
        };
        Validator.Number(rndVertical);
        this.rndVertical = rndVertical;
        this.VerticalCallBack = () => {
            if(!this.isAlive){
                this.dy = 0;
                this.sprites = this.shapes[2];
                return;
            }
            if (this.dy === 0) {
                this.dy = this.rndVertical;
            };

            if ((this.boardSize.down - this.y) < Constants.BONUS_sensitivity_bouncing) {
                this.sprites = this.shapes[1];
            } else {
                this.sprites = this.shapes[0];
            }
        }
    }
    // methods
    horizontalEnd(){
        return this.HorizCallBack();
    }
}