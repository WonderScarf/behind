import Sprite from "./Sprite.js";

/**
* A Sheet containing multiple sprites.
*/
export default class CanvasImage {

	/**
	 * @param {String} path The path to the image to be used as a Image.
	 * @param {*} context The context of the canvas that the Sprites will be drawn.
	 * @param {Number} width The width of the Image.
     * @param {Number} height The height of the Image.
	 * @param {Number} spriteWidth
	 * @param {Number} spriteHeight
	 */
	constructor(path, context ,width, height, spriteWidth = width, spriteHeight = height) {
		this.image = new Image(width, height);

		this.image.src = path;
		this.width = width;

		this.height = height;
		this.context = context;

		this.spriteHeight = spriteHeight;
		this.spriteWidth = spriteWidth;
	}

	getSprites(){

		let sprites = [];
		
		for (let column = 0; (column * this.spriteHeight) < this.height; column++) {
			
			for (let row = 0; (row * this.spriteWidth) < this.width; row++) {
				sprites.unshift(new Sprite(this, row, column, this.spriteWidth, this.spriteHeight));
			}					
		}

		console.log(sprites)
		return sprites;
	}

	/**
	 * Draws out a the image to the canvas.
	 * @param {Number} x The canvas x possision to spawn the image on.
	 * @param {Number} y The canvas y possision to spawn the image on.
	 * @param {Number} width The width of the image to spawn, default value is the CanvaImage's width.
	 * @param {Number} height The height of the image to spawn, default value is the CanvaImage's height.
	 */
	render(x, y, width = this.width, height = this.height) {
		this.context.drawImage(this.image, x, y, width, height);
	}
}
