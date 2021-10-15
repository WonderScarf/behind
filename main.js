import Behind from "./src/Behind.js";
import { confetti } from "./web_modules/dom-confetti.js";
import {inputConverter, stateManager} from "./src/global.js"

import PlayState from "./src/states/game_states/PlayState.js"
import BootState from "./src/states/game_states/LoadingState.js";


confetti(document.body, { angle: 0 });

inputConverter.addKeyboardListener(document);

stateManager.saveStateType("PlayState", new PlayState());
stateManager.saveStateType("BootState", new BootState());

// Initialize the game!
let behind = new Behind();
behind.gameLoop();

