import State from "../State.js";
import Witch from "../../entities/Witch.js";
import Entity from "../../entities/Entity.js";
import Boss from "../../entities/Boss.js";
import { isObb } from "../../../lib/canvas/canvasUtils.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, stateManager, timer } from "../../global.js";
import Hitbox from "../../entities/Hitbox.js";

/**
 * The state of the game dictating the the actual video game is happening.
 */
export default class PlayState extends State {

    constructor() {
        super();
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

        this.addEntity(this.witch); // Spawn in the Witch, representing the player.

        this.addEntity(this.boss); // Spawn in the Boss for the player to fight.
    }

    exit() {
        console.log("Leaving play state.");
        this.entities = null; // We clear the entities list to help garbage collector a bit.
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
                stateManager.removeState();
                stateManager.loadState("GameOverState", {});
                return;
            }

            // Checks if the boss is set to be removed or is removed and if so enter the win state.
            if(!this.boss || this.boss.canRemove){
                stateManager.removeState();
                stateManager.loadState("WinState", {});
                return;
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