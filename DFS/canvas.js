let canvas = document.getElementById("canvas");
canvas.width = 1200;
canvas.height = 720;

let c = canvas.getContext('2d');

const init = () => {
    dfs = new DFS(0.1, 60, 75);
}

let i = 0;

const draw = () => {
    dfs.display(); 
    if (i % 5 == 0) dfs.goOn();
    i++;
    requestAnimationFrame(draw);
}

init();
draw();

