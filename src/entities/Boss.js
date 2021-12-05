import {CANVAS_WIDTH, CANVAS_HEIGHT, loadedImages, stateManager} from "../global.js";
import StateManager from "../states/StateManager.js";
import Entity from "./Entity.js";
import Animation from "../../lib/time_management/Animation.js";
import { BulletFactory } from "../factories/BulletFactory.js";
import { Direction, BulletType, HitboxId} from "../enums.js"; 
import Witch from "./Witch.js";
import DyingState from "../states/boss_states/DyingState.js"
import FirstPhaseState from "../states/boss_states/FirstPhaseState.js"
import SecondPhaseState from "../states/boss_states/SecondPhaseState.js"
import ThirdPhaseState from "../states/boss_states/ThirdPhaseState.js"

/**
 * The player entity that uses states and user inputs to determine how they
 * interact with the play state. They can move, focus, dodge, shoot, bomb
 * and die. They offer a wide variety of interactions with other entities.
 */
export default class Boss extends Entity{
    
    static FOCUS_SPEED_MODIFIER = 5;

    static SPRITESHEET_NAMES = ["witch-move", "witch-shoot"];
    static INTERVAL = .4;
    static SPEED = 475;

    static SPRITE_SIZES = {
        "witch-shoot": {width: 210, height: 350},
        "witch-move": {width: 210, height: 350},
        "witch-focus": {width: 210, height: 350}
    }

    // The hitbox size
    static HITBOX_WIDTH = 360;
    static HITBOX_HEIGHT = 360;

    // The max HP the boss has.
    static MAX_HP = 100;

    // The direction of the that is currently moved in
    static DEFAULT_DIRECTION = Direction.None; 

    /**
     * Generates a boss object in relation the the object that defines it, the Witch
     * @param {Witch} witch 
     */
    constructor(witch){ 
        
        super({
            // The spawn-point
            x: (CANVAS_WIDTH * .5),
            y: (CANVAS_HEIGHT * .02),

            // Bounding Box
            boundingWidth: Boss.SPRITE_SIZES["witch-move"].width,
            boundingHeight: Boss.SPRITE_SIZES["witch-move"].height,  

            // Hitbox
            hitboxId: HitboxId.BossHit
            
        });

        this.direction = Boss.DEFAULT_DIRECTION;

        this.hp = Boss.MAX_HP;

        // Gets and then sets to sprites all the sprites relating to witch
        this.setSprites();

        // Makes the state machine and loads the first state.
        this.#setStates(witch);

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
     * Move the witch based on the Boss's direction 
     * @param {Number} trueTime Determines the speed modifier
     */
    move(trueTime){

        // Based on the direction move accordingly
        switch(this.direction){
            case Direction.Up:
                this.y -= Boss.SPEED * trueTime;
                break;
            case Direction.Down:
                this.y += Boss.SPEED * trueTime;
                break;
            case Direction.Right:
                this.x += Boss.SPEED * trueTime;
                break;
            case Direction.Left:
                this.x -= Boss.SPEED * trueTime;
                break;
            case Direction.None:
                return;
        }
    }

    /**
     * Launches a bullet from it's own place depending on type of bullet input and sends it to the entities in it's playstate.    
     * @param {BulletType} type The type of bullet to shoot
     * @param {Direction} direction The direction to shoot it in.
     * @param {Number | undefined} spawnX 
     * @param {Number | undefined} spawnY 
     */
    shoot(type, direction = Direction.Down, spawnX = this.x + (this.boundingWidth / 2), spawnY = this.y + (this.boundingHeight / 2)) {
        // TODO refactor so it can shoot out of a specied possision as well as the default so TYPE A as well as B works in FirstPhaseState.
        let bullet = BulletFactory.createInstance(type, spawnX, spawnY, direction); // Make a bullet using the object factory based on the type input.
        stateManager.getCurrentState().addEntity(bullet) // Adds the bullet to the current playstate.
    }

    oobAction(){
        //Since the Boss's 'ai' never would need to go oob we don't need to do anything (saves processing power).
    }

    collisionAction(collider){
        this.hp -= 1;
        console.log(this.hp);
    }
    
    // Private functions meant to hold functions that should be abstracted.

    /**
     * Sets up the boss's StateManager with it's states. Should only be called in the
     * constructor.
     * @param{witch:Witch} The witch to follow.
     * @private 
     */
    #setStates(witch){
        // Creates a new state manager to manage the player's states.
        this.stateManager = new StateManager();

        // Should make the labels an enum with a value of the label.
        this.stateManager.saveStateType("DyingState", new DyingState());
        this.stateManager.saveStateType("FirstPhaseState", new FirstPhaseState());
        this.stateManager.saveStateType("SecondPhaseState", new SecondPhaseState());
        this.stateManager.saveStateType("ThirdPhaseState", new ThirdPhaseState());

        // Sets default state to move state.
        this.stateManager.loadState("FirstPhaseState",{boss: this, witch: witch});
    }
}
