import {context, CANVAS_WIDTH, CANVAS_HEIGHT, inputConverter } from "../global.js";
import StateManager from "../managers/StateManager.js";
import Entity from "./Entity.js";

export default class Witch extends Entity{

    constructor(x, y){ 
        super(x, y, (CANVAS_WIDTH / 11), (CANVAS_HEIGHT / 11));
        
        this.speed = 9;
        this.state = new StateManager();

        importStates();
    }

    importStates(){
        //not really sure how do do this in a way without hardcoding
        //ask teach
    }

    update(trueTime) {

        /* These will go in here for now they will go in the witch
        state later on.*/
        if(inputConverter.commands.UP_KEY.isPushed && inputConverter.commands.UP_KEY.isEnabled){
            this.y -= this.speed;
        }
        else if(inputConverter.commands.DOWN_KEY.isPushed && inputConverter.commands.DOWN_KEY.isEnabled){
            this.y += this.speed;
        }

        if(inputConverter.commands.RIGHT_KEY.isPushed && inputConverter.commands.RIGHT_KEY.isEnabled){
            this.x += this.speed;
        }
        else if(inputConverter.commands.LEFT_KEY.isPushed && inputConverter.commands.LEFT_KEY.isEnabled){
            this.x -= this.speed;
        }
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
