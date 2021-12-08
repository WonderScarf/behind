import Vector from "../../../../lib/Vector.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../global.js";
import State from "../../State.js";

/**
 * The game's manin menu.
 */
export default class MenuState extends State {
    
    constructor()
    {
        super();
        this.cursor = new Vector((CANVAS_WIDTH / 2)+170, (CANVAS_HEIGHT/2)+6);
        this.menuoptions = {
            play:'Play',
            highScores:'High Scores',
            retry:'Retry',
            returnToMainMenu:'Return To Main Menu',
            yes:'yes',
            no:'no',
            options:'Options',
        }
        this.highlighted = this.menuoptions.play;
    }
    /**
     * Function that is run by the state manager when loaded.
     * @param {{}} paramaters The properties that should be loaded by the state.
     */
     enter(paramaters){
        console.log("Entering MenuState...");
        //Implement this into the Menu state
        if(this.cooldown < ShootState.MAX_COOLDOWN){
            this.cooldown++; //TODO refine by incremention based on truetime.
        }
        else {
            this.cooldown = 0; // We reset the current cooldown / initialize if cooldown is null.
        }
    }

    /**
     * Function that is run on removal of state.
     */
    exit(){

    }

    /**
     * Code that is ran when we leave our current state, to prepare for re-entering a state.
     */
    return(){

    }

    /**
     * Updates the current state
     * @param {Number} trueTime The ajusted time.
     */
    update(trueTime){ 
        
    };

    /**
     * Renders the current state to the canvas.
     */
    render() { 

    };

}