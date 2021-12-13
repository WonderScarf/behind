import Vector from "../../../../lib/Vector.js";
import { Colour, SoundName } from "../../../enums.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, inputConverter, sounds, stateManager } from "../../../global.js";
import MainMenu from "./MainMenuState.js";
import MenuState from "./MenuState.js";

/**
 * Screen that displays on game overaa
 */
export default class GameOverState extends MenuState {
        static REPLAY_BUTTON_X_OFF_SET = 415;

        constructor(){
                super();
                this.retryButton = {isSelected:false, position: new Vector(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)}; //later idea for modifying or making the menu appear more vibrant
                this.replayButton =  {isSelected: false, position: new Vector(CANVAS_WIDTH / 2,  (CANVAS_HEIGHT / 2) + 100)};
        }
        /**
         * Function that is run by the state manager when loaded.
         * @param {{}} paramaters The properties that should be loaded by the state.
         */
        enter(paramaters){
                console.log("Game Over State");
                this.highlighted=this.menuoptions.retry;
                sounds.stop(SoundName.BattleMusic);
        }
    
        /**
         * Function that is run on removal of state.
         */
        exit(){
                super.exit();
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
                        inputConverter.commands.UP_KEY.isPushed=false;
                        this.highlighted = this.highlighted === this.menuoptions.retry ? this.menuoptions.returnToMainMenu: this.menuoptions.retry;

                        this.render();
                }
                else if(inputConverter.commands.DOWN_KEY.isPushed)
                {
                        console.log("Down Key pressed");
                        inputConverter.commands.DOWN_KEY.isPushed=false;
                        this.highlighted = this.highlighted === this.menuoptions.retry ? this.menuoptions.returnToMainMenu: this.menuoptions.retry;
                        this.render();
                } 
                else if(inputConverter.commands.ENTER_KEY.isPushed && this.highlighted === this.menuoptions.retry){
                        console.log("Retry Selected");
                        this.exitState="PlayState";
                        stateManager.removeState();

                }
                else if(inputConverter.commands.ENTER_KEY.isPushed && this.highlighted === this.menuoptions.returnToMainMenu){
                        console.log("Return to main menu been selected");
                        this.exitState="MainMenuState";
                        stateManager.removeState();
                }
        }
    
        /**
         * Renders the current state to the canvas.
         */
        render() { 
                context.save();
                this.renderTitle();
                this.renderOptions();

        }

        renderTitle(){
                context.font = '50px MoonLightMagic';
                context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillStyle = Colour.Crimson//Colour.DodgerBlue;
		context.fillText('GAME OVER', CANVAS_WIDTH / 2, 100);
        }
        renderOptions() {
		context.font = '40px MoonLightMagic';
		context.textAlign = 'middle';
		context.fillStyle = this.highlighted === this.menuoptions.retry? Colour.CornFlowerBlue :Colour.Crimson//Colour.DodgerBlue;
		context.fillText('Retry', this.retryButton.position.x , this.retryButton.position.y);
                context.fillStyle = this.highlighted === this.menuoptions.returnToMainMenu? Colour.CornFlowerBlue :Colour.Crimson//Colour.DodgerBlue;
		context.fillText('Return to Main Menu', this.replayButton.position.x, this.replayButton.position.y);
	}
}