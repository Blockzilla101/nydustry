// "thorium reactor explosions destroy terrain"
let calculate;
let effect;
let explode;

calculate = () => {
    let blocks = new Seq();
    for(let y = -40; y <= 40; y++){
        for(let x = -40; x <= 40; x++){
            let res = x * x + y * y;
            
            if(res < 40 * 40){
                blocks.add([x, y]);
            }
        };
    };
    return blocks;
};

effect = (reactor) => {
    let i = 0;
    Timer.schedule(() => {
        Bullets.slagShot.create(reactor, reactor.team, reactor.x, reactor.y, i, 1, 8);
        i += 15;
    }, 0, 0, 24);
};

explode = (rx, ry, rseq, tile) => {
    Timer.schedule(() => {
        let nx = rx / Vars.tilesize;
        let ny = ry / Vars.tilesize;
        
        rseq.each(e => {
            let ux = nx + e[0];
            let uy = ny + e[1];
            
            if(ux > 0 && uy > 0 && ux < Vars.world.width() && uy < Vars.world.height()){
                if(Vars.world.tile(ux, uy).block !== Blocks.air){
                    if(Vars.world.tile(ux, uy).team() === Team.derelict){
                        Vars.world.tile(ux, uy).setAir();
                    };
                };
            };
        });
    
        Events.fire(new WorldLoadEvent());
    }, 4);
};

module.exports = {
    calculate: calculate,
    effect: effect,
    explode: explode
};
