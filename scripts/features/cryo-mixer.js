// "cryofluid is extracted from titanium without water"
Blocks.cryofluidMixer.buildType = () => extend(LiquidConverter.LiquidConverterBuild, Blocks.cryofluidMixer, {
    updateTile(){
        this.super$updateTile();
        
        this.liquids.add(Liquids.water, 1);
    }
});
