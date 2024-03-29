import Vector from "../../../../lib/Vector.js";
import { Colour, SoundName } from "../../../enums.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, inputConverter, sounds, stateManager } from "../../../global.js";
import MenuState from "./MenuState.js";

export default class MainMenu extends MenuState {

        static CURSOR_XOFF_SET=170;
        static CURSOR_YOFF_SET=3;


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
                this.highlighted = this.menuoptions.play;
                sounds.play(SoundName.menuMusic);
        }
    
        /**
         * Function that is run on removal of state.
         */
        exit(){
                super.exit();
                sounds.stop(SoundName.menuMusic);
        }
    
        /**
         * Code that is ran when we leave our current state, to prepare for re-entering a state.
         */
        return(){
                sounds.stop(SoundName.menuMusic);
                sounds.play(SoundName.menuMusic);
                super.return();
        }
    

        /**
         * Updates the current state
         * @param {Number} trueTime The ajusted time.
         */
         update(trueTime){
                if(inputConverter.commands.UP_KEY.isPushed){
                        inputConverter.commands.UP_KEY.isPushed=false;
                        sounds.stop(SoundName.BossHit);
                        sounds.play(SoundName.BossHit);
                        this.highlighted = this.highlighted === this.menuoptions.play ? this.menuoptions.options: this.menuoptions.play;

                }
                else if(inputConverter.commands.DOWN_KEY.isPushed)
                {
                        sounds.stop(SoundName.BossHit);
                        sounds.play(SoundName.BossHit);
                        inputConverter.commands.DOWN_KEY.isPushed=false;
                        this.highlighted = this.highlighted === this.menuoptions.options ? this.menuoptions.play: this.menuoptions.options;

                } 
                else if(inputConverter.commands.ENTER_KEY.isPushed && this.highlighted==this.menuoptions.play){
                        this.exitState="PlayState";
                        sounds.stop(SoundName.PlayerHit);
                        sounds.play(SoundName.PlayerHit);

                        stateManager.removeState();
                }
                else if(inputConverter.commands.ENTER_KEY.isPushed && this.highlighted==this.menuoptions.options){
                        this.exitState="OptionsState";
                        sounds.stop(SoundName.PlayerHit);
                        sounds.play(SoundName.PlayerHit);

                        stateManager.removeState();
                }
                this.render();

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
                context.font = '60px gameOnRegular';
                context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillStyle = Colour.Crimson//Colour.DodgerBlue;
		context.fillText('Behind', CANVAS_WIDTH / 2, 100);
        }
        renderOptions() {
		context.font = '40px MoonLightMagic';
                context.textAlign = 'middle';
		context.fillStyle = this.highlighted === this.menuoptions.play? Colour.CornFlowerBlue :Colour.Crimson//Colour.DodgerBlue;
		context.fillText('Play', this.playButton.position.x , this.playButton.position.y);
                context.fillStyle =  this.highlighted === this.menuoptions.options? Colour.CornFlowerBlue :Colour.Crimson//Colour.DodgerBlue;
		context.fillText('Options', this.optionButton.position.x, this.optionButton.position.y);
	}
}