//@ts-nocheck

import Sprite from "../../lib/sprite_management/Sprite.js";
import Hitbox from "./Hitbox.js";

/**
 * A representation of a thing on screen with unique properties and abilities.
 */
export default class Entity {


    /**
     * @param {{} | {
     * x: Number, 
     * y: Number, 
     * boundingWidth: Number, 
     * boundingHeight: Number,
     * hitboxWidth: Number,
     * hitboxHeight: Number
     * isCollidable: Boolean,
     * xHitboxOffset: Number,
     * yHitboxOffset:Number,
     * type: Number | Number[] }} params All the varriables to input.
     */
    constructor(params) {

        this.x = params.x ?? 0;
        this.y = params.y ?? 0;

        this.boundingWidth = params.boundingWidth ?? 1;
        this.boundingHeight = params.boundingHeight ?? 1;

        let hitboxWidth = params.hitboxWidth ?? this.boundingWidth;
        let hitboxHeight = params.hitboxHeight ?? this.boundingHeight;

        let xHitboxOffset =  params.xHitboxOffset ?? 0;
        let yHitboxOffset =  params.yHitboxOffset ?? 0;

        let hitboxType = params.type ?? Hitbox.TYPE.Unknown;

        this.hitbox = new Hitbox(this.x, this.y, hitboxWidth, hitboxHeight, yHitboxOffset, hitboxType);

        this.isCollidable = params.isCollidable ?? true;

        this.sprites = [];
        this.animations = [];
        this.currentAnimation = null;
    }

    /**
     * Updates the data of the entity. Non-specific entities updates nothing so it must be overriden by those who extend Entity.
     * @param {Number} trueTime The current time since last frame.
     */
    update(trueTime) { 
        this.hitbox.mimic(this.x, this.y)
    };

    /**
     * Renders the entity to the canvas. Non-specific entities render nothing to nowhere so must be overriden by those who extend Entity.
     */
    render() {
        throw Error("Not implemented");
    };

    setAnimations() { throw Error("Not implemented"); };

    setSprites() { throw Error("Not implemented"); }

    onCollision(collider) { };


}