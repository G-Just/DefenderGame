export class Player {
    constructor(height = 50, width = 40) {
        this.y = window.innerHeight / 2 - height / 2;
        this.x = 90 - width / 2;
        this.height = height;
        this.width = width;
    }
    draw(pen) {
        pen.fillStyle = "white";
        pen.fillRect(this.x, this.y, this.width, this.height);
    }
}
