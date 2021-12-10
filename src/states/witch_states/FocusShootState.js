import Witch from "../../entities/Witch.js";
import { inputConverter } from "../../global.js";
import FocusState from "./FocusState.js";
import { BulletType } from "../../enums.js";

/**
 * State representing when the Bullets are being fired and while focusing. Extends 
 * from Focus state and ends when either we stop shooting or focusing.
 */
export default class FocusShootState extends FocusState {

    static HITBOX_X_OFFSET = 11; // The x offset of the rendered hitbox compared to the bounding box.
    static HITBOX_Y_OFFSET = 17; // The y offset of the rendered hitbox compared to the bounding box.
    static MAX_COOLDOWN = 5; // The cooldown between shots in this state.

    constructor() {
        super();
    };

    /**
     * Eneters the FocusShootState.
     * @param {{witch: Witch}} paramaters The inputs used when entering the state.
     */
    enter(paramaters) {
        // Set the paramaters of the objects entered (like the Witch object)
        this.witch = paramaters.witch;

        // Set the current animation to use from the newly set witch.
        this.currentAnimation = this.witch.animations.get(Witch.SPRITESHEET_NAMES[1]);

        // Setup the witch object.
        this.#setupWitch();

    }

    return() {
        this.#setupWitch(); //When returning resetup the witch to state specifications.
    }

    exit() {
        super.exit(); // Makes it so we also do the things we do when we exit Focus State.
        this.witch.isShooting = false; // Signal that we are no longer shooting
    }

    update(trueTime) {
        // Error handling in case of any missing essentials for update.  
        if (!inputConverter.commands) {
            throw new Error("Commands have not been initialized and thus cannot be read.");
        }
        else if (!this.witch) {
            throw new Error("Witch have not been initialized and thus cannot be read.");
        }
        else if (!this.witch.stateManager) {
            throw new Error("Witch's state manager have not been initialized and thus cannot be read. ");
        }

        /* If either the ALTERNATE_KEY or PRIMARY_KEY is pushed we remove from the state manager twice.
        this is because if we are in the FocusShootState we must be bellow both the FocusState and the
        ShootState in an unknown order. Since the order is unknown and we want to make a fluent 
        transition from the ALTERNATE_KEY being unpressed to the ShootState / from the PRIMARY_KEY 
        being unpressed to the FocusState the only way is to remove both and the next frame which
        is unubservable to the naked eye we move to the appropriate state based on the logic within
        MoveState and it's friends.*/
        if (!inputConverter.commands.ALTERNATE_KEY.isPushed || !inputConverter.commands.PRIMARY_KEY.isPushed) {
            this.witch.stateManager.removeState();
            this.witch.stateManager.removeState();
            return;
        }

        // Checks if the cooldown has been passed.
        if (this.cooldown < FocusShootState.MAX_COOLDOWN) {
            this.cooldown++;
        }
        else {
            this.witch.shoot(BulletType.WitchFocus);
            this.cooldown = 0; // We reset the current cooldown / initialize if cooldown is null.
        }

        super.update(trueTime); // Update the focus state it is extending.

    }

    render() {
        if (!this.witch) {
            throw new Error("The witch within MoveState was not defined, thus it can't move.")
        }

        this.currentAnimation.renderCurrentFrame(this.witch.x, this.witch.y);
    }

    /**
     * Sets up the witch object to match requirements of the FocusShootState (this is just meant 
     * to organize the code and make it cleaner to read).
     * @private
     * @throws When witch is null, undefined or illegible to JavaScript.
     */
    #setupWitch() {

        // Determine the itch's bounding box sizes via it's animation.
        let size = this.currentAnimation.getFrameSize();

        // Update the witch's bounding box acording to the sizes obtained.
        this.witch.boundingWidth = size.width;
        this.witch.boundingHeight = size.height;

        this.witch.isFocused = true;
        this.witch.isShooting = true;

        // Set the hitbox offsets based on this state's default values.
        this.witch.hitbox.setNewOffsets(FocusShootState.HITBOX_X_OFFSET, FocusShootState.HITBOX_Y_OFFSET);
    }
}