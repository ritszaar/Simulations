let canvas = document.getElementById("canvas");
canvas.width = 1200;
canvas.height = 720;

let c = canvas.getContext('2d');

let dfs;

const init = () => {
    dfs = new DFS(0.1, 60, 75);
}

const draw = () => {
    dfs.display(); 
    dfs.goOn();
    requestAnimationFrame(draw);
}

init();
draw();

