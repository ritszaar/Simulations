function getHue(angle) {
    if (angle >= 0) return angle * 180/Math.PI;
    else return (angle + 2 * Math.PI) * 180/Math.PI;
}

function getBrightness(r) {
    return Math.pow(r, 1)/(1 + Math.pow(r, 1));
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


class Field {

    constructor(charges) {
        this.charges = charges;
        this.pixels = c.createImageData(canvas.width, canvas.height);
        this.assignPixels();
    }

    assignPixels() {
        for (let x = 0; x < canvas.width; x++) {
            for (let y = 0; y < canvas.height; y++) {
                let totalE = new Vector(0, 0, 0);
                for (let charge of charges) totalE.add(charge.getFieldAt(new Vector(x, y, 0)));

                let h = getHue(-totalE.heading2D());
                let s = 1;
                let b = getBrightness(totalE.getMag());
                let color = hsbToRgb(h, s, b);
                let i = 4 * (x + y * canvas.width);
                this.pixels.data[i]     = color.r;
                this.pixels.data[i + 1] = color.g;
                this.pixels.data[i + 2] = color.b;
                this.pixels.data[i + 3] = 255;
            }
        }
    }

    display() {
        c.putImageData(this.pixels, 0, 0);
        for (let charge of charges) {
            charge.UI();
            charge.display();
        }
    }

    UI() {
        let found = false;
        for (let charge of charges) {
            let x = charge.position.x;
            let y = charge.position.y;
            let d = Math.sqrt(Math.pow(x - mouse.x, 2) + Math.pow(y - mouse.y, 2));
            if (d < charge.r) {
                charge.isBeingMoved = !charge.isBeingMoved;
                found = true;
                break;
            }
        }
        if (!found) {
            this.charges.push(new Charge(mouse.x, mouse.y, Math.random() * 200 - 100));
        }
    }
}