import State from "./State";

export default class StateManager {
    
    
    constructor() {
        this.currentState = null;
        this.saveStates = {};
    }

    /**
     * Adds a save state to the saveStates dictionary.
     * @param {State} state The state to add to the saveStates
    */
    addSaveState(state) {
        
        // If there is no current state, we make the current state the added state.
        if(!this.currentState) {
            this.currentState = state;
        }

		this.saveStates[state.label] = state;

    }

    /**
     * Removes a save state from the saveStates dictionary.
     * @param {String} stateLabel The name the added state will search for
    */
    removeSaveState(stateLabel) {

    }

}
