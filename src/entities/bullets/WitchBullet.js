import { Direction, HitboxId } from "../../enums.js";
import Bullet from "./Bullet.js";
import { loadedImages } from "../../global.js";
import Animation from "../../../lib/time_management/Animation.js";


/**
 * Bullet fires when the witch is unfocused.
 */
 export default class WitchBullet extends Bullet{

    // Animation...
    static SPRITESHEET_NAMES = ["bullet-witch"];

    // Sizes...
    static DEFAULT_HITBOX_WIDTH = 28;
    static DEFAULT_HITBOX_HEIGHT = 28;

    // Bullet properties...
    static DEFAULT_DIRECTION = Direction.Up; // The default bullet direction of witch bullet.
    static SPEED = 800; // How fast the witch bullet moves.
    static DAMAGE = .75;// How much damage the bullet deals to targets.

    constructor(spawnX, spawnY, direction = WitchBullet.DEFAULT_DIRECTION, spriteNames = WitchBullet.SPRITESHEET_NAMES ,width = 1, height = 1, speed = WitchBullet.SPEED, hitboxWidth = WitchBullet.DEFAULT_HITBOX_WIDTH, hitboxHeight = WitchBullet.DEFAULT_HITBOX_HEIGHT, damage = WitchBullet.DAMAGE){
        super(
            spawnX + (width / 2), 
            spawnY - height, 
            direction, 
            spriteNames,
            width, 
            height, 
            speed, 
            hitboxWidth, 
            hitboxHeight,
            damage
        );

        this.hitbox.id = HitboxId.BossHit;
        this.currentAnimation = this.animations.get(spriteNames[0]);

        let size = this.currentAnimation.getFrameSize();

        // Update the witch's bounding box acording to the sizes obtained.
        this.boundingWidth = size.width;
        this.boundingHeight = size.height;
    }

    update(trueTime){
        
        super.update(trueTime);
    }
    
}
