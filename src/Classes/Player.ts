export class Player {
    public y: number;
    public x: number;
    public height: number;
    public width: number;

    constructor(height: number = 50, width: number = 40) {
        this.y = window.innerHeight / 2 - height / 2;
        this.x = 90 - width / 2;
        this.height = height;
        this.width = width;
    }

    draw(pen: CanvasRenderingContext2D): void {
        pen.fillStyle = "white";
        pen.fillRect(this.x, this.y, this.width, this.height);
    }
}
