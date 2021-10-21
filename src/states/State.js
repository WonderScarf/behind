
/**
 * A state that the state manager runs.
 */
export default class State {
    constructor() {
    }

    /**
     * Function that is run by the state manager when loaded.
     * @param {{}} paramaters The properties that should be loaded by the state.
     */
    enter(paramaters){}

    /**
     * Function that is run on removal of state.
     */
    exit(){}

    /**
     * Updates the current state
     * @param {Number} trueTime The ajusted time.
     */
    update(trueTime){};

    /**
     * Renders the current state to the canvas.
     */
    render() { };

}