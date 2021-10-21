import State from "../State.js";
import { inputConverter} from "../../global.js";
import Witch from "../../entities/Witch.js";

/**
 * The superstate or Base state of the Witch (it will always be in the stack at the back) It represents the branch that all player actions stem froms. 
 */
  export default class MoveState extends State {    

    // More shall be added.

    constructor(){
        super();
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

        // If we are not currently focused and we push the alternate key go into focus state.
        if(inputConverter.commands.ALTERNATE_KEY.isPushed && !this.witch.isFocused){
            this.witch.stateManager.loadState("FocusState", {witch: this.witch});
        }

        // When we press secondary button we go into the parry state.
        if(inputConverter.commands.SECONDARY_KEY.isPushed && !this.witch.stateManager.isCurrentlyIn("ParryState")){

        }

        // When we press primary button we go into the shoot state.
        if(inputConverter.commands.PRIMARY_KEY.isPushed && !this.witch.stateManager.isCurrentlyIn("ShootState")){
            this.witch.stateManager.loadState("ShootState", {witch: this.witch});

        }

        // Determines direction.
        let moveWeight = {x: 0, y: 0}

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

        // Moves the witch with the moveWeight modified wiht the true time. 
        this.witch.move(moveWeight.x * trueTime, moveWeight.y * trueTime);

    }

    render() {
        // Throws an error in if there is no witch to render. 
        if(!this.witch){
            throw new Error("The witch within MoveState was not defined, thus it can't move.")
        }

        // TODO When we have more than 1 sprite render animation instead.
        this.witch.sprites[0].render(this.witch.x, this.witch.y);
    }
}