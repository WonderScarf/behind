import Bullet from "./Bullet.js";
import { Direction, HitboxId } from "../../enums.js";
import Timer from "../../../lib/time_management/Timer.js";
import { timer } from "../../global.js";

/**
 * Bullet spawns and stays in place for a set amount of time.
 */
export default class AoeBullet extends Bullet{
    static SPRITESHEET_NAMES = ["bullet-aoe-warn", "bullet-aoe-hurt"];

    static DEFAULT_DIRECTION = Direction.None; // The default bullet direction of witch bullet.
    static SPEED = 0; // How fast the witch bullet moves.
    static DAMAGE = Number.MAX_VALUE; // How much damage the bullet deals to targets.

    // Times that affect how long it takes to enable and removea a bullet.
    static TIME_BEFORE_ENABLING = 5;
    static TIME_AFTER_ENABLING = 5;

    constructor(spawnX, spawnY, direction = AoeBullet.DEFAULT_DIRECTION){
        super(
            spawnX, 
            spawnY, 
            direction, 
            AoeBullet.SPRITESHEET_NAMES,
            null,
            null,
            AoeBullet.SPEED,
            null,
            null
        );
        this.hitbox.id = -1;
        this.isActive = false;
        // TODO make the bullet tween into existance and when it fully tweens display a new sprite (mark the zone with a skull or something that signal 'oh this will kill me now.')
        // ? Maybe changing from a green to a read area will also have the same effects
        // ? Most likely we will have 2 sprites 1 for before dangerous and one for after.

        timer.addTask(() => {}, AoeBullet.TIME_BEFORE_ENABLING, 1, () => {
            this.isActive = true;
            this.hitbox.id = HitboxId.WitchHit;
            
            timer.addTask(() => {}, AoeBullet.TIME_AFTER_ENABLING, 1, () => {
                this.canRemove = true;
            });
        });

        this.currentAnimation = this.animations.get(AoeBullet.SPRITESHEET_NAMES[0]);

        let size = this.currentAnimation.getFrameSize();

        // Update the witch's bounding box acording to the sizes obtained.
        this.boundingWidth = size.width;
        this.boundingHeight = size.height;

        this.hitbox.width = size.width;
        this.hitbox.height = size.height;

    }

    update(trueTime){
        if(this.isActive ){
            this.currentAnimation = this.animations.get(AoeBullet.SPRITESHEET_NAMES[1]);
        }
        super.update(trueTime);

    }

    render(){
        super.render(); //TODO render the active sprite

    }

    oobAction(){
        if(this.isActive){
            super.oobAction();
        }
    }
}