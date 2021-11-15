import { Direction } from "../../enums.js";
import {context} from "../../global.js";
import Entity from "../Entity.js";

/**
 * A Entity representing a projectile fired by either a foe or friend
 */
export default class Bullet extends Entity{


    constructor(spawnX, spawnY, direction, width = 10, height = 10){ 
        // We will want to determine width and height by image size later on... but for now we will hardcode the value
        super(spawnX, spawnY , width, height);
        this.direction = direction;
        this.speed = 1;
    }

    move(x ,y) {
        this.x += x * this.speed;
        this.y += y * this.speed;
    }

    update(trueTime) {
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
        this.move(this.x, this.y);
    }

    render() {
        if(!context){
            throw new Error("Could not render bullet due to the lack of context.")
        }

    }
}