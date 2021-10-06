import State from "../State.js";
import { inputConverter } from "../../global.js";
import Witch from "../../entities/Witch.js";

/**
 * State that occurs when the in a dodge. Player cannot be hit during the time
*/
  export default class DodgeState extends State {    

    // More shall be added.

    constructor(){
        super();
    };

    /**
     * Enters the MoveState.
     * @param {{
     * witch: Witch, moveWeight: {x: Number, y: Number}
     * }} paramaters The inputs used when entering the state.
     */
    enter(paramaters){
        if(!paramaters.witch){
            throw new Error("No witch was input with the paramaters.")
        }

        this.witch = paramaters.witch; // The Witch that will be moved.
        this.moveWeight = paramaters.moveWeight; // The direction we will move.
    }

    exit(){

    }

    update(trueTime) {

        if(!inputConverter.commands){
            throw new Error("Commands have not been initialized and thus cannot be read.");
        }
        else if(!this.witch){
            throw new Error("Cannot update when witch is undefined.");
        }

        /* 
        We need to 'tween' like we did in class for a time but I'm uncertain
        of what we need to do in particular to get this working with the true
        time. We then end the state afterwards.
        */

    }

    render() {
        if(!this.witch){
            throw new Error("The witch within MoveState was not defined, thus it can't move.")
        }

        // Show the right animation.
    }
}