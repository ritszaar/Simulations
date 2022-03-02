let canvas = document.getElementById('canvas');
canvas.width = 1000;
canvas.height = 500;

let c = canvas.getContext('2d');

function t1(z) {
    let a = Complex.sub(Complex.pow(z, 2), new Complex(1, 0));
    let b = Complex.pow(Complex.sub(z, new Complex(2, 1)), 2);
    let num = Complex.mult(a, b);
    let den = Complex.add(Complex.pow(z, 2), new Complex(2, 2));
    let tz = Complex.div(num, den);
    return tz;
}

function t2(z) {
    return Complex.sub(z, Complex.invert(z));
}

let world = new CFunction(3, 3, canvas.width/2, canvas.height, t1);
world.display();
