let k = 100;


let canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;

let c = canvas.getContext('2d');

let charges = [];
//charges.push(new Charge(200, 400, -20));
charges.push(new Charge(canvas.width/2 - 200, canvas.height/2, -100));
charges.push(new Charge(canvas.width/2 + 200, canvas.height/2, 100));


let mouse = {
    x: undefined,
    y: undefined,
}

let field;

function init() {
    field = new Field(charges);
}

function draw() {
    field.assignPixels();
    field.display();
    requestAnimationFrame(draw);
}

init();
draw();

window.addEventListener('mousemove',
    function (event) {
        let domRect = canvas.getBoundingClientRect();
        mouse.x = event.x - domRect.x;
        mouse.y = event.y - domRect.y;
    }
)

window.addEventListener('mousedown',
    function () {
        field.UI();
    }
);