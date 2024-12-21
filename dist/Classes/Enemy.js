import { enemyTypes, gameState } from "../Shared.js";
import { getRandomInt } from "../Helpers.js";
export class Enemy {
    constructor(enemyType = "normal") {
        this.enemyType = enemyTypes[enemyType];
        this.name = enemyType;
        this.y = getRandomInt(this.enemyType.height + 15, window.innerHeight - this.enemyType.height - 15);
        this.x = window.innerWidth;
        this.height = this.enemyType.height;
        this.width = this.enemyType.width;
        this.attackSpeed = this.enemyType.attackSpeed;
        this.currentHealth = this.enemyType.health;
        this.maxHealth = this.enemyType.health;
        this.color = this.enemyType.color;
        this.isAttacking = false;
    }
    draw(pen) {
        pen.fillStyle = this.color;
        pen.fillRect(this.x, this.y, this.width, this.height);
        // Drawing a health bar above the enemy
        pen.fillStyle = "black";
        pen.fillRect(this.x - 1, this.y - 16, this.width + 2, 7);
        pen.fillStyle = "red";
        const percentageHealth = (this.width * this.currentHealth) / this.maxHealth;
        pen.fillRect(this.x, this.y - 15, percentageHealth >= 0 ? percentageHealth : 0, 5);
    }
    move() {
        if (this.x > 235) {
            this.x -= this.enemyType.speed;
        }
        else {
            if (!this.isAttacking) {
                this.doDamage();
            }
            this.isAttacking = true;
        }
    }
    doDamage() {
        // console.log(`Enemy ${this.name} is attacking the wall for ${this.enemyType.damage} damage`);
        gameState.wallHealth -= this.enemyType.damage;
        // Animation for the enemy attacking
        const originalX = this.x;
        this.x -= 3;
        setTimeout(() => {
            this.x = originalX;
        }, 50);
    }
    takeDamage(damage) {
        this.currentHealth -= damage;
        if (this.currentHealth <= 0) {
            gameState.score += this.enemyType.points;
            gameState.enemiesKilled++;
        }
        else {
            // Flash white when taking damage
            const originalColor = this.color;
            this.color = "white";
            setTimeout(() => {
                this.color = originalColor;
            }, 75);
        }
    }
}
