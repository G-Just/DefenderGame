export class Wall {
    constructor() {
        this.x = 200;
        this.y = 0;
        this.width = 20;
        this.height = window.innerHeight;
    }
    draw(pen) {
        pen.fillStyle = "gray";
        pen.fillRect(this.x, this.y, this.width, this.height);
    }
}
