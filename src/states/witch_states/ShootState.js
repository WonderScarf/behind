import Witch from "../../entities/Witch.js";
import { inputConverter } from "../../global.js";
import MoveState from "./MoveState.js";
import { BulletType } from "../../enums.js";

/**
 * A state representing when the witch is shooting but is not focusing. The standout feature of the
 * state is that it shoots projectiles without lowering the witch's speed from it's normal value. 
 * It is derived from the movestate.
 */
export default class ShootState extends MoveState {

    static HITBOX_X_OFFSET = 80; // The x offset of the rendered hitbox compared to the bounding box.
    static HITBOX_Y_OFFSET = 150; // The y offset of the rendered hitbox compared to the bounding box.
    static MAX_COOLDOWN = 10; // The cooldown between shots in this state.

    constructor() {
        super();
    };


    // State essential functions...
    
    /**
     * Enters the Shootstate. Witch must be entered as a part of the paramaters.
     * @param {{witch: Witch}} paramaters The inputs used when entering the state.
     */
    enter(paramaters) {
        if (!paramaters.witch) {
            throw new Error("No witch was input with the paramaters.")
        }

        // Set the paramaters of the objects entered (like the Witch object)
        this.witch = paramaters.witch; 

        // Set the current animation to use from the newly set witch.
        this.currentAnimation = this.witch.animations.get(Witch.SPRITESHEET_NAMES[1]);

        // Setup the witch object. 
        this.#setupWitch();

    }

    /**
     * @throws When witch is null, undefined or illegible to JavaScript.
     */
    return(){
       this.#setupWitch(); // We set up the Witch back to it's normal value.
    }

    exit() {
        this.witch.isShooting = false; // We signal to the witch that it is no longer shooting.
    }

    update(trueTime) {
        // Error handling in case of any missing essentials for update.  
        if (!inputConverter.commands) {
            throw new Error("Commands have not been initialized and thus cannot be read.");
        }
        else if (!this.witch) {
            throw new Error("Witch has not been initialized and thus cannot be read.");
        }
        else if (!this.witch.stateManager) {
            throw new Error("Witch's state manager have not been initialized and thus cannot be read. ");
        }

        /* If the primary key is pushed we remove the current state from the stack, usually landing on
        landing on the MoveState. */
        if(!inputConverter.commands.PRIMARY_KEY.isPushed){
            this.witch.stateManager.removeState();
            return;
        }

        /* If the alternate key is pushed when we are in a non focusing state like this we load the
        FocusShootState (we know this will be fine as if the PRIMARY_KEY was not pressed we would have
        not have left ShootState in the earlier if statement.) */
        if(inputConverter.commands.ALTERNATE_KEY.isPushed){
            this.witch.stateManager.loadState("FocusShootState", { witch: this.witch });
            return;
        }

        // Quick algorithm to make bullets only shoot when cooldown is up.
        if(this.cooldown < ShootState.MAX_COOLDOWN){
            this.cooldown++; //TODO refine by incremention based on truetime.
        }
        else {
            this.witch.shoot(BulletType.Witch); // We shoot a witch type bullet.
            this.cooldown = 0; // We reset the current cooldown / initialize if cooldown is null.
        }

        super.update(trueTime);
    }

    /**
     * @throws When witch is null, undefined or illegible to JavaScript.
     */
    render() {
        if (!this.witch) {
            throw new Error("The witch within MoveState was not defined, thus it can't move.")
        }

        this.currentAnimation.renderCurrentFrame(this.witch.x, this.witch.y);
    }


    // Unique and private functions for the state...

    /**
     * Sets up the witch object in the state (this is just meant to organize the code and 
     * make it cleaner to read).
     * @private
     * @throws When witch is null, undefined or illegible to JavaScript.
     */
    #setupWitch(){

        // Error handling.
        if(!this.witch){
            throw Error("Cannot setup witch as it is either null, undefined or was not set in the params.")
        }

        // Determine the itch's bounding box sizes via it's animation.
        let size = this.currentAnimation.getFrameSize();

        // Update the witch's bounding box acording to the sizes obtained.
        this.witch.boundingWidth = size.width;
        this.witch.boundingHeight = size.height;

        // Set the hitbox offsets based on this state's default values.
        this.witch.hitbox.setNewOffsets(ShootState.HITBOX_X_OFFSET, ShootState.HITBOX_Y_OFFSET);

        this.witch.isShooting = true; // Singal the witch is shooting.
        this.witch.isFocused = false; // Signal the witch is not focusing.
    }
}