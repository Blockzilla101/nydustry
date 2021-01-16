// this system is so complicated aaaaaaa
let func = require("func");

let thoriumReactor = require("features/thorium-reactor");
let pyraMixer = require("features/pyra-mixer");
let separator = require("features/separator");
let cryoMixer = require("features/cryo-mixer")

// run stuff
let blastRadius = thoriumReactor.calculate();

// event part
Events.on(BlockBuildEndEvent, e => {
    if(!e.breaking){
        switch(e.tile.build.block){
            case Blocks.thoriumReactor: {
                let listener = () => {
                    if(e.tile.build.heat > 0.999){
                        let i = 0;
                        thoriumReactor.effect(e.tile.build);
                        thoriumReactor.explode(e.tile.build.x, e.tile.build.y, blastRadius);
                    };
                };
                func.listen(e.tile, listener);
                break;
            }
            case Blocks.pyratiteMixer: {
                let listener = () => {
                    pyraMixer.give(e.tile.build);
                    pyraMixer.explode(e.tile.build);
                };
                func.listen(e.tile, listener);
                break;
            }
            case Blocks.separator: {
                let listener = () => {
                    separator.give(e.tile.build);
                    separator.produce(e.tile.build);
                };
                func.listen(e.tile, listener);
                break;
            }
            case Blocks.cryofluidMixer: {
                let listener = () => {
                    cryoMixer.give(e.tile.build)
                };
                func.listen(e.tile, listener);
                break;
            }
        }
    }
});
