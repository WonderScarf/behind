//@ts-nocheck

import Hitbox from "./Hitbox.js";
import { DEBUG, context } from "../global.js";

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

        this.hitbox = new Hitbox(this.x, this.y, hitboxWidth, hitboxHeight, xHitboxOffset,yHitboxOffset, hitboxType);

        this.isCollidable = params.isCollidable ?? true;

        this.sprites = [];
        this.animations = new Map();
        this.currentAnimation = null;

        /**If the entity should be cleaned up at the next nearest opportunity. */
        this.canRemove = false;
        
    }

    /**
     * Updates the data of the entity. Non-specific entities updates nothing so it must be overriden by those who extend Entity.
     * @param {Number} trueTime The current time since last frame.
     */
    update(trueTime) { 
        // TODO Check if the entity is OOB
        this.hitbox.mimic(this.x, this.y)
    };

    /**
     * Renders the entity to the canvas. Will only render hitbox if not overwritten.
     */
    render() {
        if(DEBUG){
            this.hitbox.render();

            context.save();
            context.strokeStyle = "rgba(100, 0, 0, .5)";
            context.lineWidth = 3;
            context.li
            context.beginPath();
            context.rect(this.x, this.y, this.boundingWidth, this.boundingHeight);
            context.stroke();
            context.closePath();
            context.restore();
        }
    };


    // Functions relating to drawing / animating of the Entity.

    setSprites() { throw Error("Not implemented"); }


    /* Functions that act as templates for events that may occur to the Entity like getting shot. 
       These will hereby be refered to as 'Actions'*/
    
    /**
     * Action that is ran when entity goes off the canvas.
     * @throws error when not being overriden.
     */
    oobAction(){ throw Error("Not implemented"); }

    /**
     * Action that is ran when the entity colides into another entity. Meant to be overriden by entity.
     * @param {Entity} collider The entity colided into.
     * @throws error when not being overriden
     */
    collisionAction(collider) { throw Error("Not implemented"); };



}