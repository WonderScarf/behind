import FightingState from "./FightingState.js";
import Witch from "../../entities/Witch.js";
import Boss from "../../entities/Boss.js";
import { BulletType, Direction } from "../../enums.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT, stateManager } from "../../global.js";

/**
 * The logic for the first phase of the fight
 */
export default class FirstPhaseState extends FightingState {

    // Properties relating to size and place.
    static HITBOX_X_OFFSET = 100; // The x offset of the rendered hitbox compared to the bounding box.
    static HITBOX_Y_OFFSET = 150; // The y offset of the rendered hitbox compared to the bounding box.

    // Properties relating to movement...
    static MOVEMENT_BUFFER_WIDTH = 8; // Number representing how closely Boss should aim to follow Witch.

    // Proporties of the shots fired directly from the Boss...
    static MAX_COOLDOWN_A = 5;
    static BETWEEN_CLIP_COOLDOWN_A = 55;
    static CLIP_SIZE_A = 10;

    // Properties relating to the shots fired to the sides.
    static MAX_COOLDOWN_B = 20;

    // Phase change threshold.
    static REMAINING_HP_NEXT_THREASHOLD = .66


    constructor() {
        super();
    };

    /**
     * Enters the FirstPhaseState.
     * @param {{boss: Boss, witch: Witch}} paramaters The inputs used when entering the state.
     */
    enter(paramaters) {
        console.log("Entering FirstPhaseState...")
        super.enter(paramaters);

        this.witch = paramaters.witch;

        this.setupBoss();

        // Sets a current animation to the index of the name we wanted. It is stored within the state itself so it is saved when changing directory.
        this.currentAnimation = this.boss.animations.get(Boss.SPRITESHEET_NAMES[0]);

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

        // We check if we have the threashold to change Phase from 1 to 2 and change
        if( FirstPhaseState.REMAINING_HP_NEXT_THREASHOLD >= (this.boss.hp / Boss.MAX_HP) ) {
            this.boss.stateManager.loadState("SecondPhaseState", {boss: this.boss, witch: this.witch})
        }

        this.#followWitch(trueTime); // Boss follows the Witch's movements as best as they could.

        // Managing spawning The different Bullets that the boss fires.
        this.#shootAType();
        this.#shootBType();

        super.update(trueTime);
    }

    render() {
        super.render();
    }

    setupBoss() {

    }


    // Unqiue functions...

    /**
     * Follows the witch's X placement. 
     * @param {Number} trueTime
     * @private 
     */
    #followWitch(trueTime) {

        // Gets the center X point of both th witch and the boss
        let witchX = (this.witch.x - (this.witch.boundingWidth / 2));
        let bossX = (this.boss.x - (this.boss.boundingWidth / 2));

        // Change the boss's direction depending on how far they are from the player.
        if (FirstPhaseState.MOVEMENT_BUFFER_WIDTH > Math.abs(witchX - bossX)) {
            this.boss.direction = Direction.None;
        }
        else if (witchX > bossX) {
            this.boss.direction = Direction.Right;
        }
        else {
            this.boss.direction = Direction.Left;
        }

        this.boss.move(trueTime);
    }

    /**
     * Spawns a B-type Direct bullets on the screen randomly
     * @param {BulletType} type 
     * @returns {{x: Number, y:Number, direction: Direction }} 
     * @private
     */
    #randomSideSpawn() {
        // The varriables representing the spawn point of the bullet
        let spawnX;
        let spawnY = Math.random() * CANVAS_HEIGHT;

        // TODO implement that it spawns completely inbound via the bullets' width.
        // ? Maybe a timer of some sort that sets the bullet to dead when the we would determined as reaching it's destination.

        // Randomly pick either left or right
        let direction = Math.floor(Math.random() * 2) + 2;

        if (direction == Direction.Left) {
            spawnX = 0;
        }
        else if (direction == Direction.Right) {
            spawnX = CANVAS_WIDTH - 100;
        }


        return { x: spawnX, y: spawnY, direction: direction };
    }

    /**
     * Manages the cooldowns of the A-Type Direct bullets that the boss fires 
     * and shoots when it is determined it should.
     * @private
     */
    #shootAType() {

        if (this.cooldownA < FirstPhaseState.MAX_COOLDOWN_A) {
            this.cooldownA++;
        }
        else {
            if (this.clipCooldownA >= FirstPhaseState.BETWEEN_CLIP_COOLDOWN_A) {
                this.clipCooldownA = 0;
                this.clipUsed = 0;
            }
            else if (this.clipUsed <= FirstPhaseState.CLIP_SIZE_A) {

                this.boss.shoot(BulletType.Direct);

                this.clipUsed++;
                this.cooldownA = 0;
            }
            else {
                this.clipCooldownA++;
            }
        }
    }

    /**
     * Manages the cooldowns of the B-Type Direct bullets that the boss fires 
     * and shoots when it is determined it should.
     * @private
     */
    #shootBType() {

        if (this.cooldownB < FirstPhaseState.MAX_COOLDOWN_B) {
            this.cooldownB++; //TODO refine by incremention based on truetime.
        }
        else {

            let bulletDataB = this.#randomSideSpawn(BulletType.Direct);

            this.boss.shoot(BulletType.Direct, bulletDataB.direction, bulletDataB.x, bulletDataB.y);
            this.cooldownB = 0; // We reset the current cooldown / initialize if cooldown is null.
        }
    }
}