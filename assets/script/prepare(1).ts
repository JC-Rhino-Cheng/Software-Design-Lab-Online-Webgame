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
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    @property({type:cc.AudioClip})
        cancel: cc.AudioClip = null;

    @property({type:cc.AudioClip})
        pick: cc.AudioClip = null;

    @property({type:cc.AudioClip})
        intro: cc.AudioClip = null;



    private count:number = 0;

    @property(cc.Prefab) 
    readonly one: cc.Prefab = null;

    @property(cc.Prefab) 
    readonly two: cc.Prefab = null;

    @property(cc.Prefab) 
    readonly three: cc.Prefab = null;

    @property(cc.Prefab) 
    readonly four: cc.Prefab = null;

    @property(cc.Prefab) 
    readonly five: cc.Prefab = null;

    @property(cc.Prefab) 
    readonly six: cc.Prefab = null;

    @property(cc.Prefab) 
    readonly seven: cc.Prefab = null;

    @property(cc.Prefab) 
    readonly eight: cc.Prefab = null;

    @property(cc.Prefab) 
    readonly nine: cc.Prefab = null;

    @property(cc.Prefab) 
    readonly frame: cc.Prefab = null;

    // onLoad () {}

    one_push () { //

        this.count += 1;
        if(this.count < 7) {

            cc.audioEngine.playEffect(this.pick, false);

            cc.find("Canvas/prepare/1").getComponent(cc.Button).interactable = false; //

            let inserting;
            inserting = cc.instantiate(this.one); //
            if(this.count == 1) {
                inserting.x = 500.056;
                inserting.y = 524.918;
            }
            else if(this.count == 2) {
                inserting.x = 500.056;
                inserting.y = 458.199;
            }
            else if(this.count == 3) {
                inserting.x = 500.056;
                inserting.y = 391.48;
            }
            else if(this.count == 4) {
                inserting.x = 500.056;
                inserting.y = 323.685;
            }
            else if(this.count == 5) {
                inserting.x = 500.056;
                inserting.y = 256.381;
            }
            else if(this.count == 6) {
                inserting.x = 500.056;
                inserting.y = 189.078;
            }
            inserting.parent = cc.find("Canvas/prepare/cur");

            cc.find("Canvas/prepare/info/r" + String(this.count)).getComponent(cc.Label).string = "1"; //
        }
    }

    two_push () { //

        this.count += 1;
        if(this.count < 7) {

            cc.audioEngine.playEffect(this.pick, false);

            cc.find("Canvas/prepare/2").getComponent(cc.Button).interactable = false; //

            let inserting;
            inserting = cc.instantiate(this.two); //
            if(this.count == 1) {
                inserting.x = 500.056;
                inserting.y = 524.918;
            }
            else if(this.count == 2) {
                inserting.x = 500.056;
                inserting.y = 458.199;
            }
            else if(this.count == 3) {
                inserting.x = 500.056;
                inserting.y = 391.48;
            }
            else if(this.count == 4) {
                inserting.x = 500.056;
                inserting.y = 323.685;
            }
            else if(this.count == 5) {
                inserting.x = 500.056;
                inserting.y = 256.381;
            }
            else if(this.count == 6) {
                inserting.x = 500.056;
                inserting.y = 189.078;
            }
            inserting.parent = cc.find("Canvas/prepare/cur");

            cc.find("Canvas/prepare/info/r" + String(this.count)).getComponent(cc.Label).string = "2"; //
        }
    }

    three_push () { //

        this.count += 1;
        if(this.count < 7) {

            cc.audioEngine.playEffect(this.pick, false);

            cc.find("Canvas/prepare/3").getComponent(cc.Button).interactable = false; //

            let inserting;
            inserting = cc.instantiate(this.three); //
            if(this.count == 1) {
                inserting.x = 500.056;
                inserting.y = 524.918;
            }
            else if(this.count == 2) {
                inserting.x = 500.056;
                inserting.y = 458.199;
            }
            else if(this.count == 3) {
                inserting.x = 500.056;
                inserting.y = 391.48;
            }
            else if(this.count == 4) {
                inserting.x = 500.056;
                inserting.y = 323.685;
            }
            else if(this.count == 5) {
                inserting.x = 500.056;
                inserting.y = 256.381;
            }
            else if(this.count == 6) {
                inserting.x = 500.056;
                inserting.y = 189.078;
            }
            inserting.parent = cc.find("Canvas/prepare/cur");

            cc.find("Canvas/prepare/info/r" + String(this.count)).getComponent(cc.Label).string = "3"; //
        }
    }

    four_push () { //

        this.count += 1;
        if(this.count < 7) {

            cc.audioEngine.playEffect(this.pick, false);

            cc.find("Canvas/prepare/4").getComponent(cc.Button).interactable = false; //

            let inserting;
            inserting = cc.instantiate(this.four); //
            if(this.count == 1) {
                inserting.x = 500.056;
                inserting.y = 524.918;
            }
            else if(this.count == 2) {
                inserting.x = 500.056;
                inserting.y = 458.199;
            }
            else if(this.count == 3) {
                inserting.x = 500.056;
                inserting.y = 391.48;
            }
            else if(this.count == 4) {
                inserting.x = 500.056;
                inserting.y = 323.685;
            }
            else if(this.count == 5) {
                inserting.x = 500.056;
                inserting.y = 256.381;
            }
            else if(this.count == 6) {
                inserting.x = 500.056;
                inserting.y = 189.078;
            }
            inserting.parent = cc.find("Canvas/prepare/cur");

            cc.find("Canvas/prepare/info/r" + String(this.count)).getComponent(cc.Label).string = "4"; //
        }
    }

    five_push () { //

        this.count += 1;
        if(this.count < 7) {

            cc.audioEngine.playEffect(this.pick, false);

            cc.find("Canvas/prepare/5").getComponent(cc.Button).interactable = false; //

            let inserting;
            inserting = cc.instantiate(this.five); //
            if(this.count == 1) {
                inserting.x = 500.056;
                inserting.y = 524.918;
            }
            else if(this.count == 2) {
                inserting.x = 500.056;
                inserting.y = 458.199;
            }
            else if(this.count == 3) {
                inserting.x = 500.056;
                inserting.y = 391.48;
            }
            else if(this.count == 4) {
                inserting.x = 500.056;
                inserting.y = 323.685;
            }
            else if(this.count == 5) {
                inserting.x = 500.056;
                inserting.y = 256.381;
            }
            else if(this.count == 6) {
                inserting.x = 500.056;
                inserting.y = 189.078;
            }
            inserting.parent = cc.find("Canvas/prepare/cur");

            cc.find("Canvas/prepare/info/r" + String(this.count)).getComponent(cc.Label).string = "5"; //
        }
    }

    six_push () { //

        this.count += 1;
        if(this.count < 7) {

            cc.audioEngine.playEffect(this.pick, false);

            cc.find("Canvas/prepare/6").getComponent(cc.Button).interactable = false; //

            let inserting;
            inserting = cc.instantiate(this.six); //
            if(this.count == 1) {
                inserting.x = 500.056;
                inserting.y = 524.918;
            }
            else if(this.count == 2) {
                inserting.x = 500.056;
                inserting.y = 458.199;
            }
            else if(this.count == 3) {
                inserting.x = 500.056;
                inserting.y = 391.48;
            }
            else if(this.count == 4) {
                inserting.x = 500.056;
                inserting.y = 323.685;
            }
            else if(this.count == 5) {
                inserting.x = 500.056;
                inserting.y = 256.381;
            }
            else if(this.count == 6) {
                inserting.x = 500.056;
                inserting.y = 189.078;
            }
            inserting.parent = cc.find("Canvas/prepare/cur");

            cc.find("Canvas/prepare/info/r" + String(this.count)).getComponent(cc.Label).string = "6"; //
        }
    }

    seven_push () { //

        this.count += 1;
        if(this.count < 7) {

            cc.audioEngine.playEffect(this.pick, false);

            cc.find("Canvas/prepare/7").getComponent(cc.Button).interactable = false; //

            let inserting;
            inserting = cc.instantiate(this.seven); //
            if(this.count == 1) {
                inserting.x = 500.056;
                inserting.y = 524.918;
            }
            else if(this.count == 2) {
                inserting.x = 500.056;
                inserting.y = 458.199;
            }
            else if(this.count == 3) {
                inserting.x = 500.056;
                inserting.y = 391.48;
            }
            else if(this.count == 4) {
                inserting.x = 500.056;
                inserting.y = 323.685;
            }
            else if(this.count == 5) {
                inserting.x = 500.056;
                inserting.y = 256.381;
            }
            else if(this.count == 6) {
                inserting.x = 500.056;
                inserting.y = 189.078;
            }
            inserting.parent = cc.find("Canvas/prepare/cur");

            cc.find("Canvas/prepare/info/r" + String(this.count)).getComponent(cc.Label).string = "7"; //
        }
    }

    eight_push () { //

        this.count += 1;
        if(this.count < 7) {

            cc.audioEngine.playEffect(this.pick, false);

            cc.find("Canvas/prepare/8").getComponent(cc.Button).interactable = false; //

            let inserting;
            inserting = cc.instantiate(this.eight); //
            if(this.count == 1) {
                inserting.x = 500.056;
                inserting.y = 524.918;
            }
            else if(this.count == 2) {
                inserting.x = 500.056;
                inserting.y = 458.199;
            }
            else if(this.count == 3) {
                inserting.x = 500.056;
                inserting.y = 391.48;
            }
            else if(this.count == 4) {
                inserting.x = 500.056;
                inserting.y = 323.685;
            }
            else if(this.count == 5) {
                inserting.x = 500.056;
                inserting.y = 256.381;
            }
            else if(this.count == 6) {
                inserting.x = 500.056;
                inserting.y = 189.078;
            }
            inserting.parent = cc.find("Canvas/prepare/cur");

            cc.find("Canvas/prepare/info/r" + String(this.count)).getComponent(cc.Label).string = "8"; //
        }
    }

    nine_push () { //

        this.count += 1;
        if(this.count < 7) {

            cc.audioEngine.playEffect(this.pick, false);

            cc.find("Canvas/prepare/9").getComponent(cc.Button).interactable = false; //

            let inserting;
            inserting = cc.instantiate(this.nine); //
            if(this.count == 1) {
                inserting.x = 500.056;
                inserting.y = 524.918;
            }
            else if(this.count == 2) {
                inserting.x = 500.056;
                inserting.y = 458.199;
            }
            else if(this.count == 3) {
                inserting.x = 500.056;
                inserting.y = 391.48;
            }
            else if(this.count == 4) {
                inserting.x = 500.056;
                inserting.y = 323.685;
            }
            else if(this.count == 5) {
                inserting.x = 500.056;
                inserting.y = 256.381;
            }
            else if(this.count == 6) {
                inserting.x = 500.056;
                inserting.y = 189.078;
            }
            inserting.parent = cc.find("Canvas/prepare/cur");

            cc.find("Canvas/prepare/info/r" + String(this.count)).getComponent(cc.Label).string = "9"; //
        }
    }

    redo () {

        cc.audioEngine.playEffect(this.cancel, false);

        cc.find("Canvas/prepare/cur").removeAllChildren();
        cc.find("Canvas/prepare/info/r1").getComponent(cc.Label).string = "";
        cc.find("Canvas/prepare/info/r2").getComponent(cc.Label).string = "";
        cc.find("Canvas/prepare/info/r3").getComponent(cc.Label).string = "";
        cc.find("Canvas/prepare/info/r4").getComponent(cc.Label).string = "";
        cc.find("Canvas/prepare/info/r5").getComponent(cc.Label).string = "";
        cc.find("Canvas/prepare/info/r6").getComponent(cc.Label).string = "";

        cc.find("Canvas/prepare/1").getComponent(cc.Button).interactable = true; //
        cc.find("Canvas/prepare/2").getComponent(cc.Button).interactable = true; //
        cc.find("Canvas/prepare/3").getComponent(cc.Button).interactable = true; //
        cc.find("Canvas/prepare/4").getComponent(cc.Button).interactable = true; //
        cc.find("Canvas/prepare/5").getComponent(cc.Button).interactable = true; //
        cc.find("Canvas/prepare/6").getComponent(cc.Button).interactable = true; //
        cc.find("Canvas/prepare/7").getComponent(cc.Button).interactable = true; //
        cc.find("Canvas/prepare/8").getComponent(cc.Button).interactable = true; //
        cc.find("Canvas/prepare/9").getComponent(cc.Button).interactable = true; //

        this.count = 0;
    }

    give_me_item(x: string) {
        if(cc.find("Canvas/prepare/info/r"+x).getComponent(cc.Label).string == "1") {
            this.one_push();
        }
        else if(cc.find("Canvas/prepare/info/r"+x).getComponent(cc.Label).string == "2") {
            this.two_push();
        }
        else if(cc.find("Canvas/prepare/info/r"+x).getComponent(cc.Label).string == "3") {
            this.three_push();
        }
        else if(cc.find("Canvas/prepare/info/r"+x).getComponent(cc.Label).string == "4") {
            this.four_push();
        }
        else if(cc.find("Canvas/prepare/info/r"+x).getComponent(cc.Label).string == "5") {
            this.five_push();
        }
        else if(cc.find("Canvas/prepare/info/r"+x).getComponent(cc.Label).string == "6") {
            this.six_push();
        }
        else if(cc.find("Canvas/prepare/info/r"+x).getComponent(cc.Label).string == "7") {
            this.seven_push();
        }
        else if(cc.find("Canvas/prepare/info/r"+x).getComponent(cc.Label).string == "8") {
            this.eight_push();
        }
        else if(cc.find("Canvas/prepare/info/r"+x).getComponent(cc.Label).string == "9") {
            this.nine_push();
        }
    }

    prepare_done () {
        cc.audioEngine.playEffect(this.intro, false);

        var loginUser = firebase.auth().currentUser;
        firebase.database().ref('users/' + loginUser.uid).update({
            r1: cc.find("Canvas/prepare/info/r1").getComponent(cc.Label).string,
            r2: cc.find("Canvas/prepare/info/r2").getComponent(cc.Label).string,
            r3: cc.find("Canvas/prepare/info/r3").getComponent(cc.Label).string,
            r4: cc.find("Canvas/prepare/info/r4").getComponent(cc.Label).string,
            r5: cc.find("Canvas/prepare/info/r5").getComponent(cc.Label).string,
            r6: cc.find("Canvas/prepare/info/r6").getComponent(cc.Label).string,
            curweapon: cc.find("Canvas/prepare/info/curarmy").getComponent(cc.Label).string
        }).then(()=>{
            cc.director.loadScene("hall");
        })
    }

    p_windsword () {
        cc.audioEngine.playEffect(this.pick, false);
        cc.find("Canvas/prepare/frame").x = 210;
        cc.find("Canvas/prepare/frame").y = 387;
        cc.find("Canvas/prepare/info/curarmy").getComponent(cc.Label).string = "windsword";
    }

    p_nightmare () {
        cc.audioEngine.playEffect(this.pick, false);
        cc.find("Canvas/prepare/frame").x = 210;
        cc.find("Canvas/prepare/frame").y = 151;
        cc.find("Canvas/prepare/info/curarmy").getComponent(cc.Label).string = "nightmare";
    }

    p_dx () {
        cc.audioEngine.playEffect(this.pick, false);
        cc.find("Canvas/prepare/frame").x = 210;
        cc.find("Canvas/prepare/frame").y = 621;
        cc.find("Canvas/prepare/info/curarmy").getComponent(cc.Label).string = "DX";
    }
    p_bitter () {
        cc.audioEngine.playEffect(this.pick, false);
        cc.find("Canvas/prepare/frame").x = 210;
        cc.find("Canvas/prepare/frame").y = 858;
        cc.find("Canvas/prepare/info/curarmy").getComponent(cc.Label).string = "bitter";
    }


    start () {
        cc.find("Canvas/prepare/1").on('mouseenter', function (event) {
            cc.find("Canvas/prepare/1_intro").opacity = 255;
        }, this);

        cc.find("Canvas/prepare/1").on('mouseleave', function (event) {
            cc.find("Canvas/prepare/1_intro").opacity = 0;
        }, this);

        
        cc.find("Canvas/prepare/2").on('mouseenter', function (event) {
            cc.find("Canvas/prepare/2_intro").opacity = 255;
        }, this);

        cc.find("Canvas/prepare/2").on('mouseleave', function (event) {
            cc.find("Canvas/prepare/2_intro").opacity = 0;
        }, this);


        cc.find("Canvas/prepare/3").on('mouseenter', function (event) {
            cc.find("Canvas/prepare/3_intro").opacity = 255;
        }, this);

        cc.find("Canvas/prepare/3").on('mouseleave', function (event) {
            cc.find("Canvas/prepare/3_intro").opacity = 0;
        }, this);


        cc.find("Canvas/prepare/4").on('mouseenter', function (event) {
            cc.find("Canvas/prepare/4_intro").opacity = 255;
        }, this);

        cc.find("Canvas/prepare/4").on('mouseleave', function (event) {
            cc.find("Canvas/prepare/4_intro").opacity = 0;
        }, this);


        cc.find("Canvas/prepare/5").on('mouseenter', function (event) {
            cc.find("Canvas/prepare/5_intro").opacity = 255;
        }, this);

        cc.find("Canvas/prepare/5").on('mouseleave', function (event) {
            cc.find("Canvas/prepare/5_intro").opacity = 0;
        }, this);


        cc.find("Canvas/prepare/6").on('mouseenter', function (event) {
            cc.find("Canvas/prepare/6_intro").opacity = 255;
        }, this);

        cc.find("Canvas/prepare/6").on('mouseleave', function (event) {
            cc.find("Canvas/prepare/6_intro").opacity = 0;
        }, this);


        cc.find("Canvas/prepare/7").on('mouseenter', function (event) {
            cc.find("Canvas/prepare/7_intro").opacity = 255;
        }, this);

        cc.find("Canvas/prepare/7").on('mouseleave', function (event) {
            cc.find("Canvas/prepare/7_intro").opacity = 0;
        }, this);


        cc.find("Canvas/prepare/8").on('mouseenter', function (event) {
            cc.find("Canvas/prepare/8_intro").opacity = 255;
        }, this);

        cc.find("Canvas/prepare/8").on('mouseleave', function (event) {
            cc.find("Canvas/prepare/8_intro").opacity = 0;
        }, this);


        cc.find("Canvas/prepare/9").on('mouseenter', function (event) {
            cc.find("Canvas/prepare/9_intro").opacity = 255;
        }, this);

        cc.find("Canvas/prepare/9").on('mouseleave', function (event) {
            cc.find("Canvas/prepare/9_intro").opacity = 0;
        }, this);


        var user = firebase.auth().currentUser;
        var ref2 = firebase.database().ref('/users/' + user.uid);

        ref2.once('value').then((snapshot) => {
            cc.find("Canvas/prepare/info/r1").getComponent(cc.Label).string = snapshot.val().r1;
            cc.find("Canvas/prepare/info/r2").getComponent(cc.Label).string = snapshot.val().r2;
            cc.find("Canvas/prepare/info/r3").getComponent(cc.Label).string = snapshot.val().r3;
            cc.find("Canvas/prepare/info/r4").getComponent(cc.Label).string = snapshot.val().r4;
            cc.find("Canvas/prepare/info/r5").getComponent(cc.Label).string = snapshot.val().r5;
            cc.find("Canvas/prepare/info/r6").getComponent(cc.Label).string = snapshot.val().r6;

            cc.find("Canvas/prepare/info/curarmy").getComponent(cc.Label).string = snapshot.val().curweapon;
            cc.find("Canvas/prepare/info/windsword").getComponent(cc.Label).string = snapshot.val().windsword;
            cc.find("Canvas/prepare/info/nightmare").getComponent(cc.Label).string = snapshot.val().nightmare;
            cc.find("Canvas/prepare/info/DX").getComponent(cc.Label).string = snapshot.val().DX;
        })
        .then(()=>{
            
            if(cc.find("Canvas/prepare/info/curarmy").getComponent(cc.Label).string == "bitter") {

                cc.find("Canvas/prepare/frame").x = 210;
                cc.find("Canvas/prepare/frame").y = 858;
            }
            else if(cc.find("Canvas/prepare/info/curarmy").getComponent(cc.Label).string == "DX") {
                cc.find("Canvas/prepare/frame").x = 210;
                cc.find("Canvas/prepare/frame").y = 621;
            }
            else if(cc.find("Canvas/prepare/info/curarmy").getComponent(cc.Label).string == "windsword") {
                cc.find("Canvas/prepare/frame").x = 210;
                cc.find("Canvas/prepare/frame").y = 387;
            }
            else if(cc.find("Canvas/prepare/info/curarmy").getComponent(cc.Label).string == "nightmare") {
                cc.find("Canvas/prepare/frame").x = 210;
                cc.find("Canvas/prepare/frame").y = 151;
            }



            if(cc.find("Canvas/prepare/info/windsword").getComponent(cc.Label).string == "N") {
                cc.find("Canvas/prepare/pick_windsword").getComponent(cc.Button).interactable = false;
                cc.find("Canvas/prepare/pick_windsword").opacity = 100;
            }
            if(cc.find("Canvas/prepare/info/nightmare").getComponent(cc.Label).string == "N") {
                cc.find("Canvas/prepare/pick_nightmare").getComponent(cc.Button).interactable = false;
                cc.find("Canvas/prepare/pick_nightmare").opacity = 100;
            }
            if(cc.find("Canvas/prepare/info/DX").getComponent(cc.Label).string == "N") {
                cc.find("Canvas/prepare/pick_DX").getComponent(cc.Button).interactable = false;
                cc.find("Canvas/prepare/pick_DX").opacity = 100;
            }



            if(cc.find("Canvas/prepare/info/r1").getComponent(cc.Label).string != "") {
                this.give_me_item("1");
            }
            if(cc.find("Canvas/prepare/info/r2").getComponent(cc.Label).string != "") {
                this.give_me_item("2");
            }
            if(cc.find("Canvas/prepare/info/r3").getComponent(cc.Label).string != "") {
                this.give_me_item("3");
            }
            if(cc.find("Canvas/prepare/info/r4").getComponent(cc.Label).string != "") {
                this.give_me_item("4");
            }
            if(cc.find("Canvas/prepare/info/r5").getComponent(cc.Label).string != "") {
                this.give_me_item("5");
            }
            if(cc.find("Canvas/prepare/info/r6").getComponent(cc.Label).string != "") {
                this.give_me_item("6");
            }
        })

    }

    // update (dt) {}
}
