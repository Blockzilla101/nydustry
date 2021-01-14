// "separators contain free slag",  TODO "separators that are clogged make titanium"
Blocks.separator.buildType = () => extend(Separator.SeparatorBuild, Blocks.separator, {
    updateTile(){
        this.super$updateTile();
        
        this.liquids.add(Liquids.slag, 1);
    }
});
