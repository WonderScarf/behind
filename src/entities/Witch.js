// @ts-nocheck
import {CANVAS_WIDTH, CANVAS_HEIGHT} from "../global.js";
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

    constructor(){ 
        
        /* May want to determine size based on images when we get them. Along with removing hardcoding.
           Note that the hitbox being smaller then the model will need to be accounted for as well though
           the hitbox can be it's own entity so we can calculate graze with the witch sizes and if we are hit
           with the hitbox sizes
        */
        super((CANVAS_WIDTH / 2) - 60, (CANVAS_HEIGHT * .80) , 60, 70);
        
        /* For now it will be null but later on it will have it's own class used to mark the glowy orb thing
           that allot of pressision bullet-hells have.
        */
        this.bullets = [];

        this.speed = 265; 
        this.isFocused = false;
       
        // For now it will be hardcoded but later I want it based on sprite size.
        let soulSize = 15;
        this.soul = new Soul(this.x + ((this.width - soulSize) / 2), this.y + ((this.height - soulSize) / 2), soulSize, soulSize); 

        this.stateManager = new StateManager();
        
        //Should make the labels an enum with a value of the label.
        this.stateManager.saveStateType("MoveState", new MoveState());
        this.stateManager.saveStateType("FocusState", new FocusState());
        this.stateManager.saveStateType("DodgeState", new DodgeState());

        this.stateManager.loadState("MoveState",{witch: this});
    }

    move(x ,y){
        let mod = 1;

        if(this.isFocused){
            mod = mod / 2;
        }

        this.x += this.speed * (x * mod);
        this.y += this.speed * (y * mod);

        this.soul.x += this.speed * (x * mod);
        this.soul.y += this.speed * (y * mod);

        
    }

    update(trueTime) {
        this.stateManager.updateState(trueTime);
    }

    render() {
        this.stateManager.renderState();
    }
}
