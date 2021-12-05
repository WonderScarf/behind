import Bullet from "./Bullet.js";
import { Direction, HitboxId } from "../../enums.js";

/**
 * Bullet that moves in the specified direction until reaching a target or outside of the canvas.
 */
export default class DirectBullet extends Bullet{
    static BOUNDING_WIDTH = 50;
    static BOUNDING_HEIGHT = 50;
    static HITBOX_WIDTH = 50;
    static HITBOX_HEIGHT = 50;
    static SPEED = 2250; // How fast the witch bullet moves.
    static DAMAGE = Number.MAX_VALUE; // How much damage the bullet deals to targets.

    /**
     * @param {Number} spawnX 
     * @param {Number} spawnY 
     * @param {Direction} direction 
     */
    constructor(spawnX, spawnY, direction){
        super(
            spawnX, 
            spawnY, 
            direction, 
            DirectBullet.BOUNDING_WIDTH, 
            DirectBullet.BOUNDING_HEIGHT, 
            DirectBullet.SPEED,
            DirectBullet.HITBOX_WIDTH,
            DirectBullet.HITBOX_HEIGHT
        );

        this.hitbox.id = HitboxId.WitchHit;

    }
}
