//@ts-nocheck

import Witch from "../../entities/Witch.js";
import { inputConverter } from "../../global.js";
import MoveState from "./MoveState.js";
import { BulletType } from "../../enums.js";

export default class ShootState extends MoveState {

    static HITBOX_X_OFFSET = 80;
    static HITBOX_Y_OFFSET = 150;
    static COOLDOWN = 10;

    constructor() {
        super();
    };

    // State essential functions...
    
    /**
     * Enters the Shootstate.
     * @param {{witch: Witch}} paramaters The inputs used when entering the state.
     */
    enter(paramaters) {
        if (!paramaters.witch) {
            throw new Error("No witch was input with the paramaters.")
        }

        this.witch = paramaters.witch;
        this.currentAnimation = this.witch.animations.get(Witch.SPRITESHEET_NAMES[1]);

        this.#setupWitch();
    }

    return(){
       this.#setupWitch();
    }

    exit() {
        this.witch.isShooting = false;
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

        //TODO Determine if the witch can shoot a bullet based on a fire rate so the witch does not shoot every frame.
        this.witch.shoot(BulletType.Witch); //! This is temporary will be replaced with a with the idea mentionned above.

        super.update(trueTime);
    }

    render() {
        if (!this.witch) {
            throw new Error("The witch within MoveState was not defined, thus it can't move.")
        }

        this.currentAnimation.renderCurrentFrame(this.witch.x, this.witch.y);
    }


    // Unique and private functions for the state...

    /**
     * Sets up the witch object in the state (this is just meant to organize the code and make it cleaner.)
     * @private
     */
    #setupWitch(){
        let size = this.currentAnimation.getFrameSize();

        this.witch.isShooting = true;
        this.witch.isFocused = false;

        this.witch.boundingWidth = size.width;
        this.witch.boundingHeight = size.height;

        this.witch.hitbox.setNewOffsets(ShootState.HITBOX_X_OFFSET, ShootState.HITBOX_Y_OFFSET);
    }
}