
const {ccclass, property} = cc._decorator;

@ccclass
export default class magic_props_button extends cc.Component {

    @property(cc.Prefab)
    MagicPropsPrefab: cc.Prefab = null;

    update(){
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.use_magic_props, this);
    }

    use_magic_props(){
        this.prefab_magic_props();
        this.node.destroy();
    }

    prefab_magic_props(){
        var player_x =  cc.find("Canvas/map1/player").x;
        var player_y =  cc.find("Canvas/map1/player").y;
        var MagicPropsPrefab = cc.instantiate(this.MagicPropsPrefab);
        MagicPropsPrefab.x = player_x + 1 -747;
        MagicPropsPrefab.y = player_y + 60 -507;
        cc.find('Canvas').addChild(MagicPropsPrefab);
    }


}
