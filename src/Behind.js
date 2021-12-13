import { canvas, context, stateManager } from "./global.js";

/**
 * The game Behind.
 */
export default class Behind {

    constructor() {
        // Time properties
        this.previousTime = 0;
        this.trueTime = 0;

        // Loads the state manager's Loading state leading into PlayState.
        //stateManager.loadState("LoadingState", {exitState: "PlayState", exitParamaters: {}});
        stateManager.loadState("LoadingState", {exitState: "MainMenuState", exitParamaters: {exitState:"PlayState"}});
    }

    /** 
     * The loop representing the running game, iterates on itself. 
     * @param {Number} currentTime The current time.
     */
    gameLoop(currentTime = 0) {
        // Calculates the true time.
        this.trueTime = (currentTime - this.previousTime) / 1000;

        this.update(); // Updates the game
        this.render(); // Renders the game

        this.previousTime = currentTime;

        requestAnimationFrame((time) => this.gameLoop(time)); // Needs to be here.
    }

    update() {
        stateManager.updateState(this.trueTime); // Update the state manager's true time.
    }

    render() {
        //If the canvas and context exist clear the game's canvas and render state.
        if (canvas && context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            stateManager.renderState();
        }
        else {
            throw new Error("Either canvas or context is null.")
        }
    }
}