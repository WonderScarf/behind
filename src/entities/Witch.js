import {CANVAS_WIDTH, CANVAS_HEIGHT, loadedImages, stateManager, sounds} from "../global.js";
import StateManager from "../states/StateManager.js";
import FocusState from "../states/witch_states/FocusState.js";
import MoveState from "../states/witch_states/MoveState.js";
import ShootState from "../states/witch_states/ShootState.js";
import Entity from "./Entity.js";
import Animation from "../../lib/time_management/Animation.js";
import FocusShootState from "../states/witch_states/FocusShootState.js";
import { BulletFactory } from "../factories/BulletFactory.js";
import { Direction, HitboxId, SoundName } from "../enums.js"; 

/**
 * The player entity that uses states and user inputs to determine how they
 * interact with the play state. They can move, focus, dodge, shoot, bomb
 * and die. They offer a wide variety of interactions with other entities.
 */
export default class Witch extends Entity{
    
    static FOCUS_SPEED_MODIFIER = 4;

    static SPRITESHEET_NAMES = ["witch-move", "witch-shoot","focus_hitbox"];
    static INTERVAL = .15;
    static SPEED = 600;

    //The hitbox
    static HITBOX_WIDTH = 10;
    static HITBOX_HEIGHT = 10;

    constructor(){ 
        
        super({
            // The spawn-point
            x: (CANVAS_WIDTH * .25),
            y: (CANVAS_HEIGHT / 2),

            // Bounding Box
            boundingWidth: 1,
            boundingHeight: 1,  

            // Hitbox
            hitboxWidth: Witch.HITBOX_WIDTH,
            hitboxHeight: Witch.HITBOX_HEIGHT, 
            hitboxId: HitboxId.WitchHit
            
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

        // The place the hitbox will be when after moved.
        let predictedHitboxPoint = { x: this.hitbox.x + (xModifier * Witch.SPEED) , y: this.hitbox.y + (yModifier * Witch.SPEED) };

        /* We determine if the hitbox will be out of bounds if we move and change action acordingly.
           We do this as the player cannot go oob in any circumstance.*/
        if((predictedHitboxPoint.x + this.hitbox.width) > CANVAS_WIDTH) { 
            this.hitbox.x = CANVAS_WIDTH - this.hitbox.width;
        }
        else if(predictedHitboxPoint.x < 0) { 
            this.hitbox.x = 1;
        }
        else{
            this.x += Witch.SPEED * xModifier;
        }

        if(predictedHitboxPoint.y < 0) {
            this.hitbox.y = 1;
        }
        else if((predictedHitboxPoint.y + this.hitbox.height) > CANVAS_HEIGHT){ 
            this.hitbox.y = CANVAS_HEIGHT - this.hitbox.height;
        }
        else {
            this.y += Witch.SPEED * yModifier;
        }
        
    }

    /**
     * Launces a bullet from it's own place depending on type of bullet input and sends it to the entities in it's playstate.    
     * @param {*} type 
     * 
     */
    shoot(type){    
        let bullet = BulletFactory.createInstance(type, this.x + (this.boundingWidth /2), this.y, Direction.Up); // Make a bullet using the object factory based on the type input.
        
        bullet.x -= (bullet.boundingWidth / 2)
        bullet.y -= bullet.boundingHeight
        stateManager.getCurrentState().addEntity(bullet); // Adds the bullet to the current playstate.
    }


    oobAction() {
        
    }

    collisionAction(collider){
        sounds.play(SoundName.PlayerHit);
        this.canRemove = true;
    }
    // Private functions meant to hold functions that should be abstracted.

    /**
     * Sets up the witches StateManager with it's states. Should only be called in the
     * constructor.
     * @private 
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
