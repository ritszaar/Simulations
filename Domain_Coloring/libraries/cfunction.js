function getBrightness(r) {
    return (2/Math.PI) * Math.atan(r);
}

function getHue(angle) {
    if (angle >= 0) return angle * 180/Math.PI;
    else return (angle + 2 * Math.PI) * 180/Math.PI;
}

function map(x, a, b, c, d) {
    return (c - d) * (x - a)/(a - b) + c;
}

function hsbToRgb(h, s, b) {
    let c = b * s;
    let x = c * (1 - Math.abs(h/60 % 2 - 1));
    let m = b - c;

    let tcolor = {tr: 0, tg: 0, tb: 0};

    if (h < 60) {
        tcolor.tr = c;
        tcolor.tg = x;
        tcolor.tb = 0;
    }
    else if (h < 120) {
        tcolor.tr = x;
        tcolor.tg = c;
        tcolor.tb = 0;
    }
    else if (h < 180) {
        tcolor.tr = 0;
        tcolor.tg = c;
        tcolor.tb = x;
    }
    else if (h < 240) {
        tcolor.tr = 0;
        tcolor.tg = x;
        tcolor.tb = c;
    }
    else if (h < 300) {
        tcolor.tr = x;
        tcolor.tg = 0;
        tcolor.tb = c;
    }
    else {
        tcolor.tr = c;
        tcolor.tg = 0;
        tcolor.tb = x;
    }

    let color = {
        r: Math.floor((tcolor.tr + m) * 255),
        g: Math.floor((tcolor.tg + m) * 255),
        b: Math.floor((tcolor.tb + m) * 255)
    };
    return color;
}

class CFunction {

    constructor(maxX, maxY, width, height, transform) {
        this.maxX = maxX;
        this.maxY = maxY;
        this.width = width;
        this.height = height;
        this.domainPixels = c.createImageData(this.width, this.height);
        this.rangePixels  = c.createImageData(this.width, this.height);
        this.transform = transform;

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let i = 4 * (x + y * this.width);
                let point = this.pixelsToWorld(x, y);
                let z  = new Complex(point.x, point.y);
                let tz = this.transform(z);
                let h = getHue(z.arg()); // 0 - 360
                let s = 1; // Maximum
                let b = getBrightness(z.mod());
                let color = hsbToRgb(h, s, b);
                this.domainPixels.data[i] = color.r;
                this.domainPixels.data[i + 1] = color.g;
                this.domainPixels.data[i + 2] = color.b;
                this.domainPixels.data[i + 3] = 255;
                h = getHue(tz.arg());
                s = 1;
                b = getBrightness(tz.mod());
                color = hsbToRgb(h, s, b);
                this.rangePixels.data[i] = color.r;
                this.rangePixels.data[i + 1] = color.g;
                this.rangePixels.data[i + 2] = color.b;
                this.rangePixels.data[i + 3] = 255;
            }
        }
    }

    display() {
        c.putImageData(this.domainPixels, 0, 0);
        c.putImageData(this.rangePixels, this.width, 0);
    }

    pixelsToWorld(x, y) {
        let newX = map(x, 0, this.width, -this.maxX, this.maxX);
        let newY = map(y, 0, this.height, this.maxY, -this.maxY);
        let point = {x: newX, y: newY};
        return point;
    }

    worldToPixels(x, y) {
        let newX = map(x, -this.maxX, this.maxX, 0, this.width);
        let newY = map(y, this.maxY, -this.maxY, 0, this.height);
        let point = {x: newX, y: newY};
        return point;
    }
}
