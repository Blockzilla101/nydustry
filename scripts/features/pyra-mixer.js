// "the pyratite mixer contains free lead"
Blocks.pyratiteMixer.buildType = () => extend(GenericCrafter.GenericCrafterBuild, Blocks.pyratiteMixer, {
    updateTile(){
        this.super$updateTile();
        
        if(this.items.get(Items.coal) >= 1 && this.items.get(Items.sand) >= 2 && this.power.status === 1){
            if(this.items.get(Items.lead) < 2) this.items.add(Items.lead, 1);
        }
        
        let around = [
            this.nearby(-1, 0),
            this.nearby(0, -1),
            this.nearby(1, -1),
            this.nearby(2, 0),
            this.nearby(2, 1),
            this.nearby(1, 2),
            this.nearby(0, 2),
            this.nearby(-1, 1)
        ];
        if(this.items.get(Items.lead) > 0){
            for(var b of around){
                if(b !== null && b.block === Blocks.unloader && (b.sortItem === Items.lead || b.sortItem === null)){
                    this.kill();
                }
            }
        }
    }
});
