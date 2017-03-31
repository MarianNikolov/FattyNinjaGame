// x - coordinate of this body - Number
// y - coordinate of this body - Number
// speed - in tick by frame
// sprites - array of images (sprite of one image)
class Body {
    constructor(context, x, y, sprites, speed, soundEffect) {
        this._startTime = 0;
        // validate speed
        this._speed = speed;
        this.spriteNumber = 0;
        // validate sprites
        this.x = x;
        this.y = y;
        this.sprites = sprites;
        // validate context
        this.context = context;
        this.isAlive = true;
        this.soundEffect = soundEffect;
    }
    get x() {
        return this._x;
    }
    set x(x) {
        Validator.Number(x);
        this._x = x;
    }
    get y() {
        return this._y;
    }
    set y(y) {
        Validator.Number(y);
        this._y = y;
    }

    get sprites() {
        return this._sprites
    }

    set sprites(sprites) {
        // Validate image
        Validator.NotNullArray(sprites);
        this._sprites = sprites;
    }

    // methods
    indexSprite(index) {
        this.context.drawImage(this.sprites[index].img, this.x, this.y)
        // this.drawCollisionStroke(); // this command show the red contour - collising contour
        return this
    }

    nextSprite() {
        if (!this._getTime()) {
            this.spriteNumber += 1;
        }
        this.spriteNumber %= this.sprites.length;
        this.indexSprite(this.spriteNumber);
        return this
    }

    isOn(otherBody) {
        if (!this.isAlive) {
            return false
        }

        //precalculate collision contour of otherBody to glabal coordinates
        let polygon = [];
        otherBody.sprites[otherBody.spriteNumber].cut
            .forEach(x => polygon.push([x[0] + otherBody.x, x[1] + otherBody.y]));

        //check if at least one point of this collision contour
        //is inside of otherBody's collision contour
        for (let i = 0; i < this.sprites[this.spriteNumber].cut.length; i++) {
            let element = this.sprites[this.spriteNumber].cut[i].slice();
            element[0] += this.x; // set cutting x
            element[1] += this.y; // set cutting y
            if (this._isPointInPoligon(element, polygon)) {
                return true
            }
        }

        return false
    }

    _getTime() {
        this._startTime++;

        if (this._startTime < this._speed) {
            return true
        }

        this._startTime = 0;
        return false;
    }

    drawCollisionStroke() {
        this.context.beginPath();
        this.context.moveTo
            (
            this.x + this.sprites[0].cut[0][0],
            this.y + this.sprites[0].cut[0][1]
            );
        this.sprites[0].cut.
            forEach(x => this.context.lineTo(this.x + x[0], this.y + x[1]));
        this.context.closePath();
        this.context.strokeStyle = "red";
        this.context.stroke();
    }

    _isPointInPoligon(point, vs) {
        // ray-casting algorithm based on
        // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

        var x = point[0], y = point[1];

        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i][0], yi = vs[i][1];
            var xj = vs[j][0], yj = vs[j][1];

            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    };
}