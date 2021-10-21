
/**
 * A representation of a thing on screen with unique properties and abilities.
 */
export default class Entity {

    /**
     * @param {Number} x The possition of top left x cordinate where the entity resides.
     * @param {Number} y The possition of top y x cordinate where the entity resides. 
     * @param {Number} width The width of the entity.
     * @param {Number} height The height of the entity.
     * @param {Boolean} isCollidable If the entity can colide with other objects
     */
    constructor(x, y, width, height, sprites = [], isCollidable = true) {
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.isCollidable = isCollidable;
        this.sprites = sprites;

    }

    /**
     * Updates the data of the entity. Non-specific entities updates nothing so it must be overriden by those who extend Entity.
     * @param {Number} trueTime The current time since last frame.
     */
    update(trueTime) { };

    /**
     * Renders the entity to the canvas. Non-specific entities render nothing to nowhere so must be overriden by those who extend Entity.
     */
    render() { };

}