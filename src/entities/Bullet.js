import {context} from "../global.js";
import Entity from "./Entity.js";

export default class Bullet extends Entity{

    //type will be a bullettype which will create a bunch of 
    constructor(spawnX, spawnY, angle, type){ 
        // We will want to determine width and height by image size later on... but for now we will hardcode the value
        super(spawnX, spawnY , 10, 10);
        
        this.speed = 3; 
    }


    move(x ,y) {

        // For now the bullet will have no angle and just shoot upwards for testing but I want a full 360 degree system for determining direction 
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