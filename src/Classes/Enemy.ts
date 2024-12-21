import { enemyTypes, gameState } from "../Shared.js";
import { getRandomInt } from "../Helpers.js";
import { enemyList } from "../Engine.js";
import type { EnemyType, GameState } from "../Shared.js";

export class Enemy {
    public y: number;
    public x: number;
    public height: number;
    public width: number;
    public enemyType: EnemyType;
    public currentHealth: number;
    public maxHealth: number;
    public name: string;
    public isAttacking: boolean;
    public attackSpeed: number;
    public color: string;

    constructor(enemyType = "normal") {
        this.enemyType = enemyTypes[enemyType];
        this.name = enemyType;
        this.y = getRandomInt(
            this.enemyType.height + 15,
            window.innerHeight - this.enemyType.height - 15
        );
        this.x = window.innerWidth;
        this.height = this.enemyType.height;
        this.width = this.enemyType.width;
        this.attackSpeed = this.enemyType.attackSpeed;
        this.currentHealth = this.enemyType.health;
        this.maxHealth = this.enemyType.health;
        this.color = this.enemyType.color;
        this.isAttacking = false;
    }

    draw(pen: CanvasRenderingContext2D): void {
        pen.fillStyle = this.color;
        pen.fillRect(this.x, this.y, this.width, this.height);

        // Drawing a health bar above the enemy
        pen.fillStyle = "black";
        pen.fillRect(this.x - 1, this.y - 16, this.width + 2, 7);
        pen.fillStyle = "red";
        const percentageHealth = (this.width * this.currentHealth) / this.maxHealth;
        pen.fillRect(this.x, this.y - 15, percentageHealth >= 0 ? percentageHealth : 0, 5);
    }

    move(): void {
        if (this.x > 235) {
            this.x -= this.enemyType.speed;
        } else {
            if (!this.isAttacking) {
                this.doDamage();
            }
            this.isAttacking = true;
        }
    }

    doDamage(): void {
        // console.log(`Enemy ${this.name} is attacking the wall for ${this.enemyType.damage} damage`);
        gameState.wallHealth -= this.enemyType.damage;

        // Animation for the enemy attacking
        const originalX = this.x;
        this.x -= 3;
        setTimeout(() => {
            this.x = originalX;
        }, 50);
    }

    takeDamage(damage: number): void {
        this.currentHealth -= damage;
        if (this.currentHealth <= 0) {
            gameState.score += this.enemyType.points;
            gameState.enemiesKilled++;
        } else {
            // Flash white when taking damage
            const originalColor = this.color;
            this.color = "white";
            setTimeout(() => {
                this.color = originalColor;
            }, 75);
        }
    }
}
