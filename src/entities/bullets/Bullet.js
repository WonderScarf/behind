import { Direction } from "../../enums.js";
import Animation from "../../../lib/time_management/Animation.js";
import {context} from "../../global.js";
import Entity from "../Entity.js";
import Hitbox from "../Hitbox.js"
import { loadedImages } from "../../global.js";
/**
 * An Entity representing a projectile fired by either a foe or friend
 */
export default class Bullet extends Entity{
    static INTERVAL = 0.10;

    static DEFAULT_BULLET_SPEED = 1000;
    static DEFAULT_HITBOX_WIDTH = 5;
    static DEFAULT_HITBOX_HEIGHT = 5;
    static DEFAULT_BOUNDING_WIDTH = 5;
    static DEFAULT_BOUNDING_HEIGHT = 5;
    static DEFAULT_DAMAGE = 1;
    static DEFAULT_HIT_ID = [0]; // Determines which beings it can 'hit'

    /**
     * @param {Number} spawnX 
     * @param {Number} spawnY 
     * @param {String} spriteNames
     * @param {Direction} direction 
     * @param {Number} width 
     * @param {Number} height 
     * @param {Number} speed
     * @param {Number} hitboxWidth
     * @param {Hitbox} hitboxHeight
     * @param {Number} damage
     * @param {Number[] | Number} collisionId
     */
    constructor(spawnX, spawnY, direction, spriteNames, width = Bullet.DEFAULT_BOUNDING_WIDTH, height = Bullet.DEFAULT_BOUNDING_HEIGHT, speed = Bullet.DEFAULT_BULLET_SPEED, hitboxWidth = Bullet.DEFAULT_HITBOX_WIDTH, hitboxHeight = Bullet.DEFAULT_HITBOX_HEIGHT, damage = Bullet.DEFAULT_DAMAGE, collisionId = Bullet.DEFAULT_COLLISION_ID){ 
        super({
            x: spawnX, 
            y:spawnY, 
            boundingWidth: width, 
            boundingHeight: height,
            hitboxWidth: hitboxWidth,
            hitboxHeight: hitboxHeight, 
        })

        this.direction = direction;
        this.speed = speed;
        this.damage = damage;
        this.collisionId = collisionId;

        this.spriteNames = spriteNames;
        this.setSprites();
    }


    update(trueTime) {

        /* Depending on the direction of the bullet we update the bullet's quardinates by a distance
        determined by the bullet's speed and the trueTime value. */
        switch(this.direction){
            case Direction.Up:
                this.y -= (trueTime * this.speed);
                break;
            case Direction.Down:
                this.y += (trueTime * this.speed);
                break;
            case Direction.Left:
                this.x += (trueTime * this.speed);
                break;
            case Direction.Right:
                this.x -= (trueTime * this.speed);
                break;
        }

        this.currentAnimation.update(trueTime);

        
        super.update(trueTime);
    }

    render() {
        if(!context){
            throw new Error("Could not render bullet due to the lack of context.")
        }

        this.currentAnimation.renderCurrentFrame(this.x, this.y);
        super.render();
    }


    setSprites(){

        let spriteSheet;
 
         for (let spritesheetIndex = 0; spritesheetIndex < this.spriteNames.length; spritesheetIndex++) {
             spriteSheet = loadedImages.get(this.spriteNames[spritesheetIndex]);
             this.animations.set(this.spriteNames[spritesheetIndex], new Animation(spriteSheet.getSprites(), Bullet.INTERVAL));
         }
     }

    // Actions...

    
    oobAction() {
        this.canRemove = true;
    }

    collisionAction(collider){
        this.canRemove = true;
    }
}