import sprites from "../configs/sprites";

class ClientWorld {
    constructor(game, engine, levelCfg) {
        Object.assign(this,{
            game,
            engine,
            levelCfg,
            height:levelCfg.map.length,
            width: levelCfg.map[0].length,
        })
    }

    init(){
        console.log(this)
        const {map} = this.levelCfg;
        
        map.forEach((cfgRow, y) => {
            cfgRow.forEach((cfgCell, x) => {
                const frame = sprites.terrain[cfgCell[0]].frames[0];
                this.engine.renderSpriteFrame({
                    sprite: ['terrain', 'grass'],
                    frame,
                    x,
                    y,
                    w: 48,
                    h: 48,
                })
            })
        })
    }
}
export default ClientWorld;