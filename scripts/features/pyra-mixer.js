// "the pyratite mixer contains free lead"
Blocks.pyratiteMixer.buildType = () => extend(GenericCrafter.GenericCrafterBuild, Blocks.pyratiteMixer, {
    create(block, team){
        this.tile = Vars.emptyTile;
        this.block = block;
        this.team = team;
        if (this.block.loopSound != Sounds.none) {
            this.sound = new SoundLoop(block.loopSound, block.loopSoundVolume);
        }
        this.health = this.block.health;
        this.maxHealth = this.block.health;
        this.timer = new Interval(this.block.timers);
        this.cons = extend(ConsumeModule, this, {
            update(){
                //everything is valid when cheating
                print("delegee\n" + this.delegee + "\n" + Object.keys(this.delegee));
                print("self\n" + this.self + "\n" + Object.keys(this.self));
                
                if(entity.cheating()){
                    valid = optionalValid = true;
                    return;
                }
                
                var prevValid = valid();
                valid = true;
                optionalValid = true;
                var docons = entity.shouldConsume() && entity.productionValid();
                
                for(var cons of entity.block.consumes.all()){
                    if(cons.isOptional()) continue;
                    
                    if(docons && cons.isUpdate() && prevValid && cons.valid(entity)){
                        cons.update(entity);
                    }
                    
                    valid &= cons.valid(entity);
                }
                
                for(var cons of entity.block.consumes.optionals()){
                    if(docons && cons.isUpdate() && prevValid && cons.valid(entity)){
                        cons.update(entity);
                    }
                    
                    optionalValid &= cons.valid(entity);
                }
            }
        });
        if (this.block.hasItems) this.items = new ItemModule(); 
        if (this.block.hasLiquids) this.liquids = new LiquidModule(); 
        if (this.block.hasPower) {
            this.power = new PowerModule();
            this.power.graph.add(this);
        } 
    this.initialized = true;
    return this;
    }
});
