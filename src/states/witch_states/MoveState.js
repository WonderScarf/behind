import State from "../State.js";
import { inputConverter } from "../../global.js";
import Witch from "../../entities/Witch.js";
import FocusState from "./FocusState.js";
import ShootState from "./ShootState.js";

/**
 * The superstate or Base state of the witch (it will always be in the stack at the back) It represents the branch that all player actions stem froms. 
 */
  export default class MoveState extends State {    

    // More shall be added.

    constructor(){
        super();
        this.witch;
    };


    /**
     * Enters the MoveState.
     * @param {{witch: Witch}} paramaters The inputs used when entering the state.
     */
    enter(paramaters){
        if(!paramaters.witch){
            throw new Error("No witch was input with the paramaters.")
        }

        this.witch = paramaters.witch; //The Witch that will be moved.
    }

    update(trueTime) {

        if(!inputConverter.commands){
            throw new Error("Commands have not been initialized and thus cannot be read.");
        }
        else if(!this.witch){
            throw new Error("Cannot update when witch is undefined.");
        }

        let moveWeight = {x: 0, y: 0}

        //Check directions

        if(inputConverter.commands.UP_KEY.isPushed && inputConverter.commands.UP_KEY.isEnabled){
            moveWeight.y--;
        }
        else if(inputConverter.commands.DOWN_KEY.isPushed && inputConverter.commands.DOWN_KEY.isEnabled){
            moveWeight.y++;
        }

        if(inputConverter.commands.RIGHT_KEY.isPushed && inputConverter.commands.RIGHT_KEY.isEnabled){
            moveWeight.x++;
        }
        else if(inputConverter.commands.LEFT_KEY.isPushed && inputConverter.commands.LEFT_KEY.isEnabled){
            moveWeight.x--;
        }

        // If this happens we push focus mode state.
        if(inputConverter.commands.ALTERNATE_KEY.isPushed && inputConverter.commands.ALTERNATE_KEY.isEnabled){
            this.witch.stateManager.addState(new FocusState(), {witch: this.witch} ); //same issue
        }

        // If this happens we shoot.
        if(inputConverter.commands.PRIMARY_KEY.isPushed && inputConverter.commands.PRIMARY_KEY.isEnabled){
            this.witch.stateManager.addState(new ShootState(), {witch: this.witch} ); //same issue
        }

        this.witch.move(moveWeight.x, moveWeight.y);
    }

    render() {
        if(!this.witch){
            throw new Error("The witch within MoveState was not defined, thus it can't move.")
        }

        this.witch.render();
    }
}