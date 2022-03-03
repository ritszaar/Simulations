class BFS {

    constructor(probability, rows, cols) {
        this.probability = probability;
        this.rows = rows;
        this.cols = cols;
        this.xRes = canvas.width / this.cols;
        this.yRes = canvas.height / this.rows;
        this.verticesVisited = 0;
        this.queue = [];
        this.colors = [];
        this.isVisited = [];
        this.current = 0;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let isBlocked = Math.random() < probability;
                let color = isBlocked ? {h: 0, s: 0, l: 0} : {h: 360, s: 100, l: 100};
                this.colors.push(color);
                this.isVisited.push(isBlocked);
            }
        }
        this.verticesVisited++;
        this.colors[0] = {h: 180, s: 100, l: 50};
        this.isVisited[0] = true;
        this.queue.push(0);
    }

    display() {
        c.strokeStyle = "hsl(0, 0%, 0%)";
        c.beginPath();
        for (let j = 0; j <= this.cols; j++) {
            let x = j * this.yRes;
            c.moveTo(x, 0);
            c.lineTo(x, canvas.height);
        }
        c.stroke();
        c.closePath();

        c.strokeStyle = "hsl(0, 0%, 0%)";
        c.beginPath();
        for (let i = 0; i <= this.rows; i++) {
            let y = i * this.yRes;
            c.moveTo(0, y);
            c.lineTo(canvas.width, y);
        }
        c.stroke();
        c.closePath();

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let color = this.colors[this.index(i, j)];
                c.fillStyle = `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
                if (this.index(i, j) == this.current) {
                    c.fillStyle = `rgb(120, 10, 120)`;
                }
                c.fillRect(j * this.xRes + 1, i * this.yRes + 1, this.xRes - 1, this.yRes - 1);
            }
        }
    }

    goOn() {
        if (this.queue.length > 0) {
            let u = this.queue.shift();
            this.current = u;
            let i = Math.floor(u / this.cols);
            let j = u % this.cols;
            for (let di = -1; di <= 1; di++) {
                for (let dj = -1; dj <= 1; dj++) {
                    if (Math.abs(di) + Math.abs(dj) == 2) continue;
                    let nI = i + di, nJ = j + dj;
                    console.log(i, j, nI, nJ);
                    let v = this.index(nI, nJ);
                    if (this.isValid(nI, nJ) && !this.isVisited[v]) {
                        this.verticesVisited++;
                        this.colors[v] = this.getHsb();
                        this.isVisited[v] = true;
                        this.queue.push(v);
                    }
                } 
            }
        }
    }

    index(i, j) {
        return i * this.cols + j;
    }

    isValid(i, j) {
        return (i >= 0 && i < this.rows && j >= 0 && j < this.cols);
    }

    getHsb() {
        let hue = Math.floor(this.verticesVisited * 320 / (this.rows * this.cols));
        return {h: hue, s: 100, l: 50};
    }
}