import { pen } from "../Shared.js";
export class Player {
    constructor(height = 50, width = 40) {
        this.y = window.innerHeight / 2 - height / 2;
        this.x = 90 - width / 2;
        this.height = height;
        this.width = width;
        this.heroImage = new Image();
        this.heroImage.src = "./dist/Art/Sprites/hero.png";
    }
    getPosition() {
        return { x: this.x, y: this.y };
    }
    draw() {
        pen.drawImage(this.heroImage, this.x, this.y, this.width, this.height);
    }
}
