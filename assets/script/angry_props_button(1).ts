
const {ccclass, property} = cc._decorator;

@ccclass
export default class angry_props_button extends cc.Component {

    @property(cc.Prefab)
    AngryPropsPrefab: cc.Prefab = null;

    update(){
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.use_angry_props, this);
    }

    use_angry_props(){
        this.prefab_angry_props();
        this.node.destroy();
    }

    prefab_angry_props(){
        var player_x =  cc.find("Canvas/map1/player").x;
        var player_y =  cc.find("Canvas/map1/player").y;
        var AngryPropsPrefab = cc.instantiate(this.AngryPropsPrefab);
        AngryPropsPrefab.x = player_x - 5 - 747;
        AngryPropsPrefab.y = player_y + 5 - 507;
        cc.find('Canvas').addChild(AngryPropsPrefab);
    }


}
