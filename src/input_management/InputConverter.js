/* 
    Maybe we can convert the inputs from the listeners to the different 
    types of keys depending on the state of the game maybe? Well the player
    has states too so I'm not sure how we should do this but I have a vague
    idea. Anyways an enum of keys wiht different values meant to be converted
    depending on the state seems like a wise way to handle inputs dynamically.
    In terms of handling several states overlaped a stack of states might work and 
    if implemented should be managed by the state manager. This way we can loop
    through them defaultly when updating and then loop through them backwards
    when rendering so that the state on top of the stack is displayed on top
    of the rest. We should then of course add a pause bool to each state so that
    we can identify if we want to run each stacked state.

    Back to the key inputs we should filter the keys based on the inputed
    key options (we will add this later).
*/

import { canvas } from "../global.js";
import Command from "./Command.js";

export default class InputConverter{
    constructor(){

        this.commandData = [
            new Command(["ArrowUp",], true), // UP_KEY 0
            new Command(["ArrowRight",], true), // RIGHT_KEY 1
            new Command(["ArrowDown",], true), // DOWN_KEY 2
            new Command(["ArrowLeft",], true), // LEFT_KEY 3
            new Command(["z","Z",], true), // PRIMARY_KEY 4
            new Command(["x","X",], true), // SECONDARY_KEY 5 
            new Command(["c","C",], true), // TETIARY_KEY 6
            new Command(["Shift","\\",], true), // ALTERNATE_KEY 7
            new Command(["Escape","Backspace",], true), // BACK_KEY 8
            new Command(["/"], false), // CONSOLE_KEY 9
        ];

        this.setCommands()
    }

    setCommands(){
        // The index will increment each set to be more dynamic.
        this.commands = {
    
            // Directions.
            UP_KEY: this.commandData[0], 
            RIGHT_KEY: this.commandData[1], 
            DOWN_KEY: this.commandData[2],
            LEFT_KEY: this.commandData[3], 
            
            // The action buttons.
            PRIMARY_KEY: this.commandData[4], 
            SECONDARY_KEY: this.commandData[5], 
            TETIARY_KEY: this.commandData[6], 
            ALTERNATE_KEY: this.commandData[7], 
        
            BACK_KEY: this.commandData[8], 
        
            //Key to open debug.
            CONSOLE_KEY: this.commandData[9], 
        };
    }

    /**
     * Alters the command located at the current commandData index.
     * If the keys are null it clears the command inputs, if not it
     * adds them.
     * @param {Command} command The index the command's data is stored at
     * @param {string[]} keys The singal to clear if not null and the keys to add if null. 
     */
    alterCommand(command, keys){

        // Throws an error if the command is not in commandData or if it is null.
        if(!command){
            throw new Error("Command is null and thus could not be altered.");
        }
        else if(!this.commandData.includes(command)){
            throw new Error("Command is not found in Command Data.");
        }
                
        if(keys){
            //Singnals that we want to add keys

            //TODO add input validation and duplicate validation.
            command.addInput(keys)
        }
        else{
            // Signals that we want to clear the keys
            command.clearInputs();
        }
        //may want to check for 2 commands with the same key later
        //this.commandData[index].keys
    }

    interpret(key){
        let index = 0;

        // Saves processing time from rechecking length each time.
        let length = this.commandData.length;
        while(index < length){
            if(this.commandData[index].isMatch(key)) {
                return index;
            }
            index++;
        }

        return null;
    }

    addKeyboardListener(element){
        element.addEventListener('keydown', event => {

            let dataIndex = this.interpret(event.key);
            if(dataIndex != null ){
                console.log("keydown: " + event.key);
                this.commandData[dataIndex].isPushed = true;
            }
            event.preventDefault();
        });
        
        
        element.addEventListener('keyup', event => {

            let dataIndex = this.interpret(event.key);
            if(dataIndex != null ){
                console.log("keyup: " + event.key);
                this.commandData[dataIndex].isPushed = false;
                
            }
            event.preventDefault();
        });
    }

    removeKeyboardListener(element){
        element.removeEventListener('keydown');
        element.removeEventListener('keyup');
    }
}
