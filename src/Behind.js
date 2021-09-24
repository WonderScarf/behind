import { canvas, context, stateManager } from "./global.js";
//import StateManager from "./states/StateManager.js";

export default class Behind {

    constructor() {
        // Time properties
        this.previousTime = 0;
        this.trueTime = 0;
        // Connect to input, so we can automate the input.
        // Setup event listeners for keys
        // Make sure to add a way to remove them
        
    }

    gameLoop(currentTime = 0) {
        // Calculate true time
        this.trueTime = (currentTime - this.previousTime) / 1000;

        this.update();
        this.render();

        this.previousTime = currentTime;

        requestAnimationFrame((time) => this.gameLoop(time));
    }

    update() {
        stateManager.updateState(this.trueTime);
    }

    render() {
        if (canvas && context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            stateManager.renderStates();
        }
        else {
            throw new Error("Either canvas or context is null.")
        }
    }
}