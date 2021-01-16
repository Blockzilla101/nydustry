// "the pyratite mixer contains free lead"
let give;
let explode;

give = (mixer) => {
    if(mixer.items.get(Items.coal) >= 1 && mixer.items.get(Items.sand) >= 2 && mixer.items.get(Items.pyratite) === 0 && mixer.items.get(Items.lead) < 2){
        if(mixer.power.status === 1 && mixer.enabled){
            mixer.items.add(Items.lead, 1);
        }
    }
};

explode = (mixer) => {
    if(mixer.items.get(Items.lead) > 0){
        mixer.proximity.each(b => {
            if(b !== null && b.block === Blocks.unloader && (b.sortItem === Items.lead || b.sortItem === null)){
                mixer.kill();
            }
        });
    }
};

module.exports = {
    give: give,
    explode: explode
};
