import PlayState from './game_states/PlayState.js';
import State from './State.js'
import deepClone from "../../web_modules/lodash.clonedeep.js";

export default class StateManager {
    
    constructor() {
        //this.savedStates = new Map();
        // It's a stack to represent state's history. The last one is the most recent and will be updated/rendered first.
        this.currentStateStack = [];
        
    };

    /*
    saveState(label, state) {
        if(!state){
            throw new Error("Cannot save an empty state to saved states.")
        }

        //Add validation that there are no duplicate keys

        this.savedStates.set(label, state);
    }

    loadState(label) {

        //will need an update
        let state = this.savedStates.get(label);

        if (state) {
            this.currentState = deepClone(state);
        }
        else {
            console.log("Attempted to find a state with a label that does not exist in states.");
        }

    } */

    addState(state, paramaters = undefined ,inFront = false ){
        if(!state){
            throw new Error("Cannot add an empty state.")
        }

        if(inFront) {
            // Adds the item to the front of the stack.
            this.currentStateStack.unshift(state)
        }
        else {
            // Adds the item to the end of the stack.
            this.currentStateStack.push(state)
        }

        state.enter(paramaters);

    }

    removeState(inFront = false){
        if(!this.currentStateStack){
            throw new Error("Cannot remove if the stateStack is empty.")
        }

        let state;

        if(inFront) {
            // Removes the item to the front of the stack.
            state = this.currentStateStack.shift();
        }
        else {
            // Removes the item to the end of the stack.
            state = this.currentStateStack.pop();
        }

        state.exit();

    }

    replaceState(oldState, newState){
        if(!this.currentStateStack){
            throw new Error("Cannot replace if the stateStack is empty.")
        }
        else if(!this.currentStateStack.includes(oldState)){
            throw new Error("Cannot replace a state outside of the stateStack.")
        }

        //NOTICE I feel like this is a bug but idk so ill keep it here...
       /* oldState.exit();
        oldState = newState;
        oldState.enter(); */

    }

    updateState(trueTime) {

        if(!this.currentStateStack){
            throw new Error("There are no current states to update.")
        }

        this.currentStateStack[this.currentStateStack.length - 1].update(trueTime);
    }

    renderStates() {
        if(!this.currentStateStack){
            throw new Error("There are no current states to render.")
        }

        for (let currentIndex = this.currentStateStack.length - 1; currentIndex >= 0; currentIndex--) {
            this.currentStateStack[currentIndex].render();
        }
    }
}
