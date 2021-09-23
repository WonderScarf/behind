import Behind from "./src/Behind.js";
import { confetti } from "./web_modules/dom-confetti.js";
import {canvas, context, inputConverter, stateManager} from "./src/global.js"
import TouhouState from "./src/states/game_states/TouhouState.js"
confetti(document.body, { angle: 90 });

stateManager.saveState("touhou", new TouhouState());
stateManager.loadFromStates("touhou");

inputConverter.addKeyboardListener(document);

// Initialize the game!
let behind = new Behind();
behind.gameLoop();