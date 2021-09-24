import Behind from "./src/Behind.js";
import { confetti } from "./web_modules/dom-confetti.js";
import {canvas, context, inputConverter, stateManager} from "./src/global.js"
import PlayState from "./src/states/game_states/PlayState.js"
confetti(document.body, { angle: 0 });

stateManager.addState(new PlayState());


inputConverter.addKeyboardListener(document);

// Initialize the game!
let behind = new Behind();
behind.gameLoop();