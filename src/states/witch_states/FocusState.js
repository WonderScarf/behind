import { inputConverter } from "../../global.js";
import Witch from "../../entities/Witch.js";
import MoveState from "./MoveState.js";
import { context } from "../../global.js";

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
     * @param {{witch: Witch, }} paramaters The inputs used when entering the state.
     */
    enter(paramaters) {
        super.enter(paramaters);

        if(!this.witch){
            throw new Error("Cannot exit FocusState as witch is was not set properly in MoveState.");
        }

        this.witch.isFocused = true;
    }

    exit() {
        // Run exit code

        if(!this.witch){
            throw new Error("Cannot exit FocusState as witch is null or undefined.");
        }

        this.witch.isFocused = false;
    }

    update(trueTime) {

        if (!inputConverter.commands) {
            throw new Error("Commands have not been initialized and thus cannot be read.");
        }

        if (!this.witch) {
            throw new Error("Commands have not been initialized and thus cannot be read.");
        }

        //If not pushed, revert to the previous state (which should be the MoveState).
        if (!inputConverter.commands.ALTERNATE_KEY.isPushed) {
            this.witch.stateManager.removeState();
            return;
        }

        super.update(trueTime);

     }

    render() {
        super.render();

        if(!this.witch){
            throw new Error("Cannot render FocusState as witch is null or undefined.");
        }

        // We would make this the focus animation loop
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
        
        //this.witch.soul.render();
    }
};