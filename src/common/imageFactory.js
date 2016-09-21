/**
 * Created by gooba on 20/09/2016.
 */
import DeadPool from './deadpool'
import ImageWrapper from '../common/image'

let deadpool = new DeadPool();

export default class ImageFactory {
    static getImage(src) {
        return deadpool.get(src) || new ImageWrapper(src)
    }

    static killImage(image) {
        deadpool.add(image);
    }
}