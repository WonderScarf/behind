// @ts-nocheck
import Sprite from "../../lib/sprite_management/Sprite.js";
import {CANVAS_WIDTH, CANVAS_HEIGHT, loadedImages} from "../global.js";
import StateManager from "../states/StateManager.js";
import DodgeState from "../states/witch_states/DodgeState.js";
import FocusState from "../states/witch_states/FocusState.js";
import MoveState from "../states/witch_states/MoveState.js";
import Entity from "./Entity.js";
import Soul from "./Soul.js";

/**
 * The player entity that uses states and user inputs to determine how they
 * interact with the play state. They can move, focus, dodge, shoot, bomb
 * and die. They offer a wide variety of interactions with other entities.
 */
export default class Witch extends Entity{

    //TODO constructor should take in a witchType which will determine what it's pallette and bullets are. 
    constructor(){ 

        super(
            (CANVAS_WIDTH / 2), 
            (CANVAS_HEIGHT * .5), 
            300, 
            350, 
            Witch.generateWitchSprites()
        );

        /** The speed the witch moves.*/
        this.speed = 900; 

        /** If the entity is currently focused, should be a boolean. Affects speed, shot type, etc. */
        this.isFocused = false;

        // For now it will be hardcoded but later I want it based on sprite size and.
        let soulSize = 15;
        this.soul = new Soul(this.x + ((this.width - soulSize) / 2), this.y + ((this.height - soulSize) / 2), soulSize, soulSize); 
        
        // Makes the state machine and loads the first state.
        this.#setupStates();
    }


    update(trueTime) {
        // Updates itself via depending on it's state manager's current state.
        this.stateManager.updateState(trueTime);
    }

    render() {
        // Updates itself depending on it's state manager's current state.
        this.stateManager.renderState();
    }

    move(x ,y){
        let mod = 1;

        if(this.isFocused){
            mod = mod / 5;
        }

        this.x += this.speed * (x * mod);
        this.y += this.speed * (y * mod);

        this.soul.x += this.speed * (x * mod);
        this.soul.y += this.speed * (y * mod);
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
        
        //TODO remove, replace with parrying since it sounds way more fun.
        this.stateManager.saveStateType("DodgeState", new DodgeState()); 

        // Sets default state to move state.
        this.stateManager.loadState("MoveState",{witch: this});
    }

    static generateWitchSprites(){
        let sprites = [];

        let spriteSheet = loadedImages.get("witch");

        sprites.push(new Sprite(
            spriteSheet,
            0,
            0,
            spriteSheet.width,
            spriteSheet.height,
        ));

        return sprites;
    }

    #setAnimations(){
        this.animations = {
            
        };
    }
}
