import Vector from "../../../../lib/Vector.js";
import { Colour } from "../../../enums.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, inputConverter, keys, stateManager } from "../../../global.js";
import StateManager from "../../StateManager.js";
import GameOverState from "./GameOverState.js";
import MainMenu from "./MainMenuState.js";
import MenuState from "./MenuState.js";

/**
 * The game's options menu.
 */
export default class OptionsState extends MenuState {

    static RETURN_BUTTON_X_OFFSET=20;
    constructor(){
        super();
        this.isSelected=false;

    }
    /**
     * Function that is run by the state manager when loaded.
     * @param {{}} paramaters The properties that should be loaded by the state.
     */
    enter(paramaters){
        console.log("Entering OptionsState...")
        this.highlighted = this.menuoptions.UpKey;

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
            if(!this.isSelected){
                if(inputConverter.commands.UP_KEY.isPushed){
                    console.log(`Up key pressed ${inputConverter.commands.UP_KEY.inputs[0]}`);
                    inputConverter.commands.UP_KEY.isPushed=false;
                    this.highlighted = this.highlighted === this.menuoptions.UpKey ? this.menuoptions.returnToMainMenu:
                                       this.highlighted === this.menuoptions.returnToMainMenu ? this.menuoptions.ConsoleKey: 
                                       this.highlighted === this.menuoptions.ConsoleKey ? this.menuoptions.BackKey: 
                                       this.highlighted === this.menuoptions.BackKey ? this.menuoptions.TetiaryKey: 
                                       this.highlighted === this.menuoptions.TetiaryKey ? this.menuoptions.SecondaryKey:
                                       this.highlighted === this.menuoptions.SecondaryKey ? this.menuoptions.PrimaryKey:
                                       this.highlighted === this.menuoptions.PrimaryKey ? this.menuoptions.LeftKey:
                                       this.highlighted === this.menuoptions.LeftKey ? this.menuoptions.RightKey:
                                       this.highlighted === this.menuoptions.RightKey ? this.menuoptions.DownKey: 
                                       this.menuoptions.UpKey;
                }
                else if(inputConverter.commands.DOWN_KEY.isPushed)
                {
                        console.log("Down Key pressed");
                        inputConverter.commands.DOWN_KEY.isPushed=false;
                        this.highlighted = this.highlighted === this.menuoptions.UpKey ? this.menuoptions.DownKey:
                            this.highlighted === this.menuoptions.DownKey ? this.menuoptions.RightKey: 
                            this.highlighted === this.menuoptions.RightKey ? this.menuoptions.LeftKey: 
                            this.highlighted === this.menuoptions.LeftKey ? this.menuoptions.PrimaryKey: 
                            this.highlighted === this.menuoptions.PrimaryKey ? this.menuoptions.SecondaryKey:
                            this.highlighted === this.menuoptions.SecondaryKey ? this.menuoptions.TetiaryKey:
                            this.highlighted === this.menuoptions.TetiaryKey ? this.menuoptions.BackKey:
                            this.highlighted === this.menuoptions.BackKey ? this.menuoptions.ConsoleKey:
                            this.highlighted === this.menuoptions.ConsoleKey ? this.menuoptions.returnToMainMenu: 
                            this.menuoptions.UpKey;

                } 
                else if(inputConverter.commands.ENTER_KEY.isPushed && this.highlighted == this.menuoptions.returnToMainMenu){
                        console.log("Return has been pressed has been pressed");
                       this.exitState="MainMenuState";
                       stateManager.removeState();

                }
                else if(inputConverter.commands.ENTER_KEY.isPushed && this.highlighted == this.menuoptions.UpKey){
                    console.log("Options been selected");
                }
                else if(inputConverter.commands.ENTER_KEY.isPushed && (this.highlighted === this.menuoptions.UpKey||
                    this.highlighted === this.menuoptions.RightKey||this.highlighted === this.menuoptions.DownKey||
                    this.highlighted === this.menuoptions.LeftKey||this.highlighted === this.menuoptions.PrimaryKey||
                    this.highlighted === this.menuoptions.SecondaryKey||this.highlighted === this.menuoptions.TetiaryKey||
                    this.highlighted === this.menuoptions.BackKey||this.highlighted === this.menuoptions.ConsoleKey)){
                        this.isSelected=true;
                        inputConverter.commands.ENTER_KEY.isPushed=false;
                    }
            }
            else{

                if(keys!=null){
                    switch(this.highlighted){
                        case this.menuoptions.UpKey:
                            inputConverter.alterCommand(inputConverter.commands.UP_KEY,keys);
                            this.isSelected=false;
                            break;
                        case this.menuoptions.DownKey:
                            break;
                        case this.menuoptions.LeftKey:
                            break;
                        case this.menuoptions.RightKey:
                            break;
                        case this.menuoptions.ConsoleKey:
                            break;
                        case this.menuoptions.TetiaryKey:
                            break;
                        case this.menuoptions.PrimaryKey:
                            break;
                        case this.menuoptions.SecondaryKey:
                            break;
                        case this.menuoptions.BackKey:
                            break;
                    }
                    console.log(keys);
                }

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
    renderCursor(){
        context.font = '30px Arial';
        context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillStyle = Colour.Crimson//Colour.DodgerBlue;
		context.fillText('<', this.cursor.x,this.cursor.y);
    }
    renderTitle(){
        context.font = '40px Arial';
        context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillStyle = Colour.Crimson//Colour.DodgerBlue;
		context.fillText('Options', CANVAS_WIDTH / 2, 100);
    }
    renderOptions() {
		context.font = '25px Arial';
        //context.textBaseline = 'bottom';
        context.textAlign = 'center';
        //context.textBaseline = 'left';
		context.fillStyle = this.highlighted === this.menuoptions.UpKey? Colour.CornFlowerBlue :Colour.Crimson//Colour.DodgerBlue;
		context.fillText(`UpButton = ${inputConverter.commands.UP_KEY.inputs[0]}`, CANVAS_WIDTH / 2,150);
        context.fillStyle = this.highlighted === this.menuoptions.DownKey? Colour.CornFlowerBlue :Colour.Crimson//Colour.DodgerBlue;
        context.fillText(`DownButton = ${inputConverter.commands.DOWN_KEY.inputs[0]}`,CANVAS_WIDTH / 2,180);
        context.fillStyle = this.highlighted === this.menuoptions.RightKey? Colour.CornFlowerBlue :Colour.Crimson//Colour.DodgerBlue;
        context.fillText(`RightButton = ${inputConverter.commands.RIGHT_KEY.inputs[1]}`, CANVAS_WIDTH / 2,210);
        context.fillStyle = this.highlighted === this.menuoptions.LeftKey? Colour.CornFlowerBlue :Colour.Crimson//Colour.DodgerBlue;
        context.fillText(`Left Button = ${inputConverter.commands.LEFT_KEY.inputs[0]}`,  CANVAS_WIDTH / 2,240);
        context.fillStyle = this.highlighted === this.menuoptions.PrimaryKey? Colour.CornFlowerBlue :Colour.Crimson//Colour.DodgerBlue;
        context.fillText(`PRIMARY_KEY = ${inputConverter.commands.PRIMARY_KEY.inputs[0]}`, CANVAS_WIDTH / 2,270);
        context.fillStyle = this.highlighted === this.menuoptions.SecondaryKey? Colour.CornFlowerBlue :Colour.Crimson//Colour.DodgerBlue;
        context.fillText(`SECONDARY_KEY = ${inputConverter.commands.SECONDARY_KEY.inputs[0]}`, CANVAS_WIDTH / 2,300);
        context.fillStyle = this.highlighted === this.menuoptions.TetiaryKey? Colour.CornFlowerBlue :Colour.Crimson//Colour.DodgerBlue;
        context.fillText(`TETIARY_KEY = ${inputConverter.commands.TETIARY_KEY.inputs[0]}`, CANVAS_WIDTH / 2,330);
        context.fillStyle = this.highlighted === this.menuoptions.BackKey? Colour.CornFlowerBlue :Colour.Crimson//Colour.DodgerBlue;
        context.fillText(`BACK_KEY = ${inputConverter.commands.BACK_KEY.inputs[0]}`, CANVAS_WIDTH / 2,360);
        context.fillStyle = this.highlighted === this.menuoptions.ConsoleKey? Colour.CornFlowerBlue :Colour.Crimson//Colour.DodgerBlue;/Colour.DodgerBlue;
        context.fillText(`CONSOLE_KEY = ${inputConverter.commands.CONSOLE_KEY.inputs[0]}`, CANVAS_WIDTH / 2,390);
        context.fillStyle = this.highlighted === this.menuoptions.returnToMainMenu? Colour.CornFlowerBlue :Colour.Crimson//Colour.DodgerBlue;/Colour.DodgerBlue;
		context.fillText('Return to Main Menu', CANVAS_WIDTH / 2,420);
	}
}