import {context} from "../../global.js";
import Entity from "../Entity.js";

/**
 * A Entity representing a projectile fired by either a foe or friend
 */
export default class Bullet extends Entity{

    constructor(spawnX, spawnY, direction, ){ 
        // We will want to determine width and height by image size later on... but for now we will hardcode the value
        super(spawnX, spawnY , 10, 10);
        
        this.speed = 3; 
    }

    move(x ,y) {
        this.x += x * this.speed;
        this.y += y * this.speed;
    }

    update(trueTime) {
        
    }

    render() {
        if(!context){
            throw new Error("Could not render bullet due to the lack of context.")
        }

        context.fillStyle = 'blue';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}