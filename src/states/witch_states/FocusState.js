import { inputConverter } from "../../global.js";
import Witch from "../../entities/Witch.js";
import MoveState from "./MoveState.js";

/**
* The state that represents when the player slows down to dodge shots also displays hitbox.
*/
export default class FocusState extends MoveState {

    // More shall be added.

    constructor() {
        super();
    };

    /**
     * Enters the FocusState.
     * @param {{witch: Witch}} paramaters The inputs used when entering the state.
     */
    enter(paramaters) {
        super.enter(paramaters);

        if (!this.witch) {
            throw new Error("Cannot enter FocusState as witch is was not set properly in MoveState.");
        }

        this.witch.isFocused = true;
    }

    return() {
        super.return();
        this.witch.isFocused = true;
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

        if (inputConverter.commands.PRIMARY_KEY.isPushed) {
            this.witch.stateManager.loadState("ShootState", { witch: this.witch });
            //this.witch.stateManager.loadState("FocusShootState", { witch: this.witch });
            return;
        }

        //If not pushed, revert to the previous state (which should be the MoveState).
        if (!inputConverter.commands.ALTERNATE_KEY.isPushed) {
            this.witch.stateManager.removeState();
            return;
        }

        //? Note that this this is to make switching between 
        super.update(trueTime);

    }

    render() {
        super.render();
    }
};