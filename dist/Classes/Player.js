import { CANVAS_HEIGHT, pen } from "../Shared/General.js";
export class Player {
    constructor() {
        this.y = 0;
        this.x = 0;
        this.height = 0;
        this.width = 0;
        this.heroImage = new Image();
        this.heroImage.src = "./dist/Art/Sprites/hero.png";
        this.heroImage.onload = () => {
            this.width = this.heroImage.width * 1.5;
            this.height = this.heroImage.height * 1.5;
            this.y = CANVAS_HEIGHT / 2 - this.height / 2;
            this.x = 90 - this.width / 2;
        };
    }
    getPosition() {
        return { x: this.x, y: this.y };
    }
    draw() {
        pen.drawImage(this.heroImage, this.x, this.y, this.width, this.height);
    }
}
