import Loader from '../loaders/Loader';

class Sprite extends PIXI.Sprite {
	constructor(texture) {
		super(texture);
	}

	static fromName(name, scaleMode) {
		let assetSrc = Loader.getAsset(name, 'image');
		if (!assetSrc) {
			throw new Error(`The ${name} image is not preloaded`);
		}
		console.log('asset', assetSrc);
		return Sprite.fromImage(assetSrc);
	}
}

export default Sprite;
