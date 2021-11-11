import Bullet from "../entities/bullets/Bullet.js";
import WitchBullet from "../entities/bullets/WitchBullet.js";
import WitchFocusBullet from "../entities/bullets/WitchFocusBullet.js";
import AoeBullet from "../entities/bullets/AoeBullet.js";
import DirectBullet from "../entities/bullets/DirectBullet.js";
import { BulletType } from "../enums";
/**
 * Factory that produces bullets of different types.
 */
export class BulletFactory {

    /**
     * Creates an instance of bullet
     * @param {string} type the type of the bullet to create, defaults to DirectBullet
     * @param {Number} spawnX The spawn point of the bullet on the x axis.
     * @param {Number} spawnY The spawn point of the bullet on the y axis.
     * @param {*} direction Direction The Bullet is facing
     * @returns {Bullet} The newly created bullet.
     */
	static createInstance(type, spawnX, spawnY, direction) {
		
        switch (type) {
			case BulletType.Aoe:
				return new AoeBullet(spawnX, spawnX);
            case BulletType.Witch:
                return new WitchBullet(spawnX, spawnX, direction);
            case BulletType.WitchFocus:
                return new WitchFocusBullet(spawnX, spawnX, direction);
			default: 
				return new DirectBullet(spawnX, spawnY, direction);
		}

	}
}
