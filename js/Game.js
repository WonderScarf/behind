import { canvas, context } from "./globals.js"; //import the game's canvas


/**
 * @summary Object that holds the primary game loop. We use this as our "main" but
 * for the game rather then general website details and should always keep it at the
 * back of our mind when coding the game.
 * 
 * 
 * After starting a game it is constantly changes between the states of...
 * 
 *  Input: player inputs keys and clicks.
 * 
 *  Update: we process the inputs and change data accordingly.
 * 
 *  Render: we display changes on the canvas so that it matches the altered data.
 */
export default class Game {


    constructor() {
        //Sets the previous time to 0 so the first loop happens without delay.
        this.lastTime = 0; 
    }

    /**
     * Game's core. It loops about through the process of Input then Update then
     * Render. Will always be running if the game hasn't been turned off or crashed. 
     * Will run 60 times per second if things go well but can be expect to change
     * based on the user's computer's speed and monitor refresh rate. This is why
     * we make something called "ajustedTime" which has an equation that takes account
     * of this discrepancy and uses the last loops time and the current loops time
     * to find out how long it's been and uses it to keep the speed of everything
     * constant no matter your specs!
     * 
     * @param {Number} currentTime How much time has elapsed since the page loaded.
    */
    loop(currentTime){
		// Calculates deltaTime and converts it to seconds instead of milliseconds.
		const deltaTime = (currentTime - this.lastTime) / 1000;
        
		this.update(deltaTime); 
		
        this.lastTime = currentTime; // Sets the last time to the current time.
		requestAnimationFrame((time) => this.loop(time));
	}

	/**
	 * Processes the player's inputs and changes data accordingly.
	 * @param {Number} deltaTime How much time has elapsed since last time update was called.
	*/
	update(deltaTime) {
        
        // After we finish updating we render using the game's render function.
		this.render();
	}

	/**
     * Display changes on the canvas so that it matches the altered data.
	*/
	render() {
        // If the canvas and context exists we proceed with the rendering.
        if(canvas && context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
        else {
            alert("Game could not identify either canvas or context.")
        }
	}


}
