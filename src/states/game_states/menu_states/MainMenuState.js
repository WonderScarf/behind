import Vector from "../../../../lib/Vector.js";
import { Colour } from "../../../enums.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, inputConverter, stateManager } from "../../../global.js";
import MenuState from "./MenuState.js";

export default class MainMenu extends MenuState {

        static CURSOR_XOFF_SET=170;
        static CURSOR_YOFF_SET=6;


        constructor(){
                super();
                this.playButton = {isSelected:false, position: new Vector(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)}; //later idea for modifying or making the menu appear more vibrant
                this.optionButton =  {isSelected: false, position: new Vector(CANVAS_WIDTH / 2,  (CANVAS_HEIGHT / 2) + 100)};
        }
        /**
         * Function that is run by the state manager when loaded.
         * @param {{}} paramaters The properties that should be loaded by the state.
         */
        enter(paramaters){
                inputConverter.commands.ENTER_KEY.isPushed = false;
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
                        this.cursor.y = this.playButton.position.y + MainMenu.CURSOR_YOFF_SET;
                        this.render();
                }
                else if(inputConverter.commands.DOWN_KEY.isPushed)
                {
                        console.log("Down Key pressed");
                        this.cursor.y = this.optionButton.position.y + MainMenu.CURSOR_YOFF_SET;
                        this.render();
                } 
                else if(inputConverter.commands.ENTER_KEY.isPushed && this.cursor.y - MainMenu.CURSOR_YOFF_SET == this.playButton.position.y){
                        console.log("Enter has been pressed");
                       // stateManager.loadState("PlayState", {});

                }
                else if(inputConverter.commands.ENTER_KEY.isPushed && this.cursor.y - MainMenu.CURSOR_YOFF_SET == this.optionButton.position.y){
                        console.log("Options been selected");
                        stateManager.loadState("OptionsState", {});
                }
        }
        boundryCheck(){

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
		context.fillText('Behind', CANVAS_WIDTH / 2, 100);
        }
        renderOptions() {
		context.font = '80px Arial';
                context.textAlign = 'middle';
		context.fillStyle = Colour.Crimson//Colour.DodgerBlue;
		context.fillText('Play', this.playButton.position.x , this.playButton.position.y);
                context.fillStyle = Colour.Crimson//Colour.DodgerBlue;
		context.fillText('Options', this.optionButton.position.x, this.optionButton.position.y);
	}
}