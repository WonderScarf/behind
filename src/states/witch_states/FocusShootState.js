//@ts-nocheck
import Witch from "../../entities/Witch.js";
import { inputConverter } from "../../global.js";
import FocusState from "./FocusState.js";
import ShootState from "./ShootState.js";

/**
 * State representing the 
 */
export default class FocusShootState extends FocusState {

    static HITBOX_X_OFFSET = 80;
    static HITBOX_Y_OFFSET = 150;

    constructor() {
        super();
    };

    /**
     * Eneters the FocusShootState.
     * @param {{witch: Witch}} paramaters The inputs used when entering the state.
     */
    enter(paramaters) {
        this.witch = paramaters.witch;
        this.currentAnimation = this.witch.animations.get(Witch.SPRITESHEET_NAMES[1]);
        
        this.#setupWitch();
    }

    return(){
        this.#setupWitch();
    }

    exit() {
        super.exit();
        this.witch.isShooting = false;

    }

    update(trueTime) {
        if (!inputConverter.commands) {
            throw new Error("Commands have not been initialized and thus cannot be read.");
        }
        else if (!this.witch) {
            throw new Error("Witch have not been initialized and thus cannot be read.");
        }
        else if (!this.witch.stateManager) {
            throw new Error("Witch's state manager have not been initialized and thus cannot be read. ");
        }


        if(!inputConverter.commands.ALTERNATE_KEY.isPushed || !inputConverter.commands.PRIMARY_KEY.isPushed ){
            this.witch.stateManager.removeState();
            this.witch.stateManager.removeState();
            return;
        }
        
        super.update(trueTime);

    }

    render() {
        if (!this.witch) {
            throw new Error("The witch within MoveState was not defined, thus it can't move.")
        }

        this.currentAnimation.renderCurrentFrame(this.witch.x, this.witch.y);
    }

    #setupWitch(){
        let size = this.currentAnimation.getFrameSize();

        this.witch.boundingWidth = size.width;
        this.witch.boundingHeight = size.height;

        this.witch.isFocused = true;
        this.witch.isShooting = true;
        
        this.witch.hitbox.setNewOffsets(FocusShootState.HITBOX_X_OFFSET, FocusShootState.HITBOX_Y_OFFSET);
    }
}