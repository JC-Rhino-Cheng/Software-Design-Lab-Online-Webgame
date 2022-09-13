
const {ccclass, property} = cc._decorator;

@ccclass
export default class nine_props_button extends cc.Component {

    @property(cc.Prefab)
    NinePropsPrefab: cc.Prefab = null;

    update(){
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.use_nine_props, this);
    }

    use_nine_props(){
        this.prefab_nine_props();
        this.node.destroy();
    }

    prefab_nine_props(){
        var player_x =  cc.find("Canvas/map1/player").x;
        var player_y =  cc.find("Canvas/map1/player").y;
        var NinePropsPrefab = cc.instantiate(this.NinePropsPrefab);
        NinePropsPrefab.x = player_x - 5 -747;
        NinePropsPrefab.y = player_y + 10 -507;
        cc.find('Canvas').addChild(NinePropsPrefab);
    }


}
