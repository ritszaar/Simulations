class Tour {

    constructor(n) {
        this.n = n;
        this.x_size = canvas.width/this.n;
        this.y_size = canvas.height/this.n;
        this.isVisited = [];
        for (let i = 0; i < this.n; i++) {
            this.isVisited[i] = [];
            for (let j = 0; j < this.n; j++) {
                this.isVisited[i][j] = false;
            }
        }
        this.current_i = Math.floor(Math.random() * this.n);
        this.current_j = Math.floor(Math.random() * this.n);
        this.initial_i = this.current_i;
        this.initial_j = this.current_j;
        this.isVisited[this.initial_i][this.initial_j] = true;

        this.path = [];
        this.path.push({row: this.current_i, col: this.current_j});
        this.isFinished = false;
    }

    display() {
        for (let i = 0; i < this.n; i++) {
            for (let  j = 0; j < this.n; j++) {
                let x = j * this.x_size;
                let y = i * this.y_size;
                if ((i + j) % 2 == 0) c.fillStyle = 'rgb(255, 255, 255)';
                else c.fillStyle = 'rgb(0, 0, 0)';
                c.fillRect(x, y, this.x_size, this.y_size);
            }
        }

        let x = 0, y = 0;
        c.fillStyle = 'rgb(255, 0, 0)';
        c.strokeStyle = 'rgb(255, 0, 0)';
        c.lineWidth = 1;

        c.fillStyle = 'rgb(255, 0, 0)';

        c.beginPath();
        for (let i = 1; i < this.path.length - 1; i++) {
            x = this.path[i].col * this.x_size + this.x_size/2;
            y = this.path[i].row * this.y_size + this.y_size/2;
            c.moveTo(x, y);
            c.arc(x, y, 5, 0, 2 * Math.PI);
        }
        c.fill();
        c.closePath();

        c.beginPath();
        x = this.initial_j * this.x_size + this.x_size/2;
        y = this.initial_i * this.y_size + this.y_size/2;
        c.moveTo(x, y);
        for (let i = 1; i < this.path.length; i++) {
            x = this.path[i].col * this.x_size + this.x_size/2;
            y = this.path[i].row * this.y_size + this.y_size/2;
            c.lineTo(x, y);
            c.stroke();
        }
        c.closePath();

        c.beginPath()
        x = this.initial_j * this.x_size + this.x_size/2;
        y = this.initial_i * this.y_size + this.y_size/2;
        c.moveTo(x, y);
        c.arc(x, y, 5, 0, 2 * Math.PI);
        c.fillStyle = 'rgb(0, 255, 0)';
        c.fill();
        c.closePath();

        x = this.path[this.path.length - 1].col * this.x_size;
        y = this.path[this.path.length - 1].row * this.y_size;
        c.drawImage(knight, x, y, this.x_size, this.y_size);
    }

    goOn() {
        if (this.isFinished) return;
        let minDegree = 10;
        let next_row = -1;
        let next_col = -1;
        for (let i = -2; i <= 2; i++) {
            for (let j = -2; j <= 2; j++) {
                let row = this.current_i + i;
                let col = this.current_j + j;
                if ((Math.abs(i) + Math.abs(j)) == 3 && this.valid(row, col)) {
                    if (!this.isVisited[row][col]) {
                        let degree = this.calDegree(row, col);
                        if (degree < minDegree) {
                            minDegree = degree;
                            next_row = row;
                            next_col = col;
                        }
                    }
                }
            }
        }
        if (!this.valid(next_row, next_col)) {
            this.isFinished = true;
            return;
        }
        this.path.push({row: next_row, col: next_col});
        this.current_i = next_row;
        this.current_j = next_col;
        this.isVisited[this.current_i][this.current_j] = true;
    }

    calDegree(row, col) {
        let degree = 0;
        for (let i = -2; i <= 2; i++) {
            for (let j = -2; j <= 2; j++) {
                if ((Math.abs(i) + Math.abs(j)) == 3 && this.valid(row + i, col + j)) {
                    if (!this.isVisited[row + i][col + j]) degree++;
                }
            }
        }
        return degree;
    }

    valid(i, j) {
        return (i >= 0 && i < this.n && j >= 0 && j < this.n);
    }
}