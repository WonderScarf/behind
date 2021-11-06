import Witch from "../../entities/Witch.js";
import { inputConverter } from "../../global.js";
import FocusState from "./FocusState.js";
import ShootState from "./ShootState.js";

export default class FocusShootState extends ShootState {

    static HITBOX_X_OFFSET = 150;
    static HITBOX_Y_OFFSET = 150;

    constructor() {
        super();
        
    };

    /**
     * Eneters the FocusShootState.
     * @param {{witch: Witch}} paramaters The inputs used when entering the state.
     */
    enter(paramaters) {
        super.enter(paramaters);
        this.witch.isFocused = true;
    }

    return(){
    }

    exit() {
        this.witch.isFocused = false;
    }

    update(trueTime) {
        if (!inputConverter.commands) {
            throw new Error("Commands have not been initialized and thus cannot be read.");
        }
        if (!this.witch) {
            throw new Error("Commands have not been initialized and thus cannot be read.");
        }

        if(!inputConverter.commands.ALTERNATE_KEY.isPushed){
            console.log("ping")
            this.witch.stateManager.removeState();
        }

        if(!inputConverter.commands.PRIMARY_KEY.isPushed && inputConverter.commands.PRIMARY_KEY.isPushed){
            console.log("ping")
            this.witch.stateManager.removeState();
        }
        
        super.update(trueTime);
        console.log("A")
        //! only updates 1 time then waits then does it for the amount of time
        //! waited needs to be fixed, debug later.
    }

    render() {
        if (!this.witch) {
            throw new Error("The witch within MoveState was not defined, thus it can't move.")
        }

        this.currentAnimation.renderCurrentFrame(this.witch.x, this.witch.y);
    }
}