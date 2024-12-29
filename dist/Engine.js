import { Enemy } from "./Classes/Enemy.js";
import { LevelUp } from "./Classes/LevelUp.js";
import { Weapon } from "./Classes/Weapon.js";
import { canvas, CANVAS_HEIGHT, CANVAS_WIDTH, FPS, pen } from "./Shared/General.js";
import { getRandomWeightedEnemyType, getRandomInt } from "./Shared/Helpers.js";
import { enemyList, gameState, player, projectileList, wall, weaponList } from "./Shared/States.js";
let isGameRunning = false;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
const background = new Image();
background.src = "./dist/Art/Sprites/background.png";
setInterval(() => {
    if (!gameState.gamePaused) {
        enemyList.push(new Enemy(getRandomWeightedEnemyType()));
    }
}, getRandomInt(1000, 10000));
weaponList.push(new Weapon("bow"));
function drawLoop() {
    const interval = 1000 / FPS;
    let lastTime = 0;
    function drawLoop(currentTime) {
        if (gameState.gamePaused) {
            return;
        }
        const deltaTime = currentTime - lastTime;
        if (deltaTime > interval) {
            lastTime = currentTime - (deltaTime % interval);
            pen.clearRect(0, 0, canvas.width, canvas.height);
            pen.drawImage(background, 0, 0, canvas.width, canvas.height);
            pen.fillStyle = "black";
            pen.font = "20px Consolas";
            pen.fillText(`Score: ${gameState.score}`, CANVAS_WIDTH - 200, 30);
            pen.fillStyle = "black";
            pen.fillRect(20, 10, 150, 25);
            pen.fillStyle = "orange";
            const percentageXp = (150 * gameState.currentXp) / gameState.xpToLevel;
            pen.fillRect(22, 12, percentageXp, 21);
            pen.font = "15px Consolas";
            pen.fillStyle = "white";
            pen.textAlign = "center";
            pen.fillText(`XP: ${gameState.currentXp} / ${gameState.xpToLevel}`, 91, 27);
            pen.fillStyle = "black";
            pen.textAlign = "center";
            pen.font = "20px Consolas";
            pen.fillText(`Your Level: ${gameState.level}`, 95, 55);
            player.draw();
            wall.draw();
            enemyList.forEach((enemy) => {
                enemy.move();
                enemy.draw();
            });
            projectileList.forEach((projectile) => {
                projectile.move();
                projectile.draw();
            });
        }
        requestAnimationFrame(drawLoop);
    }
    requestAnimationFrame(drawLoop);
}
function executeEnemyAttacking() {
    const lastAttackTimes = new Map();
    function enemyAttackLoop(currentTime) {
        if (gameState.gamePaused) {
            return;
        }
        enemyList.forEach((enemy) => {
            const attackSpeed = enemy.getAttackSpeed();
            const interval = 1000 / attackSpeed;
            const lastTime = lastAttackTimes.get(enemy) || 0;
            if (enemy.getIsAttacking() && currentTime - lastTime >= interval) {
                enemy.doDamage();
                lastAttackTimes.set(enemy, currentTime);
            }
        });
        requestAnimationFrame(enemyAttackLoop);
    }
    requestAnimationFrame(enemyAttackLoop);
}
function executeWeaponAttacking() {
    const lastAttackTimes = new Map();
    function weaponAttackLoop(currentTime) {
        if (gameState.gamePaused) {
            return;
        }
        weaponList.forEach((weapon) => {
            const attackSpeed = weapon.getAttackSpeed();
            const interval = 1000 / attackSpeed;
            const lastTime = lastAttackTimes.get(weapon) || 0;
            if (currentTime - lastTime >= interval) {
                const projectile = weapon.shoot();
                const projectileCount = weapon.getProjectileCount();
                if (projectile) {
                    projectileList.push(projectile);
                    if (projectileCount > 1) {
                        for (let i = 0; i < projectileCount - 1; i++) {
                            setTimeout(() => {
                                const newProjectile = weapon.shoot();
                                if (newProjectile) {
                                    projectileList.push(newProjectile);
                                }
                            }, 150 * (i + 1));
                        }
                    }
                }
                lastAttackTimes.set(weapon, currentTime);
            }
        });
        requestAnimationFrame(weaponAttackLoop);
    }
    requestAnimationFrame(weaponAttackLoop);
}
function projectileCollisionCheck() {
    if (gameState.gamePaused) {
        return;
    }
    projectileList.forEach((projectile) => {
        // out of bounds check
        if (projectile.getPosition().x > CANVAS_WIDTH || projectile.getPosition().x < 0) {
            projectileList.splice(projectileList.indexOf(projectile), 1);
        }
        if (projectile.getPosition().y > CANVAS_HEIGHT || projectile.getPosition().y < 0) {
            projectileList.splice(projectileList.indexOf(projectile), 1);
        }
    });
    // enemy collision check
    for (let i = 0; i < enemyList.length; i++) {
        for (let j = 0; j < projectileList.length; j++) {
            const enemy = enemyList[i];
            const projectile = projectileList[j];
            if (enemy && projectile) {
                const enemyPosition = enemy.getPosition();
                const projectilePosition = projectile.getPosition();
                const enemySize = enemy.getSize();
                const projectileSize = projectile.getSize();
                if (projectilePosition.x < enemyPosition.x + enemySize.width &&
                    projectilePosition.x + projectileSize.width > enemyPosition.x &&
                    projectilePosition.y < enemyPosition.y + enemySize.height &&
                    projectilePosition.y + projectileSize.height > enemyPosition.y) {
                    const damage = projectile.getDamage();
                    const damageElement = document.createElement("div");
                    damageElement.className = "floating-damage";
                    damageElement.textContent = damage.toString();
                    damageElement.style.left = `${enemyPosition.x}px`;
                    damageElement.style.top = `${enemyPosition.y}px`;
                    document.body.appendChild(damageElement);
                    setTimeout(() => {
                        damageElement.remove();
                    }, 600);
                    enemy.takeDamage(damage);
                    projectileList.splice(j, 1);
                }
            }
        }
    }
    requestAnimationFrame(projectileCollisionCheck);
}
function stateLogicChecks() {
    if (gameState.currentXp >= gameState.xpToLevel) {
        gameState.level++;
        gameState.currentXp = 0;
        gameState.xpToLevel = Math.round(gameState.xpToLevel * 1.2);
        gameState.gamePaused = true;
        resetGameLoop();
        LevelUp.displayUpgrades();
    }
    requestAnimationFrame(stateLogicChecks);
}
export function run() {
    if (isGameRunning)
        return;
    isGameRunning = true;
    drawLoop();
    executeEnemyAttacking();
    executeWeaponAttacking();
    projectileCollisionCheck();
    stateLogicChecks();
}
run();
export function resetGameLoop() {
    isGameRunning = false; // Allow `run` to be called again
}
