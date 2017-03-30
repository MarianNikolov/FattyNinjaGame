const Validator = {
    Number(n) {
        if (typeof n !== 'number') {
            throw Error('must be number')
        }
    },
    SizeOfBoard(value) {
        this.Number(value.left);
        this.Number(value.right);
        this.Number(value.up);
        this.Number(value.down);
        if (value.left >= value.right || value.up >= value.down) {
            throw Error('impossible Reversed value');
        }
    },
    NotNullArray(value) {
        if (!Array.isArray(value) || value.length < 1) {
            // full validation of sprites
            throw Error('images must be not null array');
        }
    },
    Shapes(value) {
        this.NotNullArray(value);
        value.forEach(x => this.NotNullArray(x));
    }
}