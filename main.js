import Behind from "./src/Behind.js";
import { confetti } from "./web_modules/dom-confetti.js";
import {stateManager} from "./src/global.js"

import PlayState from "./src/states/game_states/PlayState.js"
import LoadingState from "./src/states/game_states/LoadingState.js";

confetti(document.body, { angle: 0 });

stateManager.saveStateType("PlayState", new PlayState());
stateManager.saveStateType("LoadingState", new LoadingState());

// Initialize the game!
let behind = new Behind();
behind.gameLoop();

