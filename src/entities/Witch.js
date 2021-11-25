//@ts-nocheck

import {CANVAS_WIDTH, CANVAS_HEIGHT, loadedImages, stateManager} from "../global.js";
import StateManager from "../states/StateManager.js";
import FocusState from "../states/witch_states/FocusState.js";
import MoveState from "../states/witch_states/MoveState.js";
import ShootState from "../states/witch_states/ShootState.js";
import Entity from "./Entity.js";
import Animation from "../../lib/time_management/Animation.js";
import FocusShootState from "../states/witch_states/FocusShootState.js";
import { BulletFactory } from "../factories/BulletFactory.js";
import { Direction } from "../enums.js"; 

/**
 * The player entity that uses states and user inputs to determine how they
 * interact with the play state. They can move, focus, dodge, shoot, bomb
 * and die. They offer a wide variety of interactions with other entities.
 */
export default class Witch extends Entity{
    
    static FOCUS_SPEED_MODIFIER = 5;

    static SPRITESHEET_NAMES = ["witch-move", "witch-shoot"];
    static INTERVAL = .4;
    static SPEED = 900;

    static SPRITE_SIZES = {
        "witch-shoot": {width: 210, height: 350},
        "witch-move": {width: 210, height: 350},
        "witch-focus": {width: 210, height: 350}
    }

    //The hitbox size
    static HITBOX_WIDTH = 32;
    static HITBOX_HEIGHT = 32;

    constructor(){ 
        
        super({
            // The spawn-point
            x: (CANVAS_WIDTH * .25),
            y: (CANVAS_HEIGHT * .5),

            // Bounding Box
            boundingWidth: Witch.SPRITE_SIZES["witch-move"].width,
            boundingHeight: Witch.SPRITE_SIZES["witch-move"].height,  

            // Hitbox
            hitboxWidth: Witch.HITBOX_WIDTH,
            hitboxHeight: Witch.HITBOX_HEIGHT, 
            
        });


        // Gets and then sets to sprites all the sprites relating to witch
        this.setSprites();

        // Makes the state machine and loads the first state.
        this.#setStates();

        /** If the entity is currently focused, should be a boolean. Affects speed, shot type, etc. */
        this.isFocused = false;
        
        this.isShooting = false;

        this.bullets = [];
    }

    // Standard Entity functions...

    update(trueTime) {
        // Updates itself via depending on it's state manager's current state.
        this.stateManager.updateState(trueTime);

        super.update(trueTime);
    }

    render() {
        // Updates itself depending on it's state manager's current state.
        this.stateManager.renderState();

        // Render the hitbox and entity (mainly for debugging purposes).
        this.hitbox.render();
        super.render();
    }

    // Entity sprite/animation functions... 

    setSprites(){

       let spriteSheet;

        for (let spritesheetIndex = 0; spritesheetIndex < Witch.SPRITESHEET_NAMES.length; spritesheetIndex++) {

            spriteSheet = loadedImages.get(Witch.SPRITESHEET_NAMES[spritesheetIndex]);
            this.animations.set(Witch.SPRITESHEET_NAMES[spritesheetIndex], new Animation(spriteSheet.getSprites(), Witch.INTERVAL));
        }
    }

    /**
     * Move the witch based on the values presented by x and y.
     * @param {Number} xInitialModifier 
     * @param {Number} yInitialModifier 
     */
    move(xInitialModifier ,yInitialModifier){

        // Assign the x and y modifier to 
        let xModifier = xInitialModifier;
        let yModifier = yInitialModifier;

        // If focused we divide the x and y modifier by the focus speed modifier.
        if(this.isFocused){
            xModifier /= Witch.FOCUS_SPEED_MODIFIER;
            yModifier /= Witch.FOCUS_SPEED_MODIFIER;
        } 

        //Generate the new x and y
        this.x += Witch.SPEED * xModifier;
        this.y += Witch.SPEED * yModifier;
    }

    /**
     * Launces a bullet from it's own place depending on type of bullet input and sends it to the entities in it's playstate.    
     * @param {*} type 
     */
    shoot(type){
        //TODO find a way to only fire a bullet based on a firerate that will change depending on state.
    
        let bullet = BulletFactory.createInstance(type, this.x, this.y, Direction.Up); // Make a bullet using the object factory based on the type input.
        stateManager.getCurrentState().addEntity(bullet) // Adds the bullet to the current playstate.
    }


    // Private functions meant to hold functions that should be abstracted.

    /**
     * Sets up the witches StateManager with it's states. Should only be called in the
     * constructor.
     * @private 
     * 
     */
    #setStates(){
        // Creates a new state manager to manage the player's states.
        this.stateManager = new StateManager();

        //Should make the labels an enum with a value of the label.
        this.stateManager.saveStateType("MoveState", new MoveState());
        this.stateManager.saveStateType("FocusState", new FocusState());
        this.stateManager.saveStateType("ShootState", new ShootState());
        this.stateManager.saveStateType("FocusShootState", new FocusShootState());

        // Sets default state to move state.
        this.stateManager.loadState("MoveState",{witch: this});
    }
}
