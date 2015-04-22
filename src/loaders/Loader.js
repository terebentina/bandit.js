//import AudioLoader from './AudioLoader';
import EventEmitter from '../EventEmitter';

class Loader extends EventEmitter {
	constructor(resources) {
		super();
		this.resources = resources;

		this.loadersByType = {
			image: PIXI.ImageLoader,
			//audio: AudioLoader,
			json: PIXI.JsonLoader,
			atlas: PIXI.AtlasLoader,
			anim: PIXI.SpineLoader,
			xml: PIXI.BitmapFontLoader,
			fnt: PIXI.BitmapFontLoader
		};
	}

	load() {
		let self = this;

		this.loadCount = this.resources.length;

		for (let i = 0; i < this.resources.length; i++) {
			let resource = this.resources[i];
			let Constructor = this.loadersByType[resource.type];
			if (!Constructor) {
				throw new Error(`${resource.type} is an unsupported file type`);
			}

			let loader = new Constructor(resource.src);

			loader.on('loaded', function onLoad(evt) {
				self.onAssetLoaded(evt.data.content);
			});
			loader.load();
		}
	}

	onAssetLoaded(loader) {
		this.loadCount--;

		this.emit('onProgress', {
			content: this,
			loader: loader,
			loaded: this.resources.length - this.loadCount,
			total: this.resources.length
		});

		if (this.onProgress) {
			this.onProgress(loader);
		}

		if (!this.loadCount) {
			this.emit('onComplete', { content: this });
			if (this.onComplete) {
				this.onComplete();
			}
		}
	}

	onload() {
		return true;
	}
}

export default Loader;
