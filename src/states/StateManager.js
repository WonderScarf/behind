import State from './State.js'

/**
 * A state machine for managing states. Uses pushdown automata and heiarchical states
 * to increase efficiency and adaptablility. 
 */
export default class StateManager {

    constructor() {

        // A map representing the map types 
        this.stateTypes = new Map();

        // It's a stack to represent state's history. The last one is the most recent and will be updated/rendered first.
        this.currentStateStack = [];

    };

    /**
     * Saves the state type to a map which will can be loaded from to add it
     * to the currentStateStack.
     * @param {String} label The label that the state will be called from.
     * @param {State} state The State to attach to the label.
     */
    saveStateType(label, state) {

        // Throws an error when the state is null or undefined.
        if (!state) {
            throw new Error("Cannot save an empty state to saved states.")
        }


        // Sets the stateTypes map with the input data.
        this.stateTypes.set(label, state);
    }


    /**
     * Finds the state via label and adds it to current States' stack.
     * @param {String} label The name of the State in the saved State types.
     * @param {{}} paramaters The paramaters to add the state with.
     */
    loadState(label, paramaters) {

        // Get a state matching the label from the state stateTypes.
        let state = this.stateTypes.get(label);

        // Throws if no state matches.
        if (!state) {
            throw Error("Attempted to find a state with a label that does not exist in states.");
        }

        // Adds the state with the paramaters.
        this.addState(state, paramaters);
    }

    /**
     * Adds the state to the current stack of states.
     * @param {State} state The state to add.
     * @param {{}} paramaters The paramaters to enter the state with.
     * @param {Boolean} inFront If true the state is added to the front or back. Default is back. 
     */
    addState(state, paramaters = {}, inFront = false) {
        if (!state) {
            throw new Error("Cannot add an empty state.")
        }

        if (inFront) {
            // Adds the item to the front of the stack.
            this.currentStateStack.unshift(state)
        }
        else {
            // Adds the item to the end of the stack.
            this.currentStateStack.push(state)
        }

        state.enter(paramaters);

    }

    /**
     * Removes the state from the currentStateStack.
     * @param {Boolean} inFront If true the state is removed to the front or back. Default is false. 
     */
    removeState(inFront = false) {
        if (!this.currentStateStack ) {
            throw new Error("Cannot remove if the stateStack is empty.")
        }
        
        let state; // The state that has been will be pop out of the stack of states.
        
        if (inFront) {
            // Removes the item to the front of the stack.
            state = this.currentStateStack.shift();
        }
        else {
            // Removes the item to the end of the stack.
            state = this.currentStateStack.pop();
        }

        state.exit(); // Exits the removed state

        /* Signals the now current state to run it's return function so 
        it reset values back to where they need to be. */
        if(this.currentStateStack.length != 0){
            this.getCurrentState().return();
        }
    }

    /**
     * Gets the current state (The state on the top of the state stack).
     * @returns {State} The current State.
     */
    getCurrentState() {
        if (!this.currentStateStack) {
            throw new Error("Cannot get current state as currentStateStack is empty.")
        }

        return this.currentStateStack[this.currentStateStack.length - 1];
    }


    /**
     * If the stateLabel matches the label of the current state return true.
     * If that is not the case return false. This can be used to check if we
     * are in a specific state via it's label or name alone.
     * @param {String} stateLabel The name of the state to look for.
     * @returns {Boolean} Is true if matching current state, false if not.
     */
    isCurrentlyIn(stateLabel){
        return this.getCurrentState().constructor.name == stateLabel;
    }

    /**
     * Updates the manager's current state (state on top of the stack).
     * @param {Number} trueTime The ajusted time.
     */
    updateState(trueTime) {

        // Throw an error if the stack is empty.
        if (!this.currentStateStack) {
            throw new Error("There are no current states in currentStateStack to update.")
        }

        // Updates the last element of currentStateStack.
        this.getCurrentState().update(trueTime);
    }

    /**
     * Renders the current state to the canvas.
     */
    renderState() {

        // Throw an error if the stack is empty.
        if (!this.currentStateStack) {
            throw new Error("There are no current states to render.")
        }

        // Renders the last element of currentStateStack.
        this.currentStateStack[this.currentStateStack.length - 1].render();

    }
}
