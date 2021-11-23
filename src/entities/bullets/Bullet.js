import { Direction } from "../../enums.js";
import {context} from "../../global.js";
import Entity from "../Entity.js";
import Hitbox from "../Hitbox.js"
/**
 * A Entity representing a projectile fired by either a foe or friend
 */
export default class Bullet extends Entity{

    static DEFAULT_BULLET_SPEED = 1000;
    static DEFAULT_HITBOX_WIDTH = 10;
    static DEFAULT_HITBOX_HEIGHT = 10;

    /**
     * @param {Number} spawnX 
     * @param {Number} spawnY 
     * @param {*} direction 
     * @param {Number} width 
     * @param {Number} height 
     */
    constructor(spawnX, spawnY, direction, width = 10, height = 10, speed = Bullet.DEFAULT_BULLET_SPEED, hitboxWidth = Bullet.DEFAULT_HITBOX_WIDTH, hitboxHeight = Bullet.DEFAULT_HITBOX_HEIGHT){ 
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

        super.update(trueTime);
    }

    render() {
        if(!context){
            throw new Error("Could not render bullet due to the lack of context.")
        }

        super.render();
    }
}