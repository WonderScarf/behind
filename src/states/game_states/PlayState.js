import State from "../State.js";
import Witch from "../../entities/Witch.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../global.js";
import Entity from "../../entities/Entity.js";

export default class PlayState extends State {    

    // More shall be added.

    constructor(){
        super();
    };

    enter(paramaters){
        // Paramaters will be added later for play.

        this.entities = []; // THe entities of the game.

        this.addEntity(new Witch()); // Spawn in the Witch, representing the player.
        
        //this.addEntity(new Boss()); // TODO Spawn in the Boss for the player to fight.
    }

    exit(){

    }

    update(trueTime) {

        this.entities.forEach(entity => {
            /* If the entity is not null we check if we can remove it, if we can remove it
            then we set it to null and if not we update the entity. */
            if(entity){

                if(entity.canRemove) {
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
            if(entity){
                entity.render();
            }
        });

    }

    addEntity(entity){
        if(!entity){
            throw Error("Input null or undefined entity.");
        }

        this.entities.push(entity);
    }

    getEntities(){
        return this.entities;
    }
}