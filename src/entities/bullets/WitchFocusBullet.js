import WitchBullet from "./WitchBullet.js";
import { Direction, HitboxId } from "../../enums.js";

/**
 * Bullet fires when the witch is focused.
 */
export default class WitchFocusBullet extends WitchBullet{

    static X_OFFSET = 12;
    static Y_OFFSET = 0;
    static HITBOX_WIDTH = 15; // The Hitbox's width
    static HITBOX_HEIGHT = 15; // The Hitbox's height
    static SPEED = 1200; // How fast the witch bullet moves.
    static DAMAGE = .25;// How much damage the bullet deals to targets.

    static SPRITESHEET_NAMES = ["bullet-witch-focus"];

    /**
     * @param {Number} spawnX The bullet's spawn x spawn placement.
     * @param {Number} spawnY The bullet's spawn y spawn placement.
     * @param {Direction} direction The direction the bullet is heading (and is thus facing).
     */
    constructor(spawnX, spawnY, direction = WitchBullet.DEFAULT_DIRECTION){
        super(
            spawnX, 
            spawnY, 
            direction, 
            WitchFocusBullet.SPRITESHEET_NAMES,
            null,
            null, 
            WitchFocusBullet.SPEED,
            WitchFocusBullet.HITBOX_WIDTH, 
            WitchFocusBullet.HITBOX_HEIGHT,
            WitchFocusBullet.DAMAGE
        );

        this.hitbox.setNewOffsets(WitchFocusBullet.X_OFFSET, WitchFocusBullet.Y_OFFSET);

    }
}
