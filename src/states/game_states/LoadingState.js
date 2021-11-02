import State from "../State.js";
import { context, inputConverter, stateManager, loadedImages } from "../../global.js"
import CanvasImage from "../../../lib/sprite_management/CanvasImage.js";
/**
 * State that is ran when getting data from JSON files. Displays a symbol of loading to screen.
 */
export default class LoadingState extends State {

    constructor() {
        super();
        this.iskeyboardEventsSetup = false;
        this.isDataLoaded = false;
    };

    /**
     * @param {{exitState: State, exitParamaters: Object }} paramaters
     */
    enter(paramaters) {

        // Throws an error when no paramaters were input.
        if (!paramaters) {
            throw new Error("No paramaters were entered into a loading state.")
        }

        // Checks to see if the loadstate has an exit state and it's paramaters,  if not throws an error.
        else if (!paramaters.exitState || !paramaters.exitParamaters) {
            throw new Error("No exit state and it's paramaters have been entered with loading state.")
        }

        this.exitState = paramaters.exitState;
        this.exitParamaters = paramaters.exitParamaters;

        if (!inputConverter.isSetup) {
            // TODO make paths varriable so we needn't hard code it.
            inputConverter.setup("../../../data/options_config.json");
        }

        this.load().then(() => this.isDataLoaded = true);
    }

    /**
     * Loads files such as images and sounds in the data_config.json file.
     */
    async load(){
        const {
            images: jsonImages,
            // @ts-ignore
        } = await fetch('../../../data/data_config.json').then((response) => response.json());

        // Loads images and then when done set that the images loaded.
        this.loadImages(jsonImages);
    }

    /**
     * Loads images, adding them as CanvasImages to the loadedImages global Map.
     * @param {*} jsonImages The data of the images to convert into CanvasImages.
     */
    async loadImages(jsonImages) {
        
        // Loops for each turning each into acanvas image (sprite sheet).
        await jsonImages.forEach((jsonImage) => {
            
			loadedImages.set(jsonImage.name, new CanvasImage(
				jsonImage.path,
                context,
				jsonImage.width,
				jsonImage.height,
                jsonImage.spriteWidth,
                jsonImage.spriteHeight
			));
            console.log(loadedImages);
		});
    }

    exit() {
        //Loads the exit state and it's paramaters when leaving.
        stateManager.loadState(this.exitState, this.exitParamaters)
    }

    update(trueTime) {

        // If the input converter finished setting itself up we add the keyboard listener.
        if (!this.iskeyboardEventsSetup && inputConverter.isSetup) {
            inputConverter.addKeyboardListener(document);
            this.iskeyboardEventsSetup = true;
        }

        // Check if everything is done loading then remove itself and make it so we run the exit state in the exit function

        if (this.iskeyboardEventsSetup && this.isDataLoaded) {
            stateManager.removeState();
        }
    }

    render() {
        // Render the loading screen on the canvas.
        context?.fillRect(10, 10, 100, 100);
    }
}