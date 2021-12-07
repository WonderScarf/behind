import Vector from "../../../../lib/Vector.js";
import { Colour } from "../../../enums.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, inputConverter, stateManager } from "../../../global.js";
import MainMenu from "./MainMenuState.js";
import MenuState from "./MenuState.js";

/**
 * Screen that displays on game overaa
 */
export default class GameOverState extends MenuState {
        static REPLAY_BUTTON_X_OFF_SET = 415
        ;
        constructor(){
                super();
                this.cursor = new Vector((CANVAS_WIDTH / 2)+170, (CANVAS_HEIGHT/2)+6);
                this.retryButton = {isSelected:false, position: new Vector(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)}; //later idea for modifying or making the menu appear more vibrant
                this.replayButton =  {isSelected: false, position: new Vector(CANVAS_WIDTH / 2,  (CANVAS_HEIGHT / 2) + 100)};
        }
        /**
         * Function that is run by the state manager when loaded.
         * @param {{}} paramaters The properties that should be loaded by the state.
         */
         enter(paramaters){
                console.log("Game Over State")
        }
    
        /**
         * Function that is run on removal of state.
         */
        exit(){
        }
    
        /**
         * Code that is ran when we leave our current state, to prepare for re-entering a state.
         */
        return(){
    
        }
        /**
         * Updates the current state
         * @param {Number} trueTime The ajusted time.
         */
         update(trueTime){
                if(inputConverter.commands.UP_KEY.isPushed){
                        console.log("Up key pressed");
                        this.cursor.x = this.retryButton.position.x + GameOverState.REPLAY_BUTTON_X_OFF_SET-230;
                        this.cursor.y = this.retryButton.position.y + MainMenu.CURSOR_YOFF_SET;
                        this.render();
                }
                else if(inputConverter.commands.DOWN_KEY.isPushed)
                {
                        console.log("Down Key pressed");
                        this.cursor.y = this.replayButton.position.y + MainMenu.CURSOR_YOFF_SET;
                        this.cursor.x = this.replayButton.position.x + GameOverState.REPLAY_BUTTON_X_OFF_SET;
                        this.render();
                } 
                else if(inputConverter.commands.ENTER_KEY.isPushed && this.cursor.y - MainMenu.CURSOR_YOFF_SET == this.retryButton.position.y){
                        console.log("Enter has been pressed");
                        stateManager.loadState("PlayState", {});

                }
                else if(inputConverter.commands.ENTER_KEY.isPushed && this.cursor.y - MainMenu.CURSOR_YOFF_SET == this.replayButton.position.y){
                        console.log("Options been selected");
                        stateManager.loadState("MainMenuState", {});
                }
        }
    
        /**
         * Renders the current state to the canvas.
         */
        render() { 
                context.save();
                this.renderTitle();
                this.renderOptions();
                this.renderCursor();
        }
        renderCursor(){
                context.font = '80px Arial';
                context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillStyle = Colour.Crimson//Colour.DodgerBlue;
		context.fillText('<', this.cursor.x,this.cursor.y);
        }
        renderTitle(){
                context.font = '100px Arial';
                context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillStyle = Colour.Crimson//Colour.DodgerBlue;
		context.fillText('GAME OVER', CANVAS_WIDTH / 2, 100);
        }
        renderOptions() {
		context.font = '80px Arial';
		context.textAlign = 'middle';
		context.fillStyle = Colour.Crimson//Colour.DodgerBlue;
		context.fillText('Retry', this.retryButton.position.x , this.retryButton.position.y);
                context.fillStyle = Colour.Crimson//Colour.DodgerBlue;
		context.fillText('Return to Main Menu', this.replayButton.position.x, this.replayButton.position.y);
	}
}