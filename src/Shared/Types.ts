export type GameState = {
    score: number;
    wallHealth: number;
    level: number;
    xp: number;
    enemiesKilled: number;
    gameLost: boolean;
    gameStarted: boolean;
};

export type EnemyType = {
    color: string;
    width: number;
    height: number;
    health: number;
    speed: number;
    damage: number;
    attackSpeed: number;
    points: number;
    xpDrop: number;
    chanceToSpawnPercentage: number;
    sprite: string;
};

export type WeaponType = {
    name: string;
    attackSpeed: number;
    damage: number;
    range: number;
    projectileSprite: string;
    projectileSpeed: number;
    projectileCount: number;
    weaponDescription: string;
    shootSound: string;
};

export type Upgrade = {
    normal: number;
    rare: number;
    legendary: number;
    ancient: number;
};
