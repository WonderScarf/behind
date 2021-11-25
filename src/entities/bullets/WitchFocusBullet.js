import WitchBullet from "./WitchBullet.js";

/**
 * Bullet fires when the witch is focused.
 */
export default class WitchFocusBullet extends WitchBullet{

    static BOUNDING_WIDTH = 50;
    static BOUNDING_HEIGHT = 50;
    static HITBOX_WIDTH = 50;
    static HITBOX_HEIGHT = 50;
    static SPEED = 5000; // How fast the witch bullet moves.
    static DAMAGE = 1;// How much damage the bullet deals to targets.

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
