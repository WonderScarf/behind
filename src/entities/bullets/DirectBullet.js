import Bullet from "./Bullet.js";
import { Direction, HitboxId } from "../../enums.js";
import WitchBullet from "./WitchBullet.js";

/**
 * Bullet that moves in the specified direction until reaching a target or outside of the canvas.
 */
export default class DirectBullet extends Bullet{
    static HITBOX_WIDTH = 27;
    static HITBOX_HEIGHT = 27;
    static SPEED = 250; // How fast the witch bullet moves.
    static DAMAGE = Number.MAX_VALUE; // How much damage the bullet deals to targets.

    static SPRITESHEET_NAMES = ["bullet-direct-down", "bullet-direct-right", "bullet-direct-left"];


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
            DirectBullet.SPRITESHEET_NAMES,
            null,
            null,
            DirectBullet.SPEED,
            DirectBullet.HITBOX_WIDTH,
            DirectBullet.HITBOX_HEIGHT
        );

        

        this.hitbox.id = HitboxId.WitchHit;
        this.currentAnimation = this.animations.get(DirectBullet.SPRITESHEET_NAMES[0]);

        let size = this.currentAnimation.getFrameSize();

        // Update the witch's bounding box acording to the sizes obtained.
        this.boundingWidth = size.width;
        this.boundingHeight = size.height;
    }


    render(){

        switch(this.direction){
            case Direction.Down:
                this.currentAnimation = this.animations.get(DirectBullet.SPRITESHEET_NAMES[0]);
                break;
            case Direction.Right:
                this.currentAnimation = this.animations.get(DirectBullet.SPRITESHEET_NAMES[1]);
                break;
            default:
                this.currentAnimation = this.animations.get(DirectBullet.SPRITESHEET_NAMES[2]);
                break;
        }
        super.render();
    }
}
