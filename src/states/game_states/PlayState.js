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
        
        //set witch type so we cann determine what bullets/ bombs to use depending on player choice.
        //this.witch = new Witch();

        this.entities = [];

        this.entities.push(new Witch());
    }

    exit(){

    }

    update(trueTime) {

        this.entities.forEach(entity => {

            if(entity){

                if(entity.canRemove) {
                    entity = null;
                }
                else {
                    entity.update(trueTime);
                }

            }
        });

        //this.witch.update(trueTime);
    }

    render() {


        // Renders each entity
        this.entities.forEach(entity => {
            if(entity){
                entity.render();
            }
        });

        //this.witch.render();
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