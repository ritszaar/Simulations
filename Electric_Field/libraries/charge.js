function getNormalisedValue(x) {
    return (2/Math.PI) * Math.atan(x);
}


class Charge {

    constructor(x, y, value) {
        this.position = new Vector(x, y, 0);
        this.value = value;
        this.r = Math.sqrt(map(Math.abs(this.value), 0, 100, 0, 625));
        this.isPositive = true;
        this.isBeingMoved = false;
        if (this.value < 0) this.isPositive = false;
    }

    getFieldAt(point) {
        let field = Vector.subtract(point, this.position);
        let distance = field.getMag();
        if (distance < 1) return new Vector(0, 0, 0);
        field.normalize();
        let multiplier = k * this.value / Math.pow(distance, 2);
        field.mult(multiplier);
        return field;
    }

    display() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI);
        c.fillStyle = 'rgb(255, 0, 0)';
        c.strokeStyle = 'rgb(0, 0, 0)';
        c.lineWidth = 1;
        if (!this.isPositive) c.fillStyle = 'rgb(0, 0, 255)';
        c.fill();
        c.stroke();
        c.closePath();

        c.beginPath();
        c.moveTo(this.position.x - this.r/2, this.position.y);
        c.lineTo(this.position.x + this.r/2, this.position.y);
        if (this.isPositive) {
            c.moveTo(this.position.x, this.position.y - this.r/2);
            c.lineTo(this.position.x, this.position.y + this.r/2);
        }
        c.strokeStyle = 'rgb(0, 0, 0)';
        c.lineWidth = 3;
        c.stroke();
        c.closePath();
    }

    UI() {
        if (this.isBeingMoved) {
            this.position.x = mouse.x;
            this.position.y = mouse.y;
        }
    }
}