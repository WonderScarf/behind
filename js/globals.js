/**
 * A file containing general global, will most likely be temporary
 * but may still see wide use due to it's global nature
*/

/**
  * The currently in use images that will be played by the game.
  * We should use it like a dictionary.
  */
export let loadedImages = {};

/**
  * The currently in use sounds that will be played by the game.
  * We should use it like a dictionary.
  */
export let loadedSounds = {};

/**
 * The canvas the game will take place upon.
 */
export const canvas = document.querySelector('canvas');
 
/**
   * The context of the game canvas in 2D. If anything 3D is needed then
   * a new context will need to be generated.
   */
export const context = canvas.getContext('2d');
