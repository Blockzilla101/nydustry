Blocks.pulverizer.buildType = () => extend(GenericCrafter.GenericCrafterBuild, Blocks.pulverizer, {
    updateTile(){
        this.super$updateTile();

        if(this.tile.overlay() instanceof OreBlock){
            if (this.items.get(Items.scrap) === 0 && this.power.status === 1) this.items.add(Items.scrap, 100);
        }

        let around = [
            this.nearby(-1, 0),
            this.nearby(0, -1),
            this.nearby(1, 0),
            this.nearby(0, 1),
        ];

        if(this.items.get(Items.scrap) > 0){
            for(var b of around){
                if(b !== null && b.block === Blocks.unloader && (b.sortItem === Items.scrap || b.sortItem === null)){
                    this.kill();
                }
            }
        }
    }
});
