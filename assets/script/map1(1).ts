// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class map1 extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    @property(cc.Prefab) 
    readonly chi: cc.Prefab = null;

    @property(cc.Prefab) 
    readonly fire: cc.Prefab = null;

    @property(cc.Prefab) 
    readonly fo: cc.Prefab = null;

    @property(cc.Prefab) 
    readonly money: cc.Prefab = null;

    @property(cc.Prefab) 
    readonly purify: cc.Prefab = null;

    @property(cc.Prefab) 
    readonly steel: cc.Prefab = null;

    @property(cc.Prefab) 
    readonly blood: cc.Prefab = null;

    @property(cc.Prefab) 
    readonly thunder: cc.Prefab = null;

    @property(cc.Prefab) 
    readonly tree: cc.Prefab = null;


    //=============================================
    @property(cc.Prefab) //購買烈酒18番
    readonly pre_alcohol: cc.Prefab = null;

    @property(cc.Prefab) //購買暴怒
    readonly pre_angry: cc.Prefab = null;

    @property(cc.Prefab) //購買咖哩
    readonly pre_curry: cc.Prefab = null;

    @property(cc.Prefab) //購買御守
    readonly pre_deffend: cc.Prefab = null;

    @property(cc.Prefab) //購買神仙丸
    readonly pre_gold: cc.Prefab = null;

    @property(cc.Prefab) //購買魔水
    readonly pre_magic: cc.Prefab = null;

    @property(cc.Prefab) //購買9字
    readonly pre_nine: cc.Prefab = null;

    @property(cc.Prefab) //購買飯糰
    readonly pre_rice: cc.Prefab = null;

    @property(cc.Prefab) //購買兵糧丸
    readonly pre_soldier: cc.Prefab = null;

    @property(cc.Prefab) //購買萬用
    readonly pre_thousand: cc.Prefab = null;

    @property(cc.Prefab) //購買神水
    readonly pre_water: cc.Prefab = null;

    @property(cc.Prefab) //購買人參
    readonly pre_yellow: cc.Prefab = null;

    //=============================================

    @property(cc.Prefab) 
    readonly p_bitter: cc.Prefab = null;

    @property(cc.Prefab) 
    readonly p_dx: cc.Prefab = null;

    @property(cc.Prefab) 
    readonly p_nightmare: cc.Prefab = null;

    @property(cc.Prefab) 
    readonly p_windsword: cc.Prefab = null;




    @property({type:cc.AudioClip})
        winsound: cc.AudioClip = null;

    @property({type:cc.AudioClip})
        lose: cc.AudioClip = null;


    private x:number;
    private y:number;

    get_coordinateX(x) { //coco座標 換網格座標 (x)
        return Math.floor(Number(x-60) /68.75);
    }
    get_coordinateY(y) { //coco座標 換網格座標 (y)
        return Math.floor(Number(y-255) /65.55);
    }

    //========測試中=======================================================
    win() {
        cc.audioEngine.playEffect(this.winsound, false);
        cc.find("Canvas/win").opacity = 255;
        cc.find("Canvas/money").getComponent(cc.Label).string = String(Number(cc.find("Canvas/money").getComponent(cc.Label).string) + 5000);

        var loginUser = firebase.auth().currentUser;
        firebase.database().ref('users/' + loginUser.uid).update({
            money: cc.find("Canvas/money").getComponent(cc.Label).string,
        }).catch(function(error){
        });

        this.scheduleOnce(function(){cc.director.loadScene("hall");},8);
    }

    loseing() {
        cc.audioEngine.playEffect(this.lose, false);
        cc.find("Canvas/lose").opacity = 255;

        this.scheduleOnce(function(){cc.director.loadScene("hall");},3);
    }

    //========測試中=======================================================


    start () {

        this.node.on(cc.Node.EventType.MOUSE_DOWN, function(event){
            this.x = this.get_coordinateX(event.getLocationX());
            this.y = this.get_coordinateY(event.getLocationY());
            cc.log( this.x );
            cc.log( this.y );
        }, this);


        var user = firebase.auth().currentUser;
        var ref2 = firebase.database().ref('/users/' + user.uid);

        ref2.once('value').then((snapshot) => {
            cc.find("Canvas/info/r1").getComponent(cc.Label).string = snapshot.val().r1;
            cc.find("Canvas/info/r2").getComponent(cc.Label).string = snapshot.val().r2;
            cc.find("Canvas/info/r3").getComponent(cc.Label).string = snapshot.val().r3;
            cc.find("Canvas/info/r4").getComponent(cc.Label).string = snapshot.val().r4;
            cc.find("Canvas/info/r5").getComponent(cc.Label).string = snapshot.val().r5;
            cc.find("Canvas/info/r6").getComponent(cc.Label).string = snapshot.val().r6;

            cc.find("Canvas/info/i1").getComponent(cc.Label).string = snapshot.val().i1;
            cc.find("Canvas/info/i2").getComponent(cc.Label).string = snapshot.val().i2;
            cc.find("Canvas/info/i3").getComponent(cc.Label).string = snapshot.val().i3;
            cc.find("Canvas/info/i4").getComponent(cc.Label).string = snapshot.val().i4;
            cc.find("Canvas/info/i5").getComponent(cc.Label).string = snapshot.val().i5;
            cc.find("Canvas/info/i6").getComponent(cc.Label).string = snapshot.val().i6;
            cc.find("Canvas/info/i7").getComponent(cc.Label).string = snapshot.val().i7;
            cc.find("Canvas/info/i8").getComponent(cc.Label).string = snapshot.val().i8;
            cc.find("Canvas/info/i9").getComponent(cc.Label).string = snapshot.val().i9;
            cc.find("Canvas/info/i10").getComponent(cc.Label).string = snapshot.val().i10;
            cc.find("Canvas/info/i11").getComponent(cc.Label).string = snapshot.val().i11;
            cc.find("Canvas/info/i12").getComponent(cc.Label).string = snapshot.val().i12;


            cc.find("Canvas/money").getComponent(cc.Label).string = snapshot.val().money;
            cc.find("Canvas/info/curweapon").getComponent(cc.Label).string = snapshot.val().curweapon;

            
        })
        .then(()=>{
            if(cc.find("Canvas/info/r1").getComponent(cc.Label).string != "") {
                this.put_on("1",cc.find("Canvas/info/r1").getComponent(cc.Label).string);
            }
            if(cc.find("Canvas/info/r2").getComponent(cc.Label).string != "") {
                this.put_on("2",cc.find("Canvas/info/r2").getComponent(cc.Label).string);
            }
            if(cc.find("Canvas/info/r3").getComponent(cc.Label).string != "") {
                this.put_on("3",cc.find("Canvas/info/r3").getComponent(cc.Label).string);
            }
            if(cc.find("Canvas/info/r4").getComponent(cc.Label).string != "") {
                this.put_on("4",cc.find("Canvas/info/r4").getComponent(cc.Label).string);
            }
            if(cc.find("Canvas/info/r5").getComponent(cc.Label).string != "") {
                this.put_on("5",cc.find("Canvas/info/r5").getComponent(cc.Label).string);
            }
            if(cc.find("Canvas/info/r6").getComponent(cc.Label).string != "") {
                this.put_on("6",cc.find("Canvas/info/r6").getComponent(cc.Label).string);
            }



            if(cc.find("Canvas/info/i1").getComponent(cc.Label).string != "") {
                this.put_on2("1",cc.find("Canvas/info/i1").getComponent(cc.Label).string);
            }
            if(cc.find("Canvas/info/i2").getComponent(cc.Label).string != "") {
                this.put_on2("2",cc.find("Canvas/info/i2").getComponent(cc.Label).string);
            }
            if(cc.find("Canvas/info/i3").getComponent(cc.Label).string != "") {
                this.put_on2("3",cc.find("Canvas/info/i3").getComponent(cc.Label).string);
            }
            if(cc.find("Canvas/info/i4").getComponent(cc.Label).string != "") {
                this.put_on2("4",cc.find("Canvas/info/i4").getComponent(cc.Label).string);
            }
            if(cc.find("Canvas/info/i5").getComponent(cc.Label).string != "") {
                this.put_on2("5",cc.find("Canvas/info/i5").getComponent(cc.Label).string);
            }
            if(cc.find("Canvas/info/i6").getComponent(cc.Label).string != "") {
                this.put_on2("6",cc.find("Canvas/info/i6").getComponent(cc.Label).string);
            }
            if(cc.find("Canvas/info/i7").getComponent(cc.Label).string != "") {
                this.put_on2("7",cc.find("Canvas/info/i7").getComponent(cc.Label).string);
            }
            if(cc.find("Canvas/info/i8").getComponent(cc.Label).string != "") {
                this.put_on2("8",cc.find("Canvas/info/i8").getComponent(cc.Label).string);
            }
            if(cc.find("Canvas/info/i9").getComponent(cc.Label).string != "") {
                this.put_on2("9",cc.find("Canvas/info/i9").getComponent(cc.Label).string);
            }
            if(cc.find("Canvas/info/i10").getComponent(cc.Label).string != "") {
                this.put_on2("10",cc.find("Canvas/info/i10").getComponent(cc.Label).string);
            }
            if(cc.find("Canvas/info/i11").getComponent(cc.Label).string != "") {
                this.put_on2("11",cc.find("Canvas/info/i11").getComponent(cc.Label).string);
            }
            if(cc.find("Canvas/info/i12").getComponent(cc.Label).string != "") {
                this.put_on2("12",cc.find("Canvas/info/i12").getComponent(cc.Label).string);
            }



            //cc.find("Canvas/info/curweapon").getComponent(cc.Label).string
            let inserts;
            if(cc.find("Canvas/info/curweapon").getComponent(cc.Label).string == "bitter") {
                inserts = cc.instantiate(this.p_bitter);
            }
            else if(cc.find("Canvas/info/curweapon").getComponent(cc.Label).string == "DX") {
                inserts = cc.instantiate(this.p_dx);
            }
            else if(cc.find("Canvas/info/curweapon").getComponent(cc.Label).string == "windsword") {
                inserts = cc.instantiate(this.p_windsword);
            }
            else if(cc.find("Canvas/info/curweapon").getComponent(cc.Label).string == "nightmare") {
                inserts = cc.instantiate(this.p_nightmare);
            }
            inserts.parent = cc.find("Canvas/map1");
            inserts.x += 747;
            inserts.y += 507;
            
            
        })
    }

    put_on2(x: string,which: string) {
        let inserting;
        if(which == "alcohol") {
            inserting = cc.instantiate(this.pre_alcohol);
        }
        else if(which == "yellow") {
            inserting = cc.instantiate(this.pre_yellow);
        }
        else if(which == "curry") {
            inserting = cc.instantiate(this.pre_curry);
        }
        else if(which == "rice") {
            inserting = cc.instantiate(this.pre_rice);
        }
        else if(which == "magic") {
            inserting = cc.instantiate(this.pre_magic);
        }
        else if(which == "gold") {
            inserting = cc.instantiate(this.pre_gold);
        }
        else if(which == "nine") {
            inserting = cc.instantiate(this.pre_nine);
        }
        else if(which == "thousand") {
            inserting = cc.instantiate(this.pre_thousand);
        }
        else if(which == "water") {
            inserting = cc.instantiate(this.pre_water);
        }
        else if(which == "soldier") {
            inserting = cc.instantiate(this.pre_soldier);
        }
        else if(which == "deffend") {
            inserting = cc.instantiate(this.pre_deffend);
        }
        else if(which == "angry") {
            inserting = cc.instantiate(this.pre_angry);
        }
        inserting.parent = cc.find("Canvas/map1");
        if(x == "1") {
            inserting.x = 52.662+747;
        }
        else if(x == "2") {
            inserting.x = 110.879+747;
        }
        else if(x == "3") {
            inserting.x = 169.096+747;
        }
        else if(x == "4") {
            inserting.x = 226.603+747;
        }
        else if(x == "5") {
            inserting.x = 284.009+747;
        }
        else if(x == "6") {
            inserting.x = 342.028+747;
        }
        else if(x == "7") {
            inserting.x = 399.873+747;
        }
        else if(x == "8") {
            inserting.x = 457.532+747;
        }
        else if(x == "9") {
            inserting.x = 517.532+747;
        }
        else if(x == "10") {
            inserting.x = 573.372+747;
        }
        else if(x == "11") {
            inserting.x = 632.076+747;
        }
        else if(x == "12") {
            inserting.x = 689.348+747;
        }
        inserting.y = -410.116+507;
    }

    put_on(x: string,which: string) {
        let inserting;
        if(which == "1") {
            inserting = cc.instantiate(this.chi);
        }
        else if(which == "2") {
            inserting = cc.instantiate(this.thunder);
        }
        else if(which == "3") {
            inserting = cc.instantiate(this.fire);
        }
        else if(which == "4") {
            inserting = cc.instantiate(this.tree);
        }
        else if(which == "5") {
            inserting = cc.instantiate(this.steel);
        }
        else if(which == "6") {
            inserting = cc.instantiate(this.blood);
        }
        else if(which == "7") {
            inserting = cc.instantiate(this.purify);
        }
        else if(which == "8") {
            inserting = cc.instantiate(this.money);
        }
        else if(which == "9") {
            inserting = cc.instantiate(this.fo);
        }

        inserting.parent = cc.find("Canvas/map1");
        if(x == "1") {
            inserting.x = 79.924+747;
        }
        else if(x == "2") {
            inserting.x = 195.56+747;
        }
        else if(x == "3") {
            inserting.x = 313.082+747;
        }
        else if(x == "4") {
            inserting.x = 428.913+747;
        }
        else if(x == "5") {
            inserting.x = 547.307+747;
        }
        else if(x == "6") {
            inserting.x = 664.744+747;
        }
        inserting.y = -349.159+507;
        
    }

    

    // update (dt) {}
}
