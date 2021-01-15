Events.on(EventType.UnitDrownEvent, cons(e => {
    var deepWater = new Seq()
    var unit = e.unit

    if(unit.stack.amount === 0) return

    for(var x = 0; x < Vars.world.width(); x++){
        for(var y = 0; y < Vars.world.height(); y++){
            var t = Vars.world.tile(x, y)
            if(t.floor().drownTime > 0 && unit.dst(t) <= Vars.tilesize * 8) deepWater.add(t)
        }
    }

    while(unit.stack.amount-- > 0){
        var deep = Geometry.findClosest(unit.x, unit.y, deepWater)
        if(deep != null){
            deepWater.remove(deep)
            deep.setFloor(Blocks.sandWater.asFloor())
        }
    }

    Vars.renderer.blocks.floor.clearTiles()
}))
