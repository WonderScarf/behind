import MenuState from "./MenuState.js";

export default class MainMenu extends MenuState {
        /**
         * Function that is run by the state manager when loaded.
         * @param {{}} paramaters The properties that should be loaded by the state.
         */
         enter(paramaters){
         
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