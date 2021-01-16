// "separators contain free slag", "separators that are clogged make titanium"
let give;
let produce;

give = (sep) => {
    sep.liquids.add(Liquids.slag, 1);
};

produce = (sep) => {
    if(sep.items.total() === 10){
        if(sep.items.get(Items.copper) >= 2){
            sep.items.remove(Items.copper, 2);
            sep.items.add(Items.lead, 1);
        };
        if(sep.items.get(Items.lead) >= 2){
            sep.items.remove(Items.lead, 2);
            sep.items.add(Items.graphite, 1);
        };
        if(sep.items.get(Items.graphite) >= 2){
            sep.items.remove(Items.graphite, 2);
            sep.items.add(Items.titanium, 1);
        };
    };
};

module.exports = {
    give: give,
    produce: produce
};
