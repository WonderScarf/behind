
/**
 * A state that the state manager runs.
 */
export default class State {
    constructor() { }

    /**
     * Function that is run by the state manager when loaded.
     * @param {{}} paramaters The properties that should be loaded by the state.
     */
    enter(paramaters){
        throw Error("'Abstract' state cannot be exited. Please implement state to another class and assign the function to it."); 
    }

    /**
     * Function that is run on removal of state.
     */
    exit(){
        throw Error("'Abstract' state cannot be exited. Please implement state to another class and assign the exit function to it."); 
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
        throw Error("'Abstract' state cannot be updated. Please implement state to another class and assign the update function to it."); 
    };

    /**
     * Renders the current state to the canvas.
     */
    render() { 
        throw Error("'Abstract' state cannot be rendered. Please implement state to another class and assign the render function."); 
    };

}