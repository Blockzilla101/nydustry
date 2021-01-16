let listen;
let explosion;

listen = (tile, func) => {
    let update = () => {
        if(tile.build === null){
            Events.remove(Trigger.update.class, update);
            return;
        };
        func(tile);
    };
    Events.on(Trigger.update.class, update);
};

module.exports = {
    listen: listen
}
