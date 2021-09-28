// @ts-nocheck
import {context, CANVAS_WIDTH, CANVAS_HEIGHT, inputConverter } from "../global.js";
import StateManager from "../states/StateManager.js";
import MoveState from "../states/witch_states/MoveState.js";
import Entity from "./Entity.js";

export default class Witch extends Entity{

    constructor(){ 
        
        /* May want to determine size based on images when we get them. Along with removing hardcoding.
           Note that the hitbox being smaller then the model will need to be accounted for as well though
           the hitbox can be it's own entity so we can calculate graze with the witch sizes and if we are hit
           with the hitbox sizes
        */
        super((CANVAS_WIDTH / 2) - 60, (CANVAS_HEIGHT * .80) , 60, 70);
        
        /* For now it will be null but later on it will have it's own class used to mark the glowy orb thing
           that allot of pressision bullet-hells have.
        */
        this.soul = null; 
        this.bullets = [];

        this.speed = 9; 
       
        this.stateManager = new StateManager();

        this.stateManager.addState(new MoveState(), {witch: this});
    }


    move(x ,y){
        this.x += x * this.speed;
        this.y += y * this.speed;
    }

    update(trueTime) {
        this.stateManager.updateState(trueTime);
    }

    render() {
        if(context){
            context.fillStyle = 'red';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
        else{
            throw new Error("Could not render witch due to the lack of context.")
        }
    }
}
