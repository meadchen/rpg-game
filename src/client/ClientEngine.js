import EventSourceMixin from "../common/EventSourceMixin";

class ClientEngine {
    constructor(canvas) {
        Object.assign(this,{
            canvas,
            ctx: null,
            imageLoaders: [],
            sprites: {},
            images: {}
        })

        this.ctx = canvas.getContext('2d');

        this.loop = this.loop.bind(this);
    }

    start(){
        this.loop();
    }

    loop(timestamp){
        const {ctx, canvas} = this;
        ctx.fillStyle = 'black';
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.trigger('render', timestamp);
        this.initNextFrame();
    }

    initNextFrame(){
        window.requestAnimationFrame(this.loop);
    }

    loadSprites(spritesGroup){
        this.imageLoaders = [];

        for(let groupName in spritesGroup){
            const group = spritesGroup[groupName];
            this.sprites[groupName] = group;

            for (let spriteName in group){
                const {img} = group[spriteName];
                if(!this.images[img]){
                    this.imageLoaders.push(this.loadImage(img));
                }
            }
        }
        return Promise.all(this.imageLoaders);
    }
    loadImage(url){
        return new Promise(resolve => {
            const i = new Image();
            this.images[url] = i;
            i.onload = () => resolve(i);
            i.src = url;
        })
    }
    renderSpriteFrame({sprite, frame, x, y, w, h}) {
        console.log(frame)
        const spriteCfg = this.sprites[sprite[0]][sprite[1]];
        const [fx, fy, fw, fh] = frame;
        const img = this.images[spriteCfg.img];

        this.ctx.drawImage(img, fx, fy, fw, fh, x * w, y * h, w, h);
    }
}

Object.assign(ClientEngine.prototype, EventSourceMixin);

export default ClientEngine;