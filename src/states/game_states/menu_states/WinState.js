import Vector from "../../../../lib/Vector.js";
import { Colour } from "../../../enums.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, inputConverter, loadedImages, stateManager } from "../../../global.js";
import Animation from "../../../../lib/time_management/Animation.js"
import MenuState from "./MenuState.js";

/**
 * The screen that displays when having won.
 */
export default class WinState extends MenuState {

        static REPLAY_BUTTON_X_OFF_SET = 415;
        static SPRITESHEET_NAMES = ["award-bronze", "award-silver","award-gold"];
        static INTERVAL = .15;
        constructor(){
                super();
                this.retryButton = {isSelected:false, position: new Vector(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)}; //later idea for modifying or making the menu appear more vibrant
                this.replayButton =  {isSelected: false, position: new Vector(CANVAS_WIDTH / 2,  (CANVAS_HEIGHT / 2) + 100)};
                this.currentTime = localStorage.getItem('currentTime');
                this.animations = new Map();
                this.currentAnimation = null;
        }
        setSprites(){

                let spriteSheet;
         
                 for (let spritesheetIndex = 0; spritesheetIndex < WinState.SPRITESHEET_NAMES.length; spritesheetIndex++) {
         
                     spriteSheet = loadedImages.get(WinState.SPRITESHEET_NAMES[spritesheetIndex]);
                     this.animations.set(WinState.SPRITESHEET_NAMES[spritesheetIndex], new Animation(spriteSheet.getSprites(), WinState.INTERVAL));
                 }
             }
         
        /**
         * Function that is run by the state manager when loaded.
         * @param {{}} paramaters The properties that should be loaded by the state.
         */
        enter(paramaters){
                this.setSprites();
                console.log("Game Over State");
                this.highlighted=this.menuoptions.retry;
                console.log(stateManager.currentStateStack);
                if(this.currentTime<3)
                {
                        this.currentAnimation = this.animations.get(WinState.SPRITESHEET_NAMES[2]);        
                }
                else if(this.currentTime<4)
                        this.currentAnimation = this.animations.get(WinState.SPRITESHEET_NAMES[1]);
                else if (this.currentTime<5)
                        this.currentAnimation = this.animations.get(WinState.SPRITESHEET_NAMES[0]);
                
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
                this.currentAnimation.update(trueTime);
        }
    
/**
         * Renders the current state to the canvas.
         */
        render() { 
                context.save();
                this.renderTitle();
                this.renderOptions();
                this.currentAnimation.renderCurrentFrame(200, 200);
        }
        renderTitle(){
                context.font = '38px MoonLightMagic';
                context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillStyle = Colour.Crimson//Colour.DodgerBlue;
		context.fillText('CONGRATULATIONS', CANVAS_WIDTH / 2, 100);
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