import { Player } from "./Classes/Player.js";
import { Wall } from "./Classes/Wall.js";
import { Enemy } from "./Classes/Enemy.js";
import { Weapon } from "./Classes/Weapon.js";
import { enemyTypes } from "./Shared.js";
const canvas = document.getElementById("canvas");
const pen = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const background = new Image();
background.src = "./dist/Art/background.png";
const player = new Player();
const wall = new Wall();
const getRandomEnemyType = () => Object.keys(enemyTypes)[Math.floor(Math.random() * Object.keys(enemyTypes).length)];
export const enemyList = [
    new Enemy(getRandomEnemyType()),
    new Enemy(getRandomEnemyType()),
    new Enemy(getRandomEnemyType()),
    new Enemy(getRandomEnemyType()),
];
const weaponList = [new Weapon()];
function gameLoop() {
    const fps = 60;
    const interval = 1000 / fps;
    let lastTime = 0;
    function gameLoop(currentTime) {
        const deltaTime = currentTime - lastTime;
        if (deltaTime > interval) {
            lastTime = currentTime - (deltaTime % interval);
            pen.clearRect(0, 0, canvas.width, canvas.height);
            pen.drawImage(background, 0, 0, canvas.width, canvas.height);
            player.draw(pen);
            wall.draw(pen);
            enemyList.forEach((enemy) => {
                enemy.move();
                enemy.draw(pen);
            });
            // console.log(gameState.wallHealth);
        }
        requestAnimationFrame(gameLoop);
    }
    requestAnimationFrame(gameLoop);
}
function executeEnemyAttacking() {
    enemyList.forEach((enemy) => {
        const attackSpeed = enemy.attackSpeed;
        const interval = 1000 / attackSpeed;
        let lastTime = 0;
        function attackLoop(currentTime) {
            const deltaTime = currentTime - lastTime;
            if (deltaTime > interval) {
                lastTime = currentTime - (deltaTime % interval);
                if (enemy.isAttacking) {
                    enemy.doDamage();
                }
            }
            requestAnimationFrame(attackLoop);
        }
        requestAnimationFrame(attackLoop);
    });
}
function executeWeaponAttacking() {
    weaponList.forEach((weapon) => {
        const attackSpeed = weapon.attackSpeed;
        const interval = 1000 / attackSpeed;
        let lastTime = 0;
        function attackLoop(currentTime) {
            const deltaTime = currentTime - lastTime;
            if (deltaTime > interval) {
                lastTime = currentTime - (deltaTime % interval);
                weapon.shoot(pen);
            }
            requestAnimationFrame(attackLoop);
        }
        requestAnimationFrame(attackLoop);
    });
}
gameLoop();
executeEnemyAttacking();
executeWeaponAttacking();
