
const {ccclass, property} = cc._decorator;

@ccclass
export default class gold_props_button extends cc.Component {

    @property(cc.Prefab)
    GoldPropsPrefab: cc.Prefab = null;

    update(){
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.use_gold_props, this);
    }

    use_gold_props(){
        this.prefab_gold_props();
        this.node.destroy();
    }

    prefab_gold_props(){
        var player_x =  cc.find("Canvas/map1/player").x;
        var player_y =  cc.find("Canvas/map1/player").y;
        var GoldPropsPrefab = cc.instantiate(this.GoldPropsPrefab);
        GoldPropsPrefab.x = player_x + 2 -747;
        GoldPropsPrefab.y = player_y + 60 -507;
        cc.find('Canvas').addChild(GoldPropsPrefab);
    }


}
