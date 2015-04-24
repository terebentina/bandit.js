//import AudioLoader from './AudioLoader';
import EventEmitter from '../EventEmitter';

let loadersByType = {
	image: PIXI.ImageLoader,
	//audio: AudioLoader,
	json: PIXI.JsonLoader,
	atlas: PIXI.AtlasLoader,
	anim: PIXI.SpineLoader,
	xml: PIXI.BitmapFontLoader,
	fnt: PIXI.BitmapFontLoader
};

let _assets = [];

class Loader extends EventEmitter {
	constructor(assets) {
		super();
		this.assets = assets;
		_assets = _assets.concat(assets);
		return this;
	}

	load() {
		let self = this;
		this.loadCount = this.assets.length;

		function onLoad(evt) {
			self.onAssetLoaded(evt.data.content);
		}

		for (let i = 0; i < this.assets.length; i++) {
			let resource = this.assets[i];
			let Constructor = loadersByType[resource.type];
			if (!Constructor) {
				throw new Error(`${resource.type} is an unsupported file type`);
			}

			let assetLoader = new Constructor(resource.src);
			assetLoader.on('loaded', onLoad);
			assetLoader.load();
		}

		return this;
	}

	onAssetLoaded(loader) {
		this.loadCount--;
		this.emit('progress', {
			content: this,
			loader: loader,
			loaded: this.assets.length - this.loadCount,
			total: this.assets.length
		});

		if (!this.loadCount) {
			this.emit('complete', { content: this });
		}
	}

	static clearAssets() {
		_assets = [];
	}

	static getAsset(name, type = 'image') {
		let asset = null;
		for (let i = 0; i < _assets.length; i++) {
			if (_assets[i].name == name && _assets[i].type == type) {
				asset = _assets[i].src;
				break;
			}
		}

		return asset;
	}
}

export default Loader;
