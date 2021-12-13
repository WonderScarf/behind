export default class Command{
    
    /**
     * A command that acts as a way to store multiple inputs for a
     * single action.
     * @param {string[]} inputs The keys that act as gates to the command.
     */
    constructor(inputs){
        this.inputs = inputs;
        this.isPushed = false;
    }

    /**
     * Returns a bool depending on if it matches one of the 
     * command's inputs.
     * @param {string} key A keyboard key as a string.
     * @returns true if matches one of the inputs, false if not.
     */
    isMatch(key){
        if(this.inputs.includes(key)) {
            return true;
        }
        else{
            return false;
        }
    }

    /**
     * Add inputs to the Command.
     * @param {string[]} keys Keys that should be added to input.
     */
    addInput(keys){

        keys.forEach(key => {
            
            if(this.inputs.includes(key)){
                //throw new Error("Key added that was already contained.");
                this.inputs.push(key);
            }
            else{
                this.inputs.push(key);
            }

        });
    }

    /**
     * Clears the inputs of the Command, can be used to refresh the accepted keys.
     */
    clearInputs(){
        this.inputs.splice(0, this.inputs.length);
    }

}