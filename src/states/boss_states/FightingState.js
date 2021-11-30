import Boss from "../../entities/Boss.js";
import State from "../State.js";


/**
 * Type of state representing a phase in a boss fight, should be overidden by more specific phase Object.
 */
export default class FightingState extends State {   
    static HITBOX_X_OFFSET = 100; // The x offset of the rendered hitbox compared to the bounding box.
    static HITBOX_Y_OFFSET = 150; // The y offset of the rendered hitbox compared to the bounding box.

    constructor(){
        super();
    };

    /**
     * Enters the FightingState.
     * @param {{boss: Boss, witch: Witch}} paramaters The inputs used when entering the state.
     */
    enter(paramaters){
        if(!paramaters.boss){
            throw new Error("No boss was input with the paramaters.")
        }

        console.log(paramaters.boss);

        this.boss = paramaters.boss;
        
        // We set up the witch's new properties to match the current state.
        //this.setupBoss();
    }

    /**
     * Returns back to the MoveState from a previous state. In this case it is used to revert the
     * witch's size and hitbox offset to what is expected in this state.
     */
    return() {
        this.setupBoss();
    }

    exit(){
        throw Error("MoveState is the default state for the Witch and as such can not be exited.")
    }

    update(trueTime) {
        this.currentAnimation.update(trueTime); // Update the current states' animation.
    }

    render() {
        // Throws an error in if there is no witch to render. 
        if(!this.boss){
            throw new Error("The boss within FightingState was not defined, thus it can't be rendered.")
        }

        // Render the current animation frame to the canvas.
        this.currentAnimation.renderCurrentFrame(this.boss.x, this.boss.y);
    }

    setupBoss(){
        throw Error("Cannot setup the boss's state in FightingState as it is meant to be abstract.")
    }
}