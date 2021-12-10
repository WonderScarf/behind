import State from "../State.js";
import { inputConverter} from "../../global.js";
import Witch from "../../entities/Witch.js";

/**
 * The superstate or Base state of the Witch (it will always be in the stack at the back) It represents the branch that all player actions stem froms. 
 */
  export default class MoveState extends State {    

    static HITBOX_X_OFFSET = 11; // The x offset of the rendered hitbox compared to the bounding box.
    static HITBOX_Y_OFFSET = 17; // The y offset of the rendered hitbox compared to the bounding box.

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
        
        // Sets a current animation to the index of the name we wanted. It is stored within the state itself so it is saved when changing directory.
        this.currentAnimation = this.witch.animations.get(Witch.SPRITESHEET_NAMES[0]);
        
        // We set up the witch's new properties to match the current state.
        this.#setupWitch();
    }

    /**
     * Returns back to the MoveState from a previous state. In this case it is used to revert the
     * witch's size and hitbox offset to what is expected in this state.
     */
    return() {
        this.#setupWitch();
    }

    exit(){
        throw Error("MoveState is the default state for the Witch and as such can not be exited.")
    }

    update(trueTime) {

        // Error checking.
        if(!inputConverter.commands){
            throw new Error("Commands have not been initialized and thus cannot be read.");
        }
        else if(!this.witch){
            throw new Error("Cannot update when witch is undefined or null.");
        }
        else if (!this.witch.stateManager) {
            throw new Error("Witch's state manager have not been initialized and thus cannot be read. ");
        }
        

        // If we are not currently focused and we push the alternate key go into focus state.
        if(inputConverter.commands.ALTERNATE_KEY.isPushed && !this.witch.isFocused){
            this.witch.stateManager.loadState("FocusState", {witch: this.witch});
        }

        // When we press primary button we go into the shoot state.
        if(inputConverter.commands.PRIMARY_KEY.isPushed && !this.witch.isShooting){
            this.witch.stateManager.loadState("ShootState", {witch: this.witch});
        }

        // Determines direction / speed multiplier for movement.
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

        // Moves the witch with the moveWeight modified wiht the true time to account for refresh rates. 
        this.witch.move(moveWeight.x * trueTime, moveWeight.y * trueTime);

        this.currentAnimation.update(trueTime); // Update the current states' animation.
    }

    render() {
        // Throws an error in if there is no witch to render. 
        if(!this.witch){
            throw new Error("The witch within MoveState was not defined, thus it can't move.")
        }

        // Render the current animation frame to the canvas.
        this.currentAnimation.renderCurrentFrame(this.witch.x, this.witch.y);
    }

    /**
     * Sets up the witch object to match requirements of the MoveState (this is just meant 
     * to organize the code and make it cleaner to read).
     * @private
     * @throws When witch is null, undefined or illegible to JavaScript.
     */
    #setupWitch(){

        // Error handling.
        if(!this.witch){
            throw Error("Cannot setup witch as it is either null, undefined or was not set in the params.")
        }

        let size = this.currentAnimation.getFrameSize();

        // Update the witch's bounding box acording to the sizes obtained.
        this.witch.boundingWidth = size.width;
        this.witch.boundingHeight = size.height;

        // Set the hitbox offsets based on this state's default values.
        this.witch.hitbox.setNewOffsets(MoveState.HITBOX_X_OFFSET, MoveState.HITBOX_Y_OFFSET);
    }
}