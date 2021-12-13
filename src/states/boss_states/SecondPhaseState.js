import FightingState from "./FightingState.js";
import Witch from "../../entities/Witch.js";
import Boss from "../../entities/Boss.js";
import { BulletType, Direction } from "../../enums.js";
import { CANVAS_WIDTH, timer } from "../../global.js";
import FirstPhaseState from "./FirstPhaseState.js";

/**
 * The logic for the second phase of the fight
 */
 export default class SecondPhaseState extends FightingState {   
    // Properties relating to size and place.
    static HITBOX_X_OFFSET = 100; // The x offset of the rendered hitbox compared to the bounding box.
    static HITBOX_Y_OFFSET = 150; // The y offset of the rendered hitbox compared to the bounding box.

    // Proporties of the shots fired directly from the Boss...
    static MAX_COOLDOWN = 40;

    // Phase change threashold.
    static REMAINING_HP_NEXT_THREASHOLD = .33;


    constructor() {
        super();
    };

    /**
     * Enters the SecondPhaseState.
     * @param {{boss: Boss, witch: Witch}} paramaters The inputs used when entering the state.
     */
    enter(paramaters) {
        super.enter(paramaters);

        this.witch = paramaters.witch;

        this.setupBoss();


        let destinationX = (CANVAS_WIDTH / 2) - (this.boss.boundingWidth / 2);
        timer.tween(this.boss, ['x'], [destinationX], .2, () => {

		});

        // Sets a current animation to the index of the name we wanted. It is stored within the state itself so it is saved when changing directory.
        this.currentAnimation = this.boss.animations.get(Boss.SPRITESHEET_NAMES[1]);


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
        if( SecondPhaseState.REMAINING_HP_NEXT_THREASHOLD >= (this.boss.hp / Boss.MAX_HP) ) {
            this.boss.stateManager.loadState("ThirdPhaseState", {boss: this.boss, witch: this.witch})
        }

        //this.#moveToCenter(trueTime);

        // Managing spawning The different Bullets that the boss fires.
        if(this.cooldown < SecondPhaseState.MAX_COOLDOWN){
            this.cooldown++;
        }
        else {
            this.boss.shoot(BulletType.Aoe, Direction.None,  this.witch.hitbox.x - (this.currentAnimation.getCurrentFrame().width), this.witch.hitbox.y + (this.witch.hitbox.height / 2) ); // We shoot a aoe type bullet.
            this.cooldown = 0; // We reset the current cooldown / initialize if cooldown is null.
        }

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
        let destinationX = (CANVAS_WIDTH / 2) - (this.currentAnimation / 2);
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
}