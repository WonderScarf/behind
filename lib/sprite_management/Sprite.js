import CanvasImage from "./CanvasImage.js";

/**
 * A sprite on located on a sprite sheet.
 */
export default class Sprite {
	/**
	 * @param {CanvasImage} spriteSheet The Canvas image that acts as the SpriteSheet of the sprite
	 * @param {Number} x The X coordinate of the sprite in the sprite sheet.
	 * @param {Number} y The X coordinate of the sprite in the sprite sheet.
	 * @param {Number} width The width of the sprite
	 * @param {Number} height The width of the sprite
	 */
	constructor(spriteSheet, x = 0, y = 0, width, height) {
		this.spriteSheet = spriteSheet;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	/**
	 * @param {Number} canvasX The x possision  of the canvas
	 * @param {Number} canvasY The y possision  of the canvas
	 * @param {{x: Number, y: Number}} scale The scale to increase or decrease  
	 */
	render(canvasX, canvasY, scale = { x: 1, y: 1 }) {		
		
		this.spriteSheet.context.drawImage(
			this.spriteSheet.image, 
			this.x, this.y, 
			this.width, this.height, 
			canvasX, canvasY,
			this.width * scale.x, this.height * scale.y,
			);
	}

	
}
