class Complex {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static fromPolar(r, theta) {
        return new Complex(r * Math.cos(theta), r * Math.sin(theta));
    }

    static fromPolarInDegrees(r, angle) {
        let theta = Math.PI * angle/180;
        return Complex.fromPolar(r, theta);
    }

    display() {
        console.log(this.x + ' + ' + this.y + 'i');
    }

    real() {
        return this.x;
    }

    img() {
        return this.y;
    }

    mod() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    modSq() {
        return (this.x * this.x + this.y * this.y);
    }

    arg() {
        if (this.x == 0) {
            if (this.y > 0) return Math.PI/2;
            else return -Math.PI/2;
        }
        if (this.y == 0) {
            if (this.x > 0) return 0;
            else return -Math.PI;
        }
        let theta = Math.atan(Math.abs(this.y/this.x));
        if (this.x < 0 && this.y > 0) theta = Math.PI - theta;
        if (this.x < 0 && this.y < 0) theta = theta - Math.PI;
        if (this.x > 0 && this.y < 0) theta = -theta;
        return theta;
    }

    argInRadians() {
        let theta = this.arg();
        return (180 * theta/Math.PI);
    }

    copy() {
        return new Complex(this.x, this.y);
    }

    static copy(a) {
        return new Complex(a.x, a.y);
    }

    equals(b) {
        let tolerance = 1e-12;
        return (Math.abs(this.x - b.x)  < tolerance && Math.abs(this.y - b.y) < tolerance);
    }

    static equals(b) {
        let tolerance = 1e-12;
        return (Math.abs(a.x - b.x)  < tolerance && Math.abs(a.y - b.y) < tolerance);
    }

    conjugate() {
        this.y *= - 1;
    }

    static conjugate(a) {
        return new Complex(a.x, -a.y);
    }

    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }

    static scale(a, scalar) {
        return new Complex(a.x * scalar, a.y * scalar);
    }

    add(b) {
        this.x += b.x;
        this.y += b.y;
    }

    static add(a, b) {
        return new Complex(a.x + b.x, a.y + b.y);
    }

    sub(b) {
        this.x -= b.x;
        this.y -= b.y;
    }

    static sub(a, b) {
        return new Complex(a.x - b.x, a.y - b.y);
    }

    mult(b) {
        let tx = this.x;
        let ty = this.y;
        this.x = tx * b.x - ty * b.y;
        this.y = tx * b.y + ty * b.x;
    }

    static mult(a, b) {
        return new Complex(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
    }

    div(b) {
        let den = b.modSq();
        let numx = this.x * b.x + this.y * b.y;
        let numy = this.y * b.x - this.x * b.y;
        this.x = numx/den;
        this.y = numy/den;
    }

    static div(a, b) {
        let den = b.modSq();
        let numx = a.x * b.x + a.y * b.y;
        let numy = a.y * b.x - a.x * b.y;
        return new Complex(numx/den, numy/den);
    }

    pow(n) {
        let t = this.copy();
        for (let i = 1; i < n; i++) {
            t = Complex.mult(t, t);
        }
        this.x = t.x;
        this.y = t.y;
    }

    static pow(a, n) {
        let t = a.copy();
        for (let i = 1; i < n; i++) {
            t = Complex.mult(t, t);
        }
        return new Complex(t.x, t.y);
    }

    invert() {
        let b = new Complex(1, 0);
        let c = Complex.div(b, this);
        this.x = c.x;
        this.y = c.y;
    }

    static invert(a) {
        let b = new Complex(1, 0);
        let c = Complex.div(b, a);
        return new Complex(c.x, c.y);
    }

    rotate(theta) {
        let b = new Complex(Math.cos(theta), Math.sin(theta));
        this.mult(b);
    }

    static rotate(a, theta) {
        let b = new Complex(Math.cos(theta), Math.sin(theta));
        return Complex.mult(a, b);
    }

    rotateInDegrees(angle) {
        let theta = (Math.PI * angle/180);
        this.rotate(theta);
    }

    static rotateInDegrees(a, angle) {
        let theta = (Math.PI * angle/180);
        return Complex.rotate(a, theta);
    }

    dist(b) {
        return Math.sqrt(Math.pow(this.x - b.x, 2) + Math.pow(this.y - b.y, 2));
    }

    static dist(a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }

    distSq(b) {
        return Math.pow(this.x - b.x, 2) + Math.pow(this.y - b.y, 2);
    }

    static distSq(a, b) {
       return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
    }
}
