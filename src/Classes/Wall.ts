export class Wall {
    public y: number;
    public x: number;
    public height: number;
    public width: number;

    constructor() {
        this.x = 200;
        this.y = 0;
        this.width = 20;
        this.height = window.innerHeight;
    }
    draw(pen: CanvasRenderingContext2D): void {
        pen.fillStyle = "gray";
        pen.fillRect(this.x, this.y, this.width, this.height);
    }
}
