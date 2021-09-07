export default class State {

    /**
     * Builds a default state
     * @param {string} label 
     */
    constructor(label) {
        
        if(label) {
           this.label = label
        } 
        else {
            throw "State was given a empty, null or invalid label."
        }
    }

    enter(parameters) { }

	exit(parameters) { }

	update(dt) { }

	render() { }



    
}