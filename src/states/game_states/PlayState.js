import State from "../State.js";
import Witch from "../../entities/Witch.js";
import Entity from "../../entities/Entity.js";
import Boss from "../../entities/Boss.js";
import { isObb } from "../../../lib/canvas/canvasUtils.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, stateManager, timer } from "../../global.js";
import Hitbox from "../../entities/Hitbox.js";

/**
 * The state of the game dictating the the actual video game is happening.
 */
export default class PlayState extends State {

    constructor() {
        super();
        this.moveState="";
        this.timer=0;
        this.bestTime=0;
        this.worstTime=60;
    };


    // Standard state functions...

    /**
     * Function that runs when entering the playstate
     * @param {null | undefined | {}} paramaters The paramates for the PlayState (no paramaters are needed for PlayState).
     */
    enter(paramaters) {
        // Paramaters will be added later for play.
        console.log("Entering play state.");
        this.entities = []; // The entities of the game that will be updated/rendered.

        this.witch = new Witch();
        this.boss = new Boss(this.witch);
        this.bestTime = localStorage.getItem('timeToBeat');

        this.addEntity(this.witch); // Spawn in the Witch, representing the player.

        this.addEntity(this.boss); // Spawn in the Boss for the player to fight.
        this.startTimer();
    }

    exit() {
        console.log("Leaving play state.");
        timer.clear();
        this.entities = null;
        if(this.timer < this.bestTime&&(!this.boss || this.boss.canRemove)){
            localStorage.setItem('timeToBeat',this.timer);    
        }
        else if(this.timer < this.worstTime&&(!this.boss || this.boss.canRemove)){
            localStorage.setItem('timeToBeat',this.timer);    
        }
        localStorage.setItem('currentTime',this.timer);
        this.timer = 0;
        
    }

    update(trueTime) {
        timer.update(trueTime);

        this.entities.forEach(entity => {
            /* If the entity is not null we check if we can remove it, if we can remove it
            then we set it to null and if not we update the entity. */
            if (entity) {

                // We only check collision with witch and boss as they are the only 2 entities that are not bullets.
                if(entity != this.witch && Hitbox.isCollide(entity.hitbox, this.witch.hitbox)) {
                    this.witch.collisionAction(entity);
                    entity.collisionAction(this.witch);
                }

                if(entity != this.boss && Hitbox.isCollide(entity.hitbox, this.boss.hitbox)) {
                    this.boss.collisionAction(entity);
                    entity.collisionAction(this.boss);
                }

                // Checks if the entity is OOB and runs it's OOB action.
                if (isObb({
                    canvasWidth: CANVAS_WIDTH,
                    canvasHeight: CANVAS_HEIGHT,
                    itemX: entity.hitbox.x,
                    itemY: entity.hitbox.y,
                    itemWidth: entity.hitbox.width,
                    itemHeight: entity.hitbox.height
                })) {
                    entity.oobAction(); // run the entity's OOB action
                }

                // Removes or updates the entity depending on it's designated to removed.
                if (entity.canRemove && this.entities) {
                    this.entities = this.entities.filter(function(current) { return current != entity; });
                    entity = null; 
                }
                else {
                    entity.update(trueTime);
                }

            }
        });

            // Checks if the witch is set to be removed or is removed and if so enter the gameover state.
            if(!this.witch || this.witch.canRemove){
                this.moveState="GameOverState";
                console.log(stateManager.currentStateStack);
                stateManager.removeState();
                stateManager.loadState("GameOverState", {});
                return;
                
                //stateManager.loadState(, {});
            }

            // Checks if the boss is set to be removed or is removed and if so enter the win state.
            if(!this.boss || this.boss.canRemove){
                this.moveState="WinState";
                stateManager.removeState();
                stateManager.loadState("WinState", {});
                return;
                //stateManager.loadState("WinState", {});
            }
    }

    render() {

        // Renders each entity
        this.entities.forEach(entity => {
            // Only render if the entity is not null.
            if (entity) {
                entity.render();
            }
        });
        this.renderScore();

    }
    renderScore(){
		context.fillStyle = 'white';
		context.font = '25px MoonLightMagic';
        context.fillText(`Timer:`, 70, 25);
        context.textAlign = 'right';
        context.fillText(`${this.timer}`, 90,  27);
        context.fillText(`Best Time:`, 115, 50);
        context.textAlign = 'right';
        context.fillText(`${this.bestTime}`, 145,  50);



    }
    
	startTimer() {
		// Decrement the timer every second.
		timer.addTask(() => {
			this.timer++;

			if (this.timer <= 5) {
				//sounds.play(SoundName.Clock);
			}
		}, 1);
	}


    // Unique functions...

    /**
     * Adds an entity to the top of the entity list.
     * @param {Entity} entity A non-null entity that will be added to the PlayState's list of currently managed entities.
     */
    addEntity(entity) {
        if (!entity) {
            throw Error("Input null or undefined entity.");
        }

        this.entities.push(entity);
    }

    /**
     * Gets the entity list stored within the PlayState.
     * @returns a list of entities that are being updated and rendered in the playstate.
     */
    getEntities() {
        return this.entities;
    }
}