import { pen } from "../Shared.js";

export class Player {
    private y: number;
    private x: number;
    private height: number;
    private width: number;
    private heroImage: HTMLImageElement;

    constructor(height: number = 50, width: number = 40) {
        this.y = window.innerHeight / 2 - height / 2;
        this.x = 90 - width / 2;
        this.height = height;
        this.width = width;
        this.heroImage = new Image();
        this.heroImage.src = "./dist/Art/Sprites/hero.png";
    }

    getPosition(): { x: number; y: number } {
        return { x: this.x, y: this.y };
    }

    draw(): void {
        pen.drawImage(this.heroImage, this.x, this.y, this.width, this.height);
    }
}
