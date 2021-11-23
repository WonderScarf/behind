import Bullet from "./Bullet.js";
import { Direction } from "../../enums.js";

/**
 * Bullet spawns and stays in place for a set amount of time.
 */
export default class AoeBullet extends Bullet{
    static BOUNDING_WIDTH = 350;
    static BOUNDING_HEIGHT = 350;
    static HITBOX_WIDTH = 350;
    static HITBOX_HEIGHT = 350;
    static DEFAULT_DIRECTION = Direction.None; // The default bullet direction of witch bullet.
    static SPEED = 0; // How fast the witch bullet moves.
    static DAMAGE = Number.MAX_VALUE; // How much damage the bullet deals to targets.

    constructor(spawnX, spawnY, direction = DEFAULT_DIRECTION){
        super(
            spawnX, 
            spawnY, 
            direction, 
            AoeBullet.BOUNDING_WIDTH, 
            AoeBullet.BOUNDING_HEIGHT, 
            AoeBullet.SPEED,
            AoeBullet.HITBOX_WIDTH,
            AoeBullet.HITBOX_HEIGHT
        );
    }
}