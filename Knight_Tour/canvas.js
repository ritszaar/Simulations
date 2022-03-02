let canvas, c;
let knight = new Image();
knight.src = 'knight.png';

knight.addEventListener('load',
    function () {
        canvas = document.getElementById('canvas');
        canvas.width  = 600;
        canvas.height = 600;

        c = canvas.getContext('2d');
        c.fillStyle = 'rgb(0, 0, 0)';
        c.fillRect(0, 0, canvas.width, canvas.height);

        let tour = new Tour(10);

        tour.display();

        window.addEventListener('mousedown',
            function () {
                tour.goOn();
                tour.display();
            }
        );
    }
);