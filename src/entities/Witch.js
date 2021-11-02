import Sprite from "../../lib/sprite_management/Sprite.js";
import {CANVAS_WIDTH, CANVAS_HEIGHT, loadedImages} from "../global.js";
import StateManager from "../states/StateManager.js";
import FocusState from "../states/witch_states/FocusState.js";
import MoveState from "../states/witch_states/MoveState.js";
import ShootState from "../states/witch_states/ShootState.js";
import Entity from "./Entity.js";
import Hitbox from "./Hitbox.js";
import Soul from "./Soul.js";

/**
 * The player entity that uses states and user inputs to determine how they
 * interact with the play state. They can move, focus, dodge, shoot, bomb
 * and die. They offer a wide variety of interactions with other entities.
 */
export default class Witch extends Entity{
    
    static FOCUS_SPEED_MODIFIER = 5;
    
    static SPEED = 900;

    static SPRITE_SIZES = {
        "witch-shoot": {width: 210, height: 350},
        "witch-move": {width: 210, height: 350},
        "witch-focus": {width: 210, height: 350}
    }

    //The hitbox size
    static HITBOX_WIDTH = 15;
    static HITBOX_HEIGHT =15;

    // TODO constructor should take in a witchType which will determine what it's pallette and bullets are. 
    constructor(){ 
        super(
            ((CANVAS_WIDTH / 2)), 
            (CANVAS_HEIGHT * .5), 
            Witch.SPRITE_SIZES["witch-move"].width,
            Witch.SPRITE_SIZES["witch-move"].height,
            );
        
        // Gets all sprites relating to witch
        this.#getWitchSprites();
        //TODO Makes the animation states.
        this.#setupAnimations();
        //TODO Sets up the hitboxes
        this.#setupHitboxes();
        // Makes the state machine and loads the first state.
        this.#setupStates();

        /** If the entity is currently focused, should be a boolean. Affects speed, shot type, etc. */
        this.isFocused = false;

        // For now it will be hardcoded but later I want it based on sprite size and.
        //this.soul = new Soul(this.x + ((this.width - Witch.HITBOX_WIDTH) / 2), this.y + ((this.height - Witch.HITBOX_HEIGHT) / 2), Witch.HITBOX_WIDTH, Witch.HITBOX_HEIGHT); 

    }

    update(trueTime) {
        // Updates itself via depending on it's state manager's current state.
        this.stateManager.updateState(trueTime);
    }

    render() {
        // Updates itself depending on it's state manager's current state.
        this.stateManager.renderState();
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
        
        //this.soul.x += Witch.SPEED * xModifier;
        //this.soul.y += Witch.SPEED * yModifier;
    }

    /**
     * Sets up the witches StateManager with it's states. Should only be called in the
     * constructor.
     * @private 
     */
    #setupStates(){
        // Creates a new state manager to manage the player's states.
        this.stateManager = new StateManager();

        //Should make the labels an enum with a value of the label.
        this.stateManager.saveStateType("MoveState", new MoveState());
        this.stateManager.saveStateType("FocusState", new FocusState());
        this.stateManager.saveStateType("ShootState", new ShootState());

        // Sets default state to move state.
        this.stateManager.loadState("MoveState",{witch: this});
    }

    #getWitchSprites(){
        let spriteNames = [];

        spriteNames.push("witch-move");

        let spriteSheet = loadedImages.get("witch-move");

        for (let currentSheet = 0; index < spriteNames.length; index++) {
                        
        }

        this.sprites.push(new Sprite(spriteSheet, 0, 0, spriteSheet.width, spriteSheet.height,));

        this.sprites;
    }

    #setupAnimations(){
        this.animations = {
            
        };
    }
}
