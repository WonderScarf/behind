import FightingState from "./FightingState.js";
import Boss from "../../entities/Boss.js";
import { timer } from "../../global.js";


/**
 * Type of state representing when boss is dying.
 */
export default class DyingState extends FightingState {   
    // Properties relating to size and place.
    static HITBOX_X_OFFSET = 100; // The x offset of the rendered hitbox compared to the bounding box.
    static HITBOX_Y_OFFSET = 150; // The y offset of the rendered hitbox compared to the bounding box.

    // Phase change threashold.
    static REMAINING_HP_NEXT_THREASHOLD = .33;


    constructor() {
        super();
    };

    /**
     * Enters the Dying State.
     * @param {{boss: Boss}} paramaters The inputs used when entering the state.
     */
    enter(paramaters) {
        super.enter(paramaters);

        this.setupBoss();

        // Sets a current animation to the index of the name we wanted. It is stored within the state itself so it is saved when changing directory.
        this.currentAnimation = this.boss.animations.get(Boss.SPRITESHEET_NAMES[2]);

        //TODO Implement a dying animation and when it's over set the boss to canRemove = true. For now we will set it here.
        this.boss.canRemove = true;

    }

    /**
     * Returns back to the MoveState from a previous state. In this case it is used to revert the
     * witch's size and hitbox offset to what is expected in this state.
     */
    return() {
        this.setupBoss();
    }

    update(trueTime) {
        super.update(trueTime);

    }

    render() {
        super.render();
    }

    setupBoss() {

    }
}