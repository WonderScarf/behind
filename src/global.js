import StateManager from "./states/StateManager.js";
import InputConverter from "../lib/input_management/InputConverter.js"
import Timer from "../lib/time_management/Timer.js";

// Canvas Properties

/** The canvas the game will be drawn upon. */
export let canvas = document.querySelector("canvas");

// Throws an error if canvas is null.
if(!canvas) {
    throw new Error("Canvas could not be found");
}

/** The 2D context of the canvas */
export let context = canvas.getContext('2d'); 

// The canvas width and height
export const CANVAS_WIDTH = canvas.width;
export const CANVAS_HEIGHT = canvas.height;

/** The game state manager. */
export const stateManager = new StateManager();

//Input
export const inputConverter = new InputConverter();

//Image Stockpile
/** A Map of currently loaded images. */
export const loadedImages = new Map();

/** Boolean dictating if we display hitboxes on screen or not. */
export const DEBUG = true;

/** Timer that can be used to track things. */
export const timer = new Timer();
