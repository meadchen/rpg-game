import ClientEngine from "./ClientEngine";
import sprites from '../configs/sprites';
import levelCfg from '../configs/world.json'
import ClientWorld from "./ClientWorld";

class ClientGame {
    constructor(cfg) {
        Object.assign(this, {
            cfg,
        })

        this.engine = this.createEngine();
        this.map = this.createWorld();
        console.log(this.map)
        this.initEngine();
    }

    createEngine(){
        return new ClientEngine(document.getElementById(this.cfg.tagId));
    }

    createWorld(){
        return new ClientWorld(this, this.engine, levelCfg);
    }

    initEngine(){
        this.engine
            .loadSprites(sprites)
            .then(() => {
                this.engine.on('render', (_, time) =>{
                    this.map.init();
                });
                this.engine.start();
        })
    }

    static init(cfg){
        if(!ClientGame.game){
            ClientGame.game = new ClientGame(cfg);
            console.log('game init')
        }
    }
}

export default ClientGame;