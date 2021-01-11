// "Thorium reactor explosions destroy terrain"
var reactorExplosion = new Effect(240, e => {
    Draw.color(Pal.thoriumPink);
    Lines.stroke(1.2);
    Lines.circle(e.x, e.y, e.fin() * 40 * Vars.tilesize);
});

var destroy = (nukex, nukey) => {
    var hx = nukex / Vars.tilesize + 40;
    var lx = nukex / Vars.tilesize - 40;
    var xs = [];
    for(var i = lx; i <= hx; i++){
        xs.push(i);
    };
    
    var hy = nukey / Vars.tilesize + 40;
    var ly = nukey / Vars.tilesize - 40;
    var ys = [];
    for(var i = ly; i <= hy; i++){
        ys.push(i);
    };
    
    for(var x of xs){
        for(var y of ys){
            var dx = x - nukex / Vars.tilesize;
            var dy = y - nukey / Vars.tilesize;
            
            if(dx * dx + dy * dy < 40 * 40 && x > 0 && x < Vars.world.width() && y > 0 && y < Vars.world.height() && Vars.world.tile(x, y).team() == Team.derelict){
                Vars.world.tile(x, y).setBlock(Blocks.air);
            };
        };
    };
    Events.fire(new WorldLoadEvent());
};

Blocks.thoriumReactor.buildType = () => extend(NuclearReactor.NuclearReactorBuild, Blocks.thoriumReactor, {
    updateTile(){
        var cliquid = this.block.consumes.get(ConsumeType.liquid);
        var item = this.block.consumes.getItem().items[0].item;
        
        var fuel = this.items.get(item);
        var fullness = fuel / this.block.itemCapacity;
        this.productionEfficiency = fullness;
        
        if(fuel > 0 && this.enabled){
            this.heat += fullness * this.block.heating * Math.min(this.delta(), 4);
            
            if(this.timer.get(this.block.timerFuel, this.block.itemDuration / this.timeScale)){
                this.consume();
            }
        }else{
            this.productionEfficiency = 0;
        }
        
        var liquid = cliquid.liquid;
        
        if(this.heat > 0){
            var maxUsed = Math.min(this.liquids.get(liquid), this.heat / this.block.coolantPower);
            this.heat -= maxUsed * this.block.coolantPower;
            this.liquids.remove(liquid, maxUsed);
        }
        
        if(this.heat > this.smokeThreshold){
            var smoke = 1.0 + (heat - smokeThreshold) / (1 - smokeThreshold); //ranges from 1.0 to 2.0
            if(Mathf.chance(smoke / 20.0 * delta())){
                Fx.reactorsmoke.at(x + Mathf.range(size * tilesize / 2),
                y + Mathf.range(size * tilesize / 2));
            }
        }
        
        this.heat = Mathf.clamp(this.heat);
        
        if(this.heat >= 0.999){
            Events.fire(Trigger.thoriumReactorOverheat);
            reactorExplosion.at(this.x, this.y);
            var x = this.x;
            var y = this.y;
            Timer.schedule(() => {
                destroy(x, y);
            }, 4);
            this.kill();
        }
    }
});
