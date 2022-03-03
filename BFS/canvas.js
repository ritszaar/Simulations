let canvas = document.getElementById("canvas");
canvas.width = 1200;
canvas.height = 720;

let c = canvas.getContext('2d');

let bfs;

const init = () => {
    bfs = new BFS(0, 60, 75);
}

const draw = () => {
    bfs.display(); 
    bfs.goOn();
    requestAnimationFrame(draw);
}

init();
draw();