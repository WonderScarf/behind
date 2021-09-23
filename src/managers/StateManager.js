import TouhouState from '../states/game_states/TouhouState.js';
import State from '../states/State.js'
import deepClone from "../../web_modules/lodash.clonedeep.js";

export default class StateManager {
    
    constructor() {
        this.states = new Map();
        
    };

    saveState(label, state) {
        this.states.set(label, state);
    }

    loadFromStates(label) {

        let state = this.states.get(label);

        if (state) {
            this.currentState = deepClone(state);
        }
        else {
            console.log("Attempted to find a state with a label that does not exist in states.");
        }

    }

    //ADD A DELETE STATE

    updateState(trueTime) {
        this.currentState.update(trueTime);
    }

    renderState() {
        if(this.currentState){
            this.currentState.render();
        }
        else{
            console.log("renderCurrent for a State manager did not work as currentState is null")
        }
    }
}
