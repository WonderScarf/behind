import FightingState from "./FightingState.js";
import Witch from "../../entities/Witch.js";
import Boss from "../../entities/Boss.js";
import { BulletType, Direction } from "../../enums.js";
import { CANVAS_WIDTH } from "../../global.js";
import FirstPhaseState from "./FirstPhaseState.js";

/**
 * The logic for the third phase of the fight
 */
export default class ThirdPhaseState extends FightingState {   
    // Properties relating to size and place.
    static HITBOX_X_OFFSET = 100; // The x offset of the rendered hitbox compared to the bounding box.
    static HITBOX_Y_OFFSET = 150; // The y offset of the rendered hitbox compared to the bounding box.

    // Proporties of the shots fired directly from the Boss...
    static MAX_COOLDOWN_A = 5;
    static BETWEEN_CLIP_COOLDOWN_A = 55;
    static CLIP_SIZE_A = 10;

    // Properties relating to the shots fired to the sides.
    static MAX_COOLDOWN_B = 20;

    // Phase change threashold.
    static REMAINING_HP_NEXT_THREASHOLD = .33;


    constructor() {
        super();
    };

    /**
     * Enters the ThirdPhaseState.
     * @param {{boss: Boss, witch: Witch}} paramaters The inputs used when entering the state.
     */
    enter(paramaters) {
        console.log("Entering ThirdPhase...")
        super.enter(paramaters);

        this.witch = paramaters.witch;

        this.setupBoss();

        // Sets a current animation to the index of the name we wanted. It is stored within the state itself so it is saved when changing directory.
        this.currentAnimation = this.boss.animations.get(Boss.SPRITESHEET_NAMES[1]);

        this.clipUsed = 0;
        this.clipCooldownA = 0;

    }

    /**
     * Returns back to the MoveState from a previous state. In this case it is used to revert the
     * witch's size and hitbox offset to what is expected in this state.
     */
    return() {
        this.setupBoss();
    }

    update(trueTime) {

        // We enter dying state when we reach 0 or less.
        if(0 >= this.boss.hp) {
            this.boss.stateManager.loadState("DyingState", {boss: this.boss});
        }

        this.#moveToCenter(trueTime);

        // Managing spawning The different Bullets that the boss fires.
        this.#shootAType();

        super.update(trueTime);
    }

    render() {
        super.render();
    }

    setupBoss() {

    }

    // Unqiue functions...

    /**
     * Moves the boss to the center of the canvas width.
     * @param {Number} trueTime
     * @private 
     */
    #moveToCenter(trueTime) {
        // Gets the center X point of both th witch and the boss
        let destinationX = CANVAS_WIDTH / 2;
        let bossX = (this.boss.x - (this.boss.boundingWidth / 2));

        // Change the boss's direction depending on how far they are from the player.
        if (FirstPhaseState.MOVEMENT_BUFFER_WIDTH > Math.abs(destinationX - bossX)) {
            this.boss.direction = Direction.None;
        }
        else if (destinationX > bossX) {
            this.boss.direction = Direction.Right;
        }
        else {
            this.boss.direction = Direction.Left;
        }

        this.boss.move(trueTime);
    }

    /**
     * Manages the cooldowns of the A-Type Direct bullets that the boss fires 
     * and shoots when it is determined it should.
     */
    #shootAType() {

        if (this.cooldownA < ThirdPhaseState.MAX_COOLDOWN_A) {
            this.cooldownA++;
        }
        else {
            if (this.clipCooldownA >= ThirdPhaseState.BETWEEN_CLIP_COOLDOWN_A) {
                this.clipCooldownA = 0;
                this.clipUsed = 0;
            }
            else if (this.clipUsed <= ThirdPhaseState.CLIP_SIZE_A) {

                this.boss.shoot(BulletType.Direct);

                this.clipUsed++;
                this.cooldownA = 0;
            }
            else {
                this.clipCooldownA++;
            }
        }
    }
}