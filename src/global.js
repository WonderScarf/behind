import StateManager from "./states/StateManager.js";
import InputConverter from "./input_management/InputConverter.js"

// Canvas Properties
export let canvas = document.querySelector("canvas");

if(!canvas){
    throw new Error("Canvas could not be found");
}

export let context = canvas.getContext('2d'); 
export const CANVAS_WIDTH = canvas.width;
export const CANVAS_HEIGHT = canvas.height;

// State manager
export const stateManager = new StateManager();

//Input
export const inputConverter = new InputConverter();
