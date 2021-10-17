import { canvas, context, stateManager } from "./global.js";
//import StateManager from "./states/StateManager.js";

export default class Behind {

    constructor() {
        // Time properties
        this.previousTime = 0;
        this.trueTime = 0;

        stateManager.loadState("LoadingState", {exitState: "PlayState", exitParamaters: {}});
        
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
            stateManager.renderState();
        }
        else {
            throw new Error("Either canvas or context is null.")
        }
    }
}