import Behind from "./src/Behind.js";
import {canvas, stateManager,keys} from "./src/global.js"
import PlayState from "./src/states/game_states/PlayState.js"
import LoadingState from "./src/states/game_states/LoadingState.js";

import GameOverState from "./src/states/game_states/menu_states/GameOverState.js"
import OptionsState from "./src/states/game_states/menu_states/OptionsState.js"
import MainMenuState from "./src/states/game_states/menu_states/MainMenuState.js"
import WinState from "./src/states/game_states/menu_states/WinState.js"

// Setup States for the game's state manager.
stateManager.saveStateType("PlayState", new PlayState());
stateManager.saveStateType("LoadingState", new LoadingState());

// Saving the menu states to the state manager.
stateManager.saveStateType("GameOverState", new GameOverState());
stateManager.saveStateType("MainMenuState", new MainMenuState());
stateManager.saveStateType("WinState", new WinState());
stateManager.saveStateType("OptionsState", new OptionsState());
// Add event listeners for player input.
canvas.addEventListener('keydown', event => {
    keys = event.key;
    //keys={pressed:true,value:event.key};
});

canvas.addEventListener('keyup', event => {
	keys=null;
});


// Initialize the game!
let behind = new Behind();
behind.gameLoop();

