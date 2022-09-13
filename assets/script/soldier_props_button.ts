
const {ccclass, property} = cc._decorator;

@ccclass
export default class soldier_props_button extends cc.Component {

    @property(cc.Prefab)
    SoldierPropsPrefab: cc.Prefab = null;

    update(){
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.use_soldier_props, this);
    }

    use_soldier_props(){
        this.prefab_soldier_props();
        this.node.destroy();
    }

    prefab_soldier_props(){
        var player_x =  cc.find("Canvas/map1/player").x;
        var player_y =  cc.find("Canvas/map1/player").y;
        var SoldierPropsPrefab = cc.instantiate(this.SoldierPropsPrefab);
        SoldierPropsPrefab.x = player_x + 5 -747;
        SoldierPropsPrefab.y = player_y + 20 -507;
        cc.find('Canvas').addChild(SoldierPropsPrefab);
    }


}
