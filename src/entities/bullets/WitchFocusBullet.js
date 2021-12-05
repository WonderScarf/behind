import WitchBullet from "./WitchBullet.js";
import { Direction, HitboxId } from "../../enums.js";

/**
 * Bullet fires when the witch is focused.
 */
export default class WitchFocusBullet extends WitchBullet{

    static BOUNDING_WIDTH = 50; // The bounding box's height
    static BOUNDING_HEIGHT = 50; // The bounding box's width
    static HITBOX_WIDTH = 50; // The Hitbox's width
    static HITBOX_HEIGHT = 50; // The Hitbox's height
    static SPEED = 2000; // How fast the witch bullet moves.
    static DAMAGE = .25;// How much damage the bullet deals to targets.

    /**
     * @param {Number} spawnX The bullet's spawn x spawn placement.
     * @param {Number} spawnY The bullet's spawn y spawn placement.
     * @param {Direction} direction The direction the bullet is heading (and is thus facing).
     */
    constructor(spawnX, spawnY, direction = WitchBullet.DEFAULT_DIRECTION){
        super(
            spawnX + (WitchFocusBullet.BOUNDING_WIDTH), 
            spawnY, 
            direction, 
            WitchFocusBullet.BOUNDING_WIDTH, 
            WitchFocusBullet.BOUNDING_HEIGHT, 
            WitchFocusBullet.SPEED,
            WitchFocusBullet.HITBOX_WIDTH, 
            WitchFocusBullet.HITBOX_HEIGHT,
        );
    }
}
