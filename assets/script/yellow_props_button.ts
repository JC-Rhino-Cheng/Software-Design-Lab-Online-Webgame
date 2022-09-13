
const {ccclass, property} = cc._decorator;

@ccclass
export default class yellow_props_button extends cc.Component {

    @property(cc.Prefab)
    YellowPropsPrefab: cc.Prefab = null;

    update(){
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.use_yellow_props, this);
    }

    use_yellow_props(){
        this.prefab_yellow_props();
        this.node.destroy();
    }

    prefab_yellow_props(){
        var player_x =  cc.find("Canvas/map1/player").x;
        var player_y =  cc.find("Canvas/map1/player").y;
        var YellowPropsPrefab = cc.instantiate(this.YellowPropsPrefab);
        YellowPropsPrefab.x = player_x + 7 -747;
        YellowPropsPrefab.y = player_y + 30 -507;
        cc.find('Canvas').addChild(YellowPropsPrefab);
    }


}
