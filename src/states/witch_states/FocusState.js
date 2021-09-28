import { inputConverter } from "../../global.js";
import Witch from "../../entities/Witch.js";
import State from "../State.js";

/*Doesn't work with MoveState as parent, guising becasue of thhe fact that:
  
  FocusState.js:11 Uncaught ReferenceError: Cannot access 'MoveState' before initialization
  at FocusState.js:14 
  this is in fact the initializer for the class

  This was because of circluar dependancy because for a FocusState to extend
  a MoveState while movestate creates a Focus State would require both the MoveState
  and the FocusState to Point to Eachother, this causes node to poop it's pants
  and thus thats out of the question. If we want to use heirarchical states we
  either:

   - Find a way to create child states in parent states without recursive imports

   - Create a (A => B => C) or a (A => B => C => A) dependacy. This would mean we
     would need to make our Statemanager not take in a new Object Declaration but a
     type along with paramaters instead. This would avoid a circular dependancy though
     would be hard as hell to code. The internet seems to call this a "Patern Factory".
     This is a new concept to me but I feel like a factory could absolutly vaporize this
     issue and allow for me to create states like this freely. I should be able to do this
     dynamically allowing by instead inputing a type rather than a new instance of an object
     when creating them. Noticing it It may still not work as I would need to import the class's Type
     which may cause that issue still though i guess we could use a string instead or an enum stored 
     inside the factory instead. 

     https://enmascript.com/articles/2018/10/05/javascript-factory-pattern
     https://spin.atomicobject.com/2018/06/25/circular-dependencies-javascript/
     https://stackoverflow.com/questions/5658182/initializing-a-class-with-class-forname-and-which-have-a-constructor-which-tak

     In the end I may just do neither as the amount of work to create one may just be better spent on other
     aspects. As long as we don't repeat too much.
*/

/**
* The state that represents when the player slows down to dodge shots also displays hitbox.
*/
export default class FocusState extends State {

    // More shall be added.

    constructor() {
        super();

    };

    /**
     * Enters the FocusState.
     * @param {{witch: Witch, soul: any}} paramaters The inputs used when entering the state.
     */
    enter(paramaters) {
        super.enter(paramaters);

        if(!paramaters.witch){
            throw new Error("No witch was input with the paramaters.")
        }

        this.witch = paramaters.witch; //The Witch that will be move
    }

    exit() {
        //Here we can do something on exit if we want...
    }

    update(trueTime) {

        if (!inputConverter.commands) {
            throw new Error("Commands have not been initialized and thus cannot be read.");
        }

        if (!this.witch) {
            throw new Error("Commands have not been initialized and thus cannot be read.");
        }

        //If not pushed, revert to the previous state (which should be the MoveState).
        if (!inputConverter.commands.ALTERNATE_KEY.isPushed) {
            this.witch.stateManager.removeState();
        }

        let moveWeight = { x: 0, y: 0 }

        //Check directions

        if (inputConverter.commands.UP_KEY.isPushed && inputConverter.commands.UP_KEY.isEnabled) {
            moveWeight.y -= 0.25;
        }
        else if (inputConverter.commands.DOWN_KEY.isPushed && inputConverter.commands.DOWN_KEY.isEnabled) {
            moveWeight.y += 0.25;
        }

        if (inputConverter.commands.RIGHT_KEY.isPushed && inputConverter.commands.RIGHT_KEY.isEnabled) {
            moveWeight.x += 0.25;
        }
        else if (inputConverter.commands.LEFT_KEY.isPushed && inputConverter.commands.LEFT_KEY.isEnabled) {
            moveWeight.x -= 0.25;
        }

        this.witch.move(moveWeight.x, moveWeight.y);
    }

    render() {
        super.render();
    }
};