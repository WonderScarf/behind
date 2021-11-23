import { Direction } from "../../enums.js";
import Bullet from "./Bullet.js";

/**
 * Bullet fires when the witch is unfocused.
 */
 export default class WitchBullet extends Bullet{

    static BOUNDING_WIDTH = 100;
    static BOUNDING_HEIGHT = 100;
    static DEFAULT_HITBOX_WIDTH = 100;
    static DEFAULT_HITBOX_HEIGHT = 100;
    static DEFAULT_DIRECTION = Direction.Up; // The default bullet direction of witch bullet.
    static SPEED = 5000; // How fast the witch bullet moves.
    static DAMAGE = 1;// How much damage the bullet deals to targets.

    constructor(spawnX, spawnY, direction = WitchBullet.DEFAULT_DIRECTION,  width = WitchBullet.BOUNDING_WIDTH, height = WitchBullet.BOUNDING_HEIGHT, speed = WitchBullet.DEFAULT_BULLET_SPEE, hitboxWidth = WitchBullet.DEFAULT_HITBOX_WIDTH, hitboxHeight = WitchBullet.DEFAULT_HITBOX_HEIGHT){
        super(
            spawnX, 
            spawnY, 
            direction, 
            width, 
            height, 
            speed, 
            hitboxWidth, 
            hitboxHeight
        );
    }
    
}
