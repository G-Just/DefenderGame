import { enemyTypes, gameState, wall, pen, enemyList, CANVAS_WIDTH, CANVAS_HEIGHT } from "../Shared.js";
import { getRandomInt } from "../Helpers.js";
export class Enemy {
    constructor(enemyType = "normal") {
        this.damageTimeout = null;
        this.isFlashing = false;
        this.isAttacking = false;
        this.enemyType = enemyTypes[enemyType];
        this.name = enemyType;
        this.y = getRandomInt(this.enemyType.height + 15, CANVAS_HEIGHT - this.enemyType.height - 15);
        this.movementSpeed = this.enemyType.speed;
        this.x = CANVAS_WIDTH;
        this.height = this.enemyType.height;
        this.width = this.enemyType.width;
        this.damage = this.enemyType.damage;
        this.attackSpeed = this.enemyType.attackSpeed;
        this.currentHealth = this.enemyType.health;
        this.maxHealth = this.enemyType.health;
        this.color = this.enemyType.color;
        this.xpDrop = this.enemyType.xpDrop;
        this.pointsDrop = this.enemyType.points;
    }
    // ============= Getters =============
    getHealth() {
        return this.currentHealth;
    }
    getPosition() {
        return { x: this.x, y: this.y };
    }
    getSize() {
        return { width: this.width, height: this.height };
    }
    getMovementSpeed() {
        return this.movementSpeed;
    }
    getAttackSpeed() {
        return this.attackSpeed;
    }
    getName() {
        return this.name;
    }
    getDamage() {
        return this.damage;
    }
    getXpDrop() {
        return this.xpDrop;
    }
    getIsAttacking() {
        return this.isAttacking;
    }
    // ============= Setters =============
    setMovementSpeed(movementSpeed) {
        this.movementSpeed = movementSpeed;
    }
    setXpDrop(xpDrop) {
        this.xpDrop = Math.round(xpDrop);
    }
    // ============= Other Methods =============
    draw() {
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
            this.x -= this.movementSpeed;
        }
        else {
            this.isAttacking = true;
        }
    }
    doDamage() {
        // console.log(`Enemy ${this.name} is attacking the wall for ${this.enemyType.damage} damage`);
        wall.takeDamage(this.damage);
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
            gameState.score += Math.round(this.pointsDrop);
            gameState.currentXp += Math.round(this.xpDrop);
            gameState.enemiesKilled++;
            enemyList.splice(enemyList.indexOf(this), 1);
        }
        else {
            // Flash white when taking damage
            this.color = "white";
            setTimeout(() => {
                this.color = this.enemyType.color; // This has to be enemyTypeColor to avoid "white bug"
            }, 75);
        }
    }
}
