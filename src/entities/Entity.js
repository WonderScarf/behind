import Sprite from "../../lib/sprite_management/Sprite.js";
import Hitbox from "./Hitbox.js";

/**
 * A representation of a thing on screen with unique properties and abilities.
 */
export default class Entity {

    /**
     * @param {Number} x The possition of top left x cordinate where the entity resides.
     * @param {Number} y The possition of top y x cordinate where the entity resides. 
     * @param {Number} boundingWidth The width of the entity.
     * @param {Number} boundingHeight The height of the entity.
     * @param {Hitbox[]} hitboxes If the entity can colide with other objects
     * @param {Boolean} isCollidable If the entity can colide with other objects
     */
    constructor(x, y, boundingWidth, boundingHeight, hitboxes = [], isCollidable = true) {
        this.x = x;
        this.y = y;

        this.boundingWidth = boundingWidth;
        this.boundingHeight = boundingHeight;

        this.hitboxes = hitboxes;

        this.isCollidable = isCollidable;

        this.sprites;
        this.animations;
        
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

    onCollision(collider){};

    
}