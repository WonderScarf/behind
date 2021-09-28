
import Witch from "../../entities/Witch.js";
import State from "../State.js";
import { inputConverter } from "../../global.js";

export default class MoveState extends State {

    // More shall be added.

    constructor() {
        super();
        this.witch;
    };

    /**
     * Enters the MoveState.
     * @param {{witch: Witch}} paramaters The inputs used when entering the state.
     */
    enter(paramaters) {
        if (!paramaters.witch) {
            throw new Error("No witch was input with the paramaters.")
        }

        this.witch = paramaters.witch; //The Witch that will be moved.
    }

    update(trueTime) {
        if (!inputConverter.commands) {
            throw new Error("Commands have not been initialized and thus cannot be read.");
        }

        if (!this.witch) {
            throw new Error("Commands have not been initialized and thus cannot be read.");
        }

        if(!inputConverter.commands.PRIMARY_KEY.isPushed){
            this.witch.stateManager.removeState();
        }


    }

    render() {
        if (!this.witch) {
            throw new Error("The witch within MoveState was not defined, thus it can't move.")
        }

        this.witch.render();
    }
}