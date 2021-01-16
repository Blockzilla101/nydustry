// "cryofluid is extracted from titanium without water"
let give;

give = (mixer) => {
    mixer.liquids.add(Liquids.water, 1);
};

module.exports = {
    give: give
};
