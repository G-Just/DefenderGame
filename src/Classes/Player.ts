import { CANVAS_HEIGHT, pen } from "../Shared/General.js";

export class Player {
    private y: number = 0;
    private x: number = 0;
    private height: number = 0;
    private width: number = 0;
    private heroImage: HTMLImageElement;

    constructor() {
        this.heroImage = new Image();
        this.heroImage.src = "./dist/Art/Sprites/hero.png";
        this.heroImage.onload = () => {
            this.width = this.heroImage.width * 1.5;
            this.height = this.heroImage.height * 1.5;
            this.y = CANVAS_HEIGHT / 2 - this.height / 2;
            this.x = 90 - this.width / 2;
        };
    }

    getPosition(): { x: number; y: number } {
        return { x: this.x, y: this.y };
    }

    draw(): void {
        pen.drawImage(this.heroImage, this.x, this.y, this.width, this.height);
    }
}
