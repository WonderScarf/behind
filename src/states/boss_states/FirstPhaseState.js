import FightingState from "./FightingState.js";
import Witch from "../../entities/Witch.js";
import Boss from "../../entities/Boss.js";
import { BulletType, Direction } from "../../enums.js";

/**
 * The logic for the first phase of the fight
 */
export default class FirstPhaseState extends FightingState {   

    // Properties relating to size and place.
    static HITBOX_X_OFFSET = 100; // The x offset of the rendered hitbox compared to the bounding box.
    static HITBOX_Y_OFFSET = 150; // The y offset of the rendered hitbox compared to the bounding box.

    // Properties relating to movement...
    static MOVEMENT_BUFFER_WIDTH = 8; // Number representing how closely Boss should aim to follow Witch.

    // Proporties of the shots fired directly bellow the Boss...
    static MAX_COOLDOWN_A = 20;
    static CLIP_SIZE_A = 10;

    // Properties relating to the shots fired to the sides.
    static MAX_COOLDOWN_B = 20;


    constructor(){
        super();
    };

    /**
     * Enters the FirstPhaseState.
     * @param {{boss: Boss, witch: Witch}} paramaters The inputs used when entering the state.
     */
    enter(paramaters){
        super.enter(paramaters);
        
        this.witch = paramaters.witch;

        this.setupBoss();

        // Sets a current animation to the index of the name we wanted. It is stored within the state itself so it is saved when changing directory.
        this.currentAnimation = this.boss.animations.get(Boss.SPRITESHEET_NAMES[0]);


    }

    /**
     * Returns back to the MoveState from a previous state. In this case it is used to revert the
     * witch's size and hitbox offset to what is expected in this state.
     */
    return() {
        this.setupBoss();
    }

    update(trueTime) {
        
        this.#followWitch(trueTime); // Boss follows the Witch's movements as best as they could.
        


        // Managing B-Type Bullets

        // Quick algorithm to make bullets only shoot when cooldown is up.
        if(this.cooldownB < FirstPhaseState.MAX_COOLDOWN_B){
            this.cooldownB++; //TODO refine by incremention based on truetime.
        }
        else {
            this.boss.shoot(BulletType.Direct); // We shoot a witch type bullet.
            this.cooldownB = 0; // We reset the current cooldown / initialize if cooldown is null.
        }

        super.update(trueTime); 
    }

    render() {
        super.render();
    }

    setupBoss(){
    }

    // Unqiue functions...


    /**
     * Follows the witch's X placement. 
     * @param {Number} trueTime
     * @private 
     */
    #followWitch(trueTime){

        // Gets the center X point of both th witch and the boss
        let witchX = ( this.witch.x - ( this.witch.boundingWidth / 2 ) );
        let bossX = ( this.boss.x - ( this.boss.boundingWidth / 2 ) );

        // Change the boss's direction depending on how far they are from the player.
        if( FirstPhaseState.MOVEMENT_BUFFER_WIDTH > Math.abs( witchX - bossX ) ) {
            this.boss.direction = Direction.None;
        }
        else if(witchX > bossX) {
            this.boss.direction = Direction.Right;
        }
        else {
            this.boss.direction = Direction.Left;
        }

        this.boss.move(trueTime);
    }

}