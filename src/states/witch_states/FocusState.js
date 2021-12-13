//@ts-nocheck
import { inputConverter } from "../../global.js";
import Witch from "../../entities/Witch.js";
import MoveState from "./MoveState.js";

/**
* The state that represents when the player slows down to dodge shots also displays hitbox.
*/
export default class FocusState extends MoveState {


    static HITBOX_X_OFFSET = 11;
    static HITBOX_Y_OFFSET = 17;

    constructor() {
        super();
    };

    /**
     * Enters the FocusState.
     * @param {{witch: Witch}} paramaters The inputs used when entering the state.
     * @throws When the witch is null, undefined or cannot be paresed as a Witch object.
     */
    enter(paramaters) {
        super.enter(paramaters);

        if (!this.witch) {
            throw new Error("Cannot setup the FocusState's witch as witch is was not set properly in MoveState.");
        }

        this.currentAnimation = this.witch.animations.get(Witch.SPRITESHEET_NAMES[0]);
        this.focusCurrentAnimation = this.witch.animations.get(Witch.SPRITESHEET_NAMES[2]);

        this.#setupWitch();

        this.witch.isFocused = true;
    }

    return() {
        super.return();

        if(this.witch){
            this.witch.isFocused = true;
        }
    }

    exit() {
        this.witch.isFocused = false;
    }

    update(trueTime) {

        if (!inputConverter.commands) {
            throw new Error("Commands have not been initialized and thus cannot be read.");
        }
        else if (!this.witch) {
            throw new Error("Witch has not been initialized and thus cannot be read.");
        }
        else if (!this.witch.stateManager) {
            throw new Error("Witch's state manager have not been initialized and thus cannot be read. ");
        }

        if (inputConverter.commands.PRIMARY_KEY.isPushed && !this.witch.isShooting) {
            this.witch.stateManager.loadState("FocusShootState", { witch: this.witch });
        }

        //If not pushed, revert to the previous state (which should be the MoveState).
        if (!inputConverter.commands.ALTERNATE_KEY.isPushed) {
            this.witch.stateManager.removeState();
            return;
        }
        this.focusCurrentAnimation.update(trueTime);
        super.update(trueTime);

    }

    render() {
        super.render();
        this.focusCurrentAnimation.renderCurrentFrame(this.witch.hitbox.x, this.witch.hitbox.y);
    }
    
    #setupWitch(){

        this.witch.isFocused = true;
        this.witch.isShooting = false;

        let size = this.currentAnimation.getFrameSize();
        this.witch.boundingWidth = size.width;
        this.witch.boundingHeight = size.height;

        this.witch.hitbox.setNewOffsets(FocusState.HITBOX_X_OFFSET, FocusState.HITBOX_Y_OFFSET);

    }
};