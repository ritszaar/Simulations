class Vector {

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    copy() {
        return new Vector(this.x, this.y, this.z);
    }

    static copy(v) {
        return new Vector(v.x, v.y, v.z);
    }

    static fromAngle(angle) {
        return new Vector(Math.cos(angle), Math.sin(angle), 0);
    }

    static fromRandom2D() {
        let angle = Math.random() * Math.PI * 2;
        return new Vector(Math.cos(angle), Math.sin(angle), 0);
    }

    normalize() {
        let len = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
        this.x /= len;
        this.y /= len;
        this.z /= len;
    }

    static normalize(v) {
        let len = Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2) + Math.pow(v.z, 2));
        return new Vector(v.x/len, v.y/len, v.z/len);
    }

    scale(val) {
        this.x *= val;
        this.y *= val;
        this.z *= val;
    }

    static scale(v, val) {
        return new Vector(v.x * val, v.y * val, v.z * val);
    }

    mult(val) {
        this.x *= val;
        this.y *= val;
        this.z *= val;
    }

    static mult(v, val) {
        return new Vector(v.x * val, v.y * val, v.z * val);
    }

    setMag(val) {
        this.normalize();
        this.scale(val);
    }

    static setMag(v, val) {
        let newV = Vector.normalize(v);
        newV.scale(val);
        return newV;
    }

    getMag() {
        let len = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
        return len;
    }

    heading2D() {
        if (this.x == 0) {
            if (this.y > 0) return Math.PI/2;
            else return -Math.PI/2;
        }
        if (this.y == 0) {
            if (this.x > 0) return 0;
            else return Math.PI;
        }
        let angle = Math.atan(Math.abs(this.y/this.x));
        if (this.x > 0 && this.y < 0) angle *= -1;
        if (this.x < 0 && this.y > 0) angle = Math.PI - angle;
        if (this.x < 0 && this.y < 0) angle = -(Math.PI - angle);
        return angle;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
    }

    static add(a, b) {
        return new Vector(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
    }

    static subtract(a, b) {
        return new Vector(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    dotProduct(v) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
    }

    static dotProduct(a, b) {
        return new Vector(a.x * b.x, a.y * b.y, a.z * b.z);
    }

    crossProduct(v) {
        let tx = this.x;
        let ty = this.y;
        let tz = this.z;
        this.x = ty * v.z - tz * v.y;
        this.y = tz * v.x - tx * v.z;
        this.z = tx * v.y - ty * v.x;
    }

    static crossProduct(a, b) {
        let newX = a.y * b.z - a.z * b.y;
        let newY = a.z * b.x - a.x * b.z;
        let newZ = a.x * b.y - a.y * b.x;
        return new Vector(newX, newY, newZ);
    }

    limit(val) {
        let len = this.getMag();
        if (len > val) this.setMag(val);
    }
}