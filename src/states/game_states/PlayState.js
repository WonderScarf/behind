import State from "../State.js";
import Witch from "../../entities/Witch.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../global.js";

export default class PlayState extends State {    

    // More shall be added.

    constructor(){
        super();
        //this.witch = new Witch(50, 50);
    };


    enter(paramaters){
        // Paramaters will be added later for play.
        
        
        this.witch = new Witch();
    }

    exit(){

    }

    update(trueTime) {
        if(!this.witch){
            throw new Error("Cannot update a null Witch.")
        }

        this.witch.update(trueTime);
    }

    render() {
        if(!this.witch){
            throw new Error("Cannot render a null Witch.")
        }

        this.witch.render();
    }
}