import State from "../State.js";
import Witch from "../../entities/Witch.js";
//import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../global.js";

export default class LoadingState extends State {    

    // More shall be added.

    constructor(){
        super();
    };



    enter(paramaters){
        this.witchPath = paramaters.witchPath;
    }

    exit(){

    }

    update(trueTime) {
        
        // Checks if it's done loading if done then we change state to the assigned next state.
        if(this.doneLoading){

        }

        this.witch.update(trueTime);
    }

    render() {
        // Should display a loading screen or icon with a cute little animation.
        if(!this.witch){
            throw new Error("Cannot render a null Witch.")
        }

        this.witch.render();
    }
}