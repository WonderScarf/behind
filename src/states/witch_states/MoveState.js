import State from "../State.js";
import { inputConverter } from "../../global.js";
import Witch from "../../entities/Witch.js";
import { context } from "../../global.js";

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

    exit(){

    }

    update(trueTime) {

        if(!inputConverter.commands){
            throw new Error("Commands have not been initialized and thus cannot be read.");
        }
        else if(!this.witch){
            throw new Error("Cannot update when witch is undefined or null.");
        }

        let moveWeight = {x: 0, y: 0}

        //Check directions

        // If this happens we push focus mode state.
        if(inputConverter.commands.ALTERNATE_KEY.isPushed && !this.witch.isFocused){
            this.witch.stateManager.loadState("FocusState", {witch: this.witch});
        }

        // Get directions of movement.
        if(inputConverter.commands.UP_KEY.isPushed){
            moveWeight.y--;
        }
        else if(inputConverter.commands.DOWN_KEY.isPushed){
            moveWeight.y++;
        }

        if(inputConverter.commands.RIGHT_KEY.isPushed){
            moveWeight.x++;
        }
        else if(inputConverter.commands.LEFT_KEY.isPushed){
            moveWeight.x--;
        }

        // When we press dodge button we go into the dodge state
        if(inputConverter.commands.SECONDARY_KEY.isPushed){
            this.witch.stateManager.loadState("DodgeState", {witch: this.witch, moveWeight});
        }

        this.witch.move(moveWeight.x *  trueTime, moveWeight.y * trueTime);

    }

    render() {
        if(!this.witch){
            throw new Error("The witch within MoveState was not defined, thus it can't move.")
        }

        if(!context){
            throw new Error("The context is null.")
        }

        // When we have more than 1 sprite render animation instead.
        this.witch.sprites[0].render(this.witch.x, this.witch.y);

        // We would make this the moving animation loop for player and we should send
        //context.fillStyle = 'red';
        //context.fillRect(this.witch.x, this.witch.y, this.witch.width, this.witch.height);

        

        //this.witch.render();
    }
}