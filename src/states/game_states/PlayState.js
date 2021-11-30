import State from "../State.js";
import Witch from "../../entities/Witch.js";
import Entity from "../../entities/Entity.js";
import Boss from "../../entities/Boss.js";

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

        this.entities = []; // The entities of the game that will be updated/rendered.

        this.witch = new Witch();
        this.boss = new Boss(this.witch);

        this.addEntity(this.witch); // Spawn in the Witch, representing the player.

        this.addEntity(this.boss); // Spawn in the Boss for the player to fight.
    }

    exit() {
        this.entities = null; // We clear the entities list to help garbage collector a bit.
    }

    update(trueTime) {

        // TODO still need to add collision logic / checks to the play state
        // TODO still need tso add some way to check if the player has died or if the boss has died. 

        this.entities.forEach(entity => {
            /* If the entity is not null we check if we can remove it, if we can remove it
            then we set it to null and if not we update the entity. */
            if (entity) {

                // Removes or updates the entity depending on it's designated to removed.
                if (entity.canRemove) {
                    entity = null;
                }
                else {
                    entity.update(trueTime);
                }

            }
        });
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