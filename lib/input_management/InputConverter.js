import Command from "./Command.js";

/**
 * Class that converts JSON data into a list of Commands that are then assigned
 * to an Enum depending on what order they are input for ease of access.
 * 
 * It then can the create event listeners for keyboard ups and downs and convert
 * those inputs to check if a any of the command keys have been pressed or
 * unpressed
 * 
 * You can the call an enum to check if a command has been pushed down or up in
 * your code.
 * 
 * Note that commands may hold several keys each.
 */
export default class InputConverter {
    constructor() {
        this.commandData = [];
        this.defualtCommandData = [];
        this.isSetup = false;
        this.currentKey={};
        this.isReset=false;
    }

    /**
     * Reads commands from a specified json file  TEMPORARY SHOULD BE DONE IN LOADING SCREEN
     * @param {string} jsonPath Local path to the config json file that stores the commands
     */
    setup(jsonPath) {

        fetch(jsonPath)
            .then((response) => response.json())
            .then((response) => {

                const { commands: commandDefinitions,defualtcommands:defaultCommandDefinitions} = response;
                //user modifies comands
                commandDefinitions.forEach(commandDefinition => {
                    this.commandData.push(new Command(commandDefinition.keys));
                    this.defualtCommandData.push(new Command(commandDefinition.keys));
                });
                //localStorage.clear();
                this.customCommandData = JSON.parse(localStorage.getItem('customCommands')) ?? [];
                this.commandData = JSON.parse(localStorage.getItem('customCommands')) ?? [];
                //this.commandData = JSON.parse(localStorage.getItem('customCommands')) ?? [];
                if(this.commandData.length === 0){
                    for(let i = 0; i<this.defualtCommandData.length;i++){
                        this.commandData.push(new Command(this.defualtCommandData[i].inputs));
                    }
                    localStorage.setItem('customCommands',JSON.stringify(this.commandData));
                }
                else{
                    let tmp=[];
                    for(let i = 0; i < this.defualtCommandData.length; i++){
                        tmp.push(new Command(this.commandData[i].inputs));
                    }
                    this.commandData=tmp;           
                }
                this.setCommands();
            });
    }

    resetCommands(){
        let i=0;
        this.commandData.forEach(command=>{
            this.isReset=true;
            this.alterCommand(command,this.defualtCommandData[i].inputs);
            i++;
        });
        this.isReset=false;
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
            //Key For selection
            ENTER_KEY: this.commandData[10],
        };

        // Signals that the setup is complete.
        this.isSetup = true;
    }

    /**
     * Sets the commands Enum with the values from the commandData list. Should
     * only be ran one time as since the commands are just pointers to static
     * places in the commandData list.
     */
    setCommands() {
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
            //Key For selection
            ENTER_KEY: this.commandData[10],
        };

        // Signals that the setup is complete.
        this.isSetup = true;

    }

    /**
     * Alters the command located at the current commandData index.
     * If the keys are null it clears the command inputs, if not it
     * adds them.
     * @param {Command} command The index the command's data is stored at
     * @param {string[]} keys The singal to clear if not null and the keys to add if null. 
     */
    alterCommand(command, keys) {

        // Throws an error if the command is not in commandData or if it is null.
        if (!command) {
            throw new Error("Command is null and thus could not be altered.");
        }
        else if (!this.commandData.includes(command)) {
            throw new Error("Command is not found in Command Data.");
        }

        if (keys) {
            //Singnals that we want to add keys

            //TODO add input validation and duplicate validation.
            if(this.commandVerification(keys)){
                let tmpStringArray = Array.from(keys[0]);
                
                if(tmpStringArray.length <= 1){
                    keys.splice(0,1,keys[0].toLowerCase());
                    keys.push(keys[0].toUpperCase());
                }
                command.clearInputs();
                command.addInput(keys);
                
                
            }
        }
        else {
            // Signals that we want to clear the keys
            command.clearInputs();
        }
        //may want to check for 2 commands with the same key later
    }
    //will validate that the same key has not been assigned twice
    commandVerification(keys){
        if(this.isReset){
            return true;
        }
        let isValid=true;
        this.commandData.forEach(command => {

            command.inputs.forEach(key => {
                 keys.forEach(element => {
                     if(key == element)
                     {
                         isValid=false;
                         alert("Error can't have a value a already used value");
                         
                     }
                 });
            });
            
        });
        return isValid;
    }

    /**
     * Takes a standard JavaScript eventlistener keyboard input and checks 
     * if any Commands in commandData contains it returning it's index if
     * true. 
     * @param {*} key The JavaScript eventlistener keyboard input to check.
     * @returns null if the key is not in the commandData's Commands and if in
     *          a command then returns that Command's index in commandData. 
     *          Note that if several Commands contain the same key, only the
     *          first Command's index will be returned.
     */
    interpret(key) {
        let index = 0;

        // Saves processing time from rechecking length each time.
        let length = this.commandData.length;
        while (index < length) {
            if (this.commandData[index].isMatch(key)) {
                return index;
            }
            index++;
        }

        return null;
    }

    /**
     * Adds event listeners keyup and keydown for a specified element that
     * intercepts the input to determine if the key pressed is a part of 
     * commandData and if so it sets it's push state to either true or false
     * (depending on if in the keyup or keydown listeners)
     * @param {*} element The element to add event listeners to.
     */
    addKeyboardListener(element) {
        element.addEventListener('keydown', event => {

            let dataIndex = this.interpret(event.key);        

            if(event.Key != "Enter"){
                this.currentKey = event.key;
            }
            else
                this.currentKey=null;


            //Only sets is pushed to true if dataIndex is not null and the commandData is not already Pressed.
            if (dataIndex != null && !this.commandData[dataIndex].isPushed) {
                this.commandData[dataIndex].isPushed = true;
            }
            event.preventDefault();
        });

        element.addEventListener('keyup', event => {

            let dataIndex = this.interpret(event.key);

            this.currentKey = null;
            // We only need to check for null here as keyups cannot be 'held' like keydowns.
            if (dataIndex != null) {
                this.commandData[dataIndex].isPushed = false;

            }
            event.preventDefault();
        });
    }

    /**
     * Removes keydown and keyup event listeners on a specific element.
     * @param {*} element The element to remove event listeners to.
     */
    removeKeyboardListener(element) {
        element.removeEventListener('keydown');
        element.removeEventListener('keyup');
    }
}
