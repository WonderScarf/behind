import State from "../State.js";

/**
 * State that is ran when getting data from JSON files. Displays a symbol of loading to screen.
 */
export default class BootState extends State {    

    constructor(){
        super();

        /** If true: finished loading, if false: still loading  */
        isDone = false;   
    };

    /**
     * 
     * @param {{jsonFiles: String[]}} paramaters 
     */
    enter(paramaters){
        
        // Throws an error when no paramaters were input.
        if(!paramaters){
            throw new Error("No paramaters were entered into a loading state.")
        }
        
        if(!paramaters.jsonFiles){
            throw new Error("The paramaters do not contain jsonFiles.")
        }

        paramaters.jsonFiles.forEach(jsonFile => {
            
        });

    }
    

    exit(){

    }

    update(trueTime) {
        // Display a bar on screen based on how far the load is.
    }

    render() {
        // Render the loading screen on the canvas.
    }
}