import { CANVAS_WIDTH } from "./General.js";
import { WeaponType } from "./Types.js";

export const weaponTypes: { [key: string]: WeaponType } = {
    bow: {
        name: "bow",
        attackSpeed: 1,
        damage: 20,
        projectileSprite: "./dist/Art/Sprites/arrow.png",
        range: CANVAS_WIDTH * 0.5,
        projectileSpeed: 10,
        projectileCount: 1,
        weaponDescription: `Good all-rounder weapon`,
        shootSound: "./dist/Art/Sound/kunaiThrowSFX.mp3",
    },
    fireWand: {
        name: "fireWand",
        attackSpeed: 0.3,
        damage: 100,
        projectileSprite: "./dist/Art/Sprites/fireBall.png",
        range: CANVAS_WIDTH * 0.8,
        projectileSpeed: 15,
        projectileCount: 1,
        weaponDescription: `Slow casting, but powerful long range weapon`,
        shootSound: "./dist/Art/Sound/kunaiThrowSFX.mp3",
    },
    kunai: {
        name: "kunai",
        attackSpeed: 2,
        damage: 10,
        projectileSprite: "./dist/Art/Sprites/kunai.png",
        range: CANVAS_WIDTH * 0.3,
        projectileSpeed: 6,
        projectileCount: 1,
        weaponDescription: `Fast firing daggers with low damage`,
        shootSound: "./dist/Art/Sound/kunaiThrowSFX.mp3",
    },
};
