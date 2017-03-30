class MovingObj extends Body {
    constructor(context, x, y, shapes, speed, boardSize, soundeffect) {
        Validator.Shapes(shapes);
        super(context, x, y, shapes[0], speed, soundeffect);
        this.shapes = shapes;
        Validator.SizeOfBoard(boardSize);
        this.boardSize = boardSize;
        this.dx = 0;
        this.dy = 0;
        this.VerticalCallBack = function () { };
        this.HorizCallBack = function () { };
    }
    get dx() {
        return this._dx;
    }
    set dx(dx) {
        Validator.Number(dx);
        this._dx = dx;
    }
    get dy() {
        return this._dy;
    }
    set dy(dy) {
        Validator.Number(dy);
        this._dy = dy;
    }

    //methods
    horizontalMove(funcMove, funcCollision) {
        var newDx = funcMove(this.dx);
        if (this.x + newDx > this.boardSize.right) {
            newDx = funcCollision(this.dx);
            this.x = this.boardSize.right;
        }

        if (this.x + newDx < this.boardSize.left) {
            newDx = funcCollision(this.dx);
            this.x = this.boardSize.left;
        }

        this.dx = newDx;
        this.x += newDx;
        this.nextSprite();
        return this
    }

    verticalMove(funcMove, funcCollision) {
        var newDy = funcMove(this.dy);
        if (
            this.y + newDy > this.boardSize.down
        ) {
            newDy = funcCollision(this.dy);
            this.y = this.boardSize.down
        }

        if (this.y + newDy < this.boardSize.up) {
            newDy = funcCollision(this.dy);
            this.y = this.boardSize.up;
        }

        this.dy = newDy;
        this.y += newDy;
        this.nextSprite();
        this.VerticalCallBack();
        return this
    }
}