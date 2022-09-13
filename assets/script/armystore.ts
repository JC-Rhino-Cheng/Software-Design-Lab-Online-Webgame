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
export default class armystore extends cc.Component {

    @property({type:cc.AudioClip})
        buying: cc.AudioClip = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        var user = firebase.auth().currentUser;
        var ref2 = firebase.database().ref('/users/' + user.uid);

        ref2.once('value').then((snapshot) => {
            cc.find("armystore/mymoney2").getComponent(cc.Label).string = snapshot.val().money;
        })
    }

    back_to_hall () {
        cc.director.loadScene("hall");
    }

    buy_windsword () {
        cc.audioEngine.playEffect(this.buying, false);
        if(Number(cc.find("armystore/mymoney2").getComponent(cc.Label).string) - 100000 >= 0) {
            cc.find("armystore/mymoney2").getComponent(cc.Label).string = String( Number(cc.find("armystore/mymoney2").getComponent(cc.Label).string) - 100000 );
            
            var loginUser = firebase.auth().currentUser;
            firebase.database().ref('users/' + loginUser.uid).update({
                windsword: "Y",
                money: cc.find("armystore/mymoney2").getComponent(cc.Label).string
            }).catch(function(error){
            });
        }
        else {
            //你錢不構!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        }
    }

    buy_DX () {
        cc.audioEngine.playEffect(this.buying, false);
        if(Number(cc.find("armystore/mymoney2").getComponent(cc.Label).string) - 150000 >= 0) {
            cc.find("armystore/mymoney2").getComponent(cc.Label).string = String( Number(cc.find("armystore/mymoney2").getComponent(cc.Label).string) - 150000 );
            
            var loginUser = firebase.auth().currentUser;
            firebase.database().ref('users/' + loginUser.uid).update({
                DX: "Y",
                money: cc.find("armystore/mymoney2").getComponent(cc.Label).string
            }).catch(function(error){
            });
        }
        else {
            //你錢不構!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        }
    }

    buy_nightmare () {
        cc.audioEngine.playEffect(this.buying, false);
        if(Number(cc.find("armystore/mymoney2").getComponent(cc.Label).string) - 200000 >= 0) {
            cc.find("armystore/mymoney2").getComponent(cc.Label).string = String( Number(cc.find("armystore/mymoney2").getComponent(cc.Label).string) - 200000 );
            
            var loginUser = firebase.auth().currentUser;
            firebase.database().ref('users/' + loginUser.uid).update({
                nightmare: "Y",
                money: cc.find("armystore/mymoney2").getComponent(cc.Label).string
            }).catch(function(error){
            });
        }
        else {
            //你錢不構!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        }   
    }

    // update (dt) {}
}
