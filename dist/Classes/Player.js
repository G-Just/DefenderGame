import { pen, CANVAS_HEIGHT } from "../Shared.js";
export class Player {
    constructor() {
        this.heroImage = new Image();
        this.heroImage.src = "./dist/Art/Sprites/hero.png";
        this.width = this.heroImage.width * 1.5;
        this.height = this.heroImage.height * 1.5;
        this.y = CANVAS_HEIGHT / 2 - this.height / 2;
        this.x = 90 - this.width / 2;
    }
    getPosition() {
        return { x: this.x, y: this.y };
    }
    draw() {
        pen.drawImage(this.heroImage, this.x, this.y, this.width, this.height);
    }
}
