import Bullet from "./Bullet.js";

/**
 * Bullet spawns and stays in place for a set amount of time.
 */
export default class AoeBullet extends Bullet{
    /**The length of time the bullet exists for.*/
    static MAX_TIME = 5;
}