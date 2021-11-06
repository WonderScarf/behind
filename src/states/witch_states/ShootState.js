import Witch from "../../entities/Witch.js";
import { inputConverter } from "../../global.js";
import MoveState from "./MoveState.js";

export default class ShootState extends MoveState {

    static HITBOX_X_OFFSET = 150;
    static HITBOX_Y_OFFSET = 150;

    constructor() {
        super();
    };

    /**
     * Enters the Shootstate.
     * @param {{witch: Witch}} paramaters The inputs used when entering the state.
     */
    enter(paramaters) {
        if (!paramaters.witch) {
            throw new Error("No witch was input with the paramaters.")
        }

        this.witch = paramaters.witch; //The Witch that will be moved.
        
        // Sets a current animation to the index of the name we wanted.
        this.currentAnimation = this.witch.animations.get(Witch.SPRITESHEET_NAMES[1]);
        this.#setupShootWitch();
    }

    return(){
       this.#setupShootWitch();
    }

    exit() {
        
    }

    update(trueTime) {
        if (!inputConverter.commands) {
            throw new Error("Commands have not been initialized and thus cannot be read.");
        }
        if (!this.witch) {
            throw new Error("Commands have not been initialized and thus cannot be read.");
        }

        
        if(inputConverter.commands.ALTERNATE_KEY.isPushed && !this.witch.isFocused){
            this.witch.stateManager.loadState("FocusShootState", { witch: this.witch });
            return;
        }

        if(!inputConverter.commands.PRIMARY_KEY.isPushed){
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

    #setupShootWitch(){
        let size = this.currentAnimation.getFrameSize();

        this.witch.boundingWidth = size.width;
        this.witch.boundingHeight = size.height;

        this.witch.hitbox.setNewOffsets(ShootState.HITBOX_Y_OFFSET, ShootState.HITBOX_Y_OFFSET);
    }
}