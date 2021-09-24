import State from "../State.js";
import { inputConverter } from "../../global.js";

/**
 * The superstate or Base state of the witch (it will always be in the stack at the back). 
 */
  export default class MoveState extends State {    

    // More shall be added.

    constructor(){
        super();
    };


    enter(paramaters){
        if(!paramaters.witch){
            throw new Error("No witch was input with the paramaters.")
        }

        this.witch = paramaters.witch;
    }

    update(trueTime) {

        if(!inputConverter.commands){
            throw new Error("Commands have not been initialized and thus cannot be read.");
        }

        let moveWeight = {x: 0, y: 0}

        //Check directions

        if(inputConverter.commands.UP_KEY.isPushed && inputConverter.commands.UP_KEY.isEnabled){
            moveWeight.y--;
        }
        else if(inputConverter.commands.DOWN_KEY.isPushed && inputConverter.commands.DOWN_KEY.isEnabled){
            moveWeight.y++;
        }

        if(inputConverter.commands.RIGHT_KEY.isPushed && inputConverter.commands.RIGHT_KEY.isEnabled){
            moveWeight.x++;
        }
        else if(inputConverter.commands.LEFT_KEY.isPushed && inputConverter.commands.LEFT_KEY.isEnabled){
            moveWeight.x--;
        }

        // If this happens we push focus mode state.
        if(inputConverter.commands.ALTERNATE_KEY.isPushed && inputConverter.commands.ALTERNATE_KEY.isEnabled){
            
        }


        this.witch.move(moveWeight.x, moveWeight.y);
    }

    render() {
        this.witch.render();
    }
}