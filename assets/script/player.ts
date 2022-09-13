const { ccclass, property } = cc._decorator;

//攻擊也可以蒐集魂，目前這個還沒寫，因為
//攻擊也還沒寫（等待私訊和周確認中）
//playerLose也還沒寫，可能有lose scene之類的，我不知道他們要怎麼搞

//大魔王的那個code部分還沒寫，就是和簡志宇的敵人的互動的部分
//因為新增體、技、魂的Bar，所以只要體技魂的數值有改動，就要記得更新！//目前魂的Bar還沒寫

@ccclass
export default class Ninja extends cc.Component {

    @property()
    playerSpeed: number = 10;//應該非必要，因為他會在一秒內到達那個地方，無論距離多遠

    //四種武器
    @property(cc.Prefab)
    KuOoPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    SwordPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    ShurikenPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    YaoKniefPrefab: cc.Prefab = null;

    @property({ type: cc.Node })
    canvas: cc.Node = null;

    // 0up, 1right, 2down, 3left
    public dir: number = 2;

    //mouseDown的話有兩種情況： 如果是down在player上面，那就是累積「技」的能量；如果是down在其他地方，就是player想要攻擊
    private mouseDownedForCollecting_Ji: boolean = false;
    private mouseDownedForAttacking: boolean = false;
    private mouseLastDownPos: cc.Vec2;//mouseDownedForCollecting_Ji會用到，player想要攻擊的那個部分不會用到
    private curMousePos: cc.Vec2;
    //！！！注意！！！因為mouseDown是只針對player這個node，而mousUp是針對整個canvas(詳見start()裡面所註冊的三個func)，所以
    //mouseDownedForCollecting_Ji和mouseDownedForAttacking只可能出現三種情況: (false, false), (true, false), (false, true)
    //不可能出現(true, true)!!

    //「體」相關參數，也就是復活、死亡相關參數
    private isDead: boolean = false;
    private isWUDI_EachTimePlayerResurrect: boolean = false; // Resurrect: (v.)復活。指目前player是否是無敵狀態 //無敵狀態目前設定是5秒
    private maxNumOfLives: number = 1;//由3改1，也就是改成不會重生
    private curNumOfLives: number = this.maxNumOfLives;
    public maxBlood: number = 1000;
    private curBlood: number = this.maxBlood;

    //動畫相關參數
    private anim = null;
    private animState = null;

    //「技」相關參數，就是我所理解的「“移動”能量」
    private fps: number = 60/* * 2 */;//改成下一行的secsToChargeToMax = 5/2的寫法
    private secsToChargeToMax: number = 5 / 2;
    private energyMax: number = this.secsToChargeToMax * this.fps * 2;
    private curEnergy: number = 0;
    private DontWasteTheEnergy: boolean = false; //若是true，不會消耗技

    //「防禦」相關參數
    private deffend: number = 50; //建議敵人攻擊時先扣掉這個數值

    //地圖網格相關參數
    private mapID: number = 1;
    private mapData: Array<Array<number>> = [[68.75, 65.55, 1435, 60, 845, 255, 20, 9], [68.75, 65.55, 1435, 60, 845, 255, 20, 9], [68.75, 65.55, 1435, 60, 845, 255, 20, 9], [68.75, 65.55, 1435, 60, 845, 255, 20, 9], [68.75, 65.55, 1435, 60, 845, 255, 20, 9], [68.75, 65.55, 1435, 60, 845, 255, 20, 9]];
    //mapData裡面的每個entry都是個陣列。而一個陣列裡面總共有8個數字，依序代表：blockSpanX, blockSpanY, rightBound, leftBound, upBound, downBound, numCol, numRow
    private blockSpanX: number = 68.75/*總共20格，用numCol紀錄*/;
    private blockSpanY: number = 65.55/*總共9格，用numRow紀錄*/;
    private rightBound: number = 1435;//269
    private leftBound: number = 60;//1221
    private upBound: number = 845;//390
    private downBound: number = 255;//795
    private numCol: number = 20;//14
    private numRow: number = 9;//6
    //以上網格參數，會透過chooseCorrespondingMapData()來獲取

    //「魂」相關參數，就是player要開大絕或施放各種奇怪招數時需要耗費的能量，和「技」不同。「技」專指「移動」能量。
    // 蒐集方法是移動或損血或攻擊別人
    private maxHun: number = this.maxBlood;//「魂」因為可以透過損血來蒐集，所以我認為1:1很恰當。
    public curHun: number = 0;
    private constantForHunWhenPlayerMoving = 12; //我也不知道12怎麼來的，憑感覺來的。因為目前的maxHun是1000，而一次移動的最多網格數量是20，所以感覺12不錯。

    //給角色切換sprite用
    @property(cc.SpriteFrame)
    private spriteLeftRight: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    private spriteUp: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    private spriteDown: cc.SpriteFrame = null;





    //控制「體技魂」長度條用
    //偏移量計算：
    private x_shift: number = 0;//-175.913 - 580;
    private y_shift: number = 0;//25 - 512;

    //體：  //真正的數字的初始化會在start()裡面進行 //向右對齊
    private Ti_topLeftPos: cc.Vec2;
    private Ti_botRightPos: cc.Vec2;
    private Ti_entireWidth: number;
    private Ti_entireHeight: number;
    private Ti_hideBar_actualWidth: number;
    private Ti_hideBar_pos: cc.Vec2;

    //技： //向右對齊
    private Ji_topLeftPos: cc.Vec2;
    private Ji_botRightPos: cc.Vec2;
    private Ji_entireWidth: number;
    private Ji_entireHeight: number;
    private Ji_hideBar_actualWidth: number;
    private Ji_hideBar_pos: cc.Vec2;

    //魂： //向「左！」對齊！
    private Hun_topLeftPos: cc.Vec2;
    private Hun_botRightPos: cc.Vec2;
    private Hun_entireWidth: number;
    private Hun_entireHeight: number;
    private Hun_showBar_actualWidth: number;
    private Hun_showBar_pos: cc.Vec2;


    private isChonged: boolean = false;
    private enemyScript: string = "";


    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2(); // 如果希望重力加速度为 0，可以这样设置

        this.anim = this.node.getComponent(cc.Animation);

        cc.log("Player.ts is now in onLoad() function, and is leaving it");
    }

    start() {
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_START, this.onMouseDown, this);
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_MOVE, this.onMouseMove, this);
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_END, this.onMouseUp, this);

        //let enemyScript;
        if (this.canvas.getComponent("map_position").map_number == 1)
            this.enemyScript = "enemies3";
        else if (this.canvas.getComponent("map_position").map_number == 2)
            this.enemyScript = "enemies2";
        else if (this.canvas.getComponent("map_position").map_number == 3)
            this.enemyScript = "enemies";

        //如果mouseDown，需要定時加能量
        this.schedule(() => { this.calculateEnergy(0); }, 0.25);
        this.animState = this.anim.play("ninjaDownStill");

        //TODO:李彥璋你寫在這裡，根據firebase內容，把四種武器放到cc.instantiate()裡
        //武器顯示
        var user = firebase.auth().currentUser;
        var ref2 = firebase.database().ref('/users/' + user.uid);

        var WeaponPrefab;
        ref2.once('value').then((snapshot) => {
            cc.find("Canvas/curweapon").getComponent(cc.Label).string = snapshot.val().curweapon;
        }).then(() => {
            if (cc.find("Canvas/curweapon").getComponent(cc.Label).string == "bitter") {
                WeaponPrefab = cc.instantiate(this.KuOoPrefab);
            }
            else if (cc.find("Canvas/curweapon").getComponent(cc.Label).string == "DX") {
                WeaponPrefab = cc.instantiate(this.SwordPrefab);
            }
            else if (cc.find("Canvas/curweapon").getComponent(cc.Label).string == "windsword") {
                WeaponPrefab = cc.instantiate(this.ShurikenPrefab);
                cc.log(87878787878787878787);
            }
            else if (cc.find("Canvas/curweapon").getComponent(cc.Label).string == "nightmare") {
                WeaponPrefab = cc.instantiate(this.YaoKniefPrefab);
            }
        }).then(() => {
            cc.find('Canvas').addChild(WeaponPrefab);
            cc.log('add weapon');
        })




        this.Ti_topLeftPos = cc.v2(80, 125);
        this.Ti_botRightPos = cc.v2(334, 92);
        this.Ti_entireWidth = Math.abs(this.Ti_botRightPos.x - this.Ti_topLeftPos.x);
        this.Ti_entireHeight = Math.abs(this.Ti_topLeftPos.y - this.Ti_botRightPos.y);
        this.calculateAndChangeWidthOfHidebarOfTi();

        this.Ji_topLeftPos = cc.v2(405, 125);
        this.Ji_botRightPos = cc.v2(662, 92);
        this.Ji_entireWidth = Math.abs(this.Ji_botRightPos.x - this.Ji_topLeftPos.x);
        this.Ji_entireHeight = Math.abs(this.Ji_topLeftPos.y - this.Ji_botRightPos.y);
        this.calculateAndChangeWidthOfHidebarOfJi();

        this.Hun_topLeftPos = cc.v2(115, 247);
        this.Hun_botRightPos = cc.v2(509, 222);
        this.Hun_entireWidth = Math.abs(this.Hun_botRightPos.x - this.Hun_topLeftPos.x);
        this.Hun_entireHeight = Math.abs(this.Hun_topLeftPos.y - this.Hun_botRightPos.y);
        this.calculateAndChangeWidthOfShowbarOfHun();

        this.chooseCorrespondingMapData();//先有正確的mapData，
        this.changeMapID();
        this.selectRandomPos();//你才能找到正確的格子正中間


        cc.log("Player.ts is now in start() function, and is leaving it");


    }

    update(dt) {//dt單位是fps分之一。所以一秒會有60次。假設一個dt加1個能量，一秒就加60個能量。如果使用者能量滿需要10秒，總共能量最大值就是600。
        if (!this.isDead) {
            //this.handleMove(dt);
            //this.handleAnimation();

            //需要根據方向來挑選角色照片
            this.changeToProperSprite();
            //cc.log(this.curEnergy);
        }



        //cc.log("Player.ts is now in update() function, and is leaving it");
    }



    onMouseDown(ev) {
        //cc.log('Mouse Down!');
        //cc.log(ev);
        //cc.log(ev.getLocation());
        //cc.log(this.node.position);

        if (this.distance(ev.getLocation()/*滑鼠點擊位置*/, cc.v2(this.node.position.x /*+ cc.find("Canvas").anchorX * cc.find("Canvas").width*/, this.node.position.y /*+ cc.find("Canvas").anchorY * cc.find("Canvas").height*/))/*目前player位置*/ <= 25) // 如果mouseDown的位置是在player上面
            this.mouseDownedForCollecting_Ji = true;//那就是要蒐集「技」
        else
            this.mouseDownedForAttacking = true;//否則就是要攻擊

        cc.log("Mouse downed. ForCollecting_Ji is " + this.mouseDownedForCollecting_Ji + ", ForAttacking is " + this.mouseDownedForAttacking);
        //cc.log(this);
        //cc.log(this.node);
        //cc.log(this.distance(ev.getLocation()/*滑鼠點擊位置*/, this.node.position/*目前player位置*/));
        //cc.log(this.distance(ev.getLocation()/*滑鼠點擊位置*/, cc.v2(this.node.position.x + cc.find("Canvas").anchorX * cc.find("Canvas").width, this.node.position.y + cc.find("Canvas").anchorY * cc.find("Canvas").height)));
        //cc.log(this.distance(ev.getLocation()/*滑鼠點擊位置*/, cc.v2(this.node.position.x + this.node.anchorX * this.node.width, this.node.position.y + this.node.anchorY * this.node.height)));

        this.mouseLastDownPos = ev.getLocation();
        this.curMousePos = ev.getLocation();//global變數

        this.changeToFaceTowardsTheProperDirection(ev);
    }


    onMouseMove(ev) {
        //cc.log('Mouse Move!');
        //cc.log(ev);

        this.changeToFaceTowardsTheProperDirection(ev);
    }
    onMouseUp(ev) {
        //cc.log('Mouse Up!');
        //cc.log(ev);


        if (this.mouseDownedForCollecting_Ji && !this.mouseDownedForAttacking) this.moveWithAnime(ev.getLocation());

        this.mouseDownedForCollecting_Ji = false;
        this.mouseDownedForAttacking = false;
    }

    private distance(a: cc.Vec2, b: cc.Vec2): number {
        var deltaX = a.x - b.x;
        var deltaY = a.y - b.y;

        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }

    private changeToProperSprite() {
        var sprite = this.node.getComponent(cc.Sprite);

        this.node.scaleX = 1;
        if (this.dir == 0)
            sprite.spriteFrame = this.spriteUp;
        else if (this.dir == 2)
            sprite.spriteFrame = this.spriteDown;
        else {
            sprite.spriteFrame = this.spriteLeftRight;

            if (this.dir == 3) this.node.scaleX = -1;
        }

    }

    private changeToFaceTowardsTheProperDirection(ev: any) {
        var curCursorPos = ev.getLocation();//onMouseMove這個function的local變數
        this.curMousePos = ev.getLocation();//global變數，來判斷是否可以加能量用。如果滑鼠不在人物位置，就不能加能量。

        var playerNowPos = cc.v2(this.node.position.x /*+ cc.find("Canvas").anchorX * cc.find("Canvas").width*/, this.node.position.y /*+ cc.find("Canvas").anchorY * cc.find("Canvas").height*/);
        var cursorDisplacement = curCursorPos.sub(playerNowPos);

        // 忍者只能往四個方向移動，所以要判斷cursorDisplacement在四個方向中的哪個
        // cocos的座標系統和數學的笛卡兒座標方向一樣
        var displacementUnitVector = cursorDisplacement.normalize();
        //先考慮滑鼠位移剛好在xy軸上
        if (displacementUnitVector.x == 0) {
            if (displacementUnitVector.y > 0)
                this.dir = 0;
            else
                this.dir = 2;
        }
        else if (displacementUnitVector.y == 0) {
            if (displacementUnitVector.x > 0)
                this.dir = 1;
            else
                this.dir = 3;
        }
        //再來考慮如果滑鼠不是在xy軸，而是在四個象限裡
        else if (cursorDisplacement.x > 0 && cursorDisplacement.y > 0) {
            if (this.distance(displacementUnitVector, new cc.Vec2(0, 1)) < this.distance(displacementUnitVector, new cc.Vec2(1, 0)))
                this.dir = 0;
            else
                this.dir = 1;
        }
        else if (cursorDisplacement.x < 0 && cursorDisplacement.y > 0) {
            if (this.distance(displacementUnitVector, new cc.Vec2(0, 1)) < this.distance(displacementUnitVector, new cc.Vec2(-1, 0)))
                this.dir = 0;
            else
                this.dir = 3;
        }
        else if (cursorDisplacement.x < 0 && cursorDisplacement.y < 0) {
            if (this.distance(displacementUnitVector, new cc.Vec2(0, -1)) < this.distance(displacementUnitVector, new cc.Vec2(-1, 0)))
                this.dir = 2;
            else
                this.dir = 3;
        }
        else if (cursorDisplacement.x > 0 && cursorDisplacement.y < 0) {
            if (this.distance(displacementUnitVector, new cc.Vec2(0, -1)) < this.distance(displacementUnitVector, new cc.Vec2(1, 0)))
                this.dir = 2;
            else
                this.dir = 1;
        }
    }

    private calculateEnergy(numOfBlock: number = 0/*如果沒填寫這項，就是每個dt的加能量時間。如果有，就是要移動要扣能量。*/) {
        if (numOfBlock != 0) {
            //cc.log("Need To Cost: " + Math.floor(numOfBlock * this.fps));
            if (!this.DontWasteTheEnergy) //若this.DontWasteTheEnergy是true，不會扣energy
                this.curEnergy -= Math.floor(numOfBlock * this.fps);
            return;
        }

        if (this.mouseDownedForCollecting_Ji && !this.mouseDownedForAttacking)
            this.curEnergy += this.fps;

        if (this.curEnergy > this.energyMax)
            this.curEnergy = this.energyMax;


        this.calculateAndChangeWidthOfHidebarOfJi();
    }

    private moveWithAnime(mouseUpPos: cc.Vec2) {
        //因為最多有this.secsToChargeToMax * this.fps個能量（目前是600），而我們寬20格高9格，所以假設能量滿的話，一次可以走10格，所以走一格要扣60能量，相當於fps

        //如果碰到障礙物要另外處理，但我還沒處理
        var mouseUpPosBackUp = mouseUpPos;
        var mouseLastDownPosBackUp = this.mouseLastDownPos;

        var cursorDisplacement = mouseUpPos.sub(this.mouseLastDownPos);
        //因為只能朝上下左右去移動，所以一樣要依照滑鼠位置去判斷dir。但好在剛剛在他還沒放開滑鼠左鍵之前，我就已經把dir處理完畢，所以就只要依照dir去算他能走幾格，再換算成x或y的移動變量即可。
        var numOfBlockWantToMoveX = Math.floor(Math.abs(cursorDisplacement.x) / this.blockSpanX);
        var numOfBlockWantToMoveY = Math.floor(Math.abs(cursorDisplacement.y) / this.blockSpanY);
        var REALnumOfBlockToMoveX = 0;
        var REALnumOfBlockToMoveY = 0;
        var destX;
        var destY;

        if (this.dir == 1 || this.dir == 3) { // 想要左右移動，所以用到的是x (numOfBlockWantToMoveX)
            //開始計算REALnumOfBlockToMoveX
            if (numOfBlockWantToMoveX * this.fps <= this.curEnergy)  // 如果玩家的能量夠
                REALnumOfBlockToMoveX = numOfBlockWantToMoveX;
            else //如果玩家能量不夠
                REALnumOfBlockToMoveX = Math.floor(this.curEnergy / this.fps);
            //但是，目前的REALnumOfBlockToMoveX還不是真正的REALnumOfBlockToMoveX！因為我們還沒有判定是否會超出邊界
            //cc.log(REALnumOfBlockToMoveX);

            var sign = (this.dir == 1) ? 1 : -1;//用dir來判斷等下的加減號
            destX = (REALnumOfBlockToMoveX * this.blockSpanX * sign + this.mouseLastDownPos.x < this.rightBound) ?
                ((REALnumOfBlockToMoveX * this.blockSpanX * sign + this.mouseLastDownPos.x > this.leftBound) ? REALnumOfBlockToMoveX * this.blockSpanX * sign + this.mouseLastDownPos.x : this.leftBound) : this.rightBound;
            REALnumOfBlockToMoveX = Math.floor(Math.abs(destX - this.mouseLastDownPos.x) / this.blockSpanX);
            //終於把真正的REALnumOfBlockToMoveX(其實更準確講，是真正會到的位置a.k.a. destX)算好了！

            //計算真正花費後的剩餘能量
            //cc.log("Costing Energy!!!");
            this.calculateEnergy(REALnumOfBlockToMoveX);

            //真正的物理移動
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(REALnumOfBlockToMoveX * this.blockSpanX * sign * 5/*0.2秒跑到定點*/, 0);
            this.isChonging = true;

            //製造跑步的動畫
            if (this.mouseDownedForCollecting_Ji) {
                if (sign == 1) {//往右跑
                    if (REALnumOfBlockToMoveX != 0) this.animState = this.anim.play("ninjaRightRun");
                    else this.animState = this.anim.play("ninjaRightStill");

                    this.scheduleOnce(() => {
                        this.animState = this.anim.play("ninjaRightStill");

                        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0/*0.2秒後，速度要馬上歸零*/, 0);

                        this.isChonging = false;
                    }, 0.2);
                }
                else {
                    if (REALnumOfBlockToMoveX != 0) this.animState = this.anim.play("ninjaLeftRun");
                    else this.animState = this.anim.play("ninjaLeftStill");

                    this.scheduleOnce(() => {
                        this.animState = this.anim.play("ninjaLeftStill");

                        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0/*0.2秒後，速度要馬上歸零*/, 0);
                        this.isChonging = false;
                    }, 0.2);
                }
            }

        }
        else { // 想要上下移動，所以用到的是y (numOfBlockWantToMoveY)
            //開始計算REALnumOfBlockToMoveY
            if (numOfBlockWantToMoveY * this.fps <= this.curEnergy)  // 如果玩家的能量夠
                REALnumOfBlockToMoveY = numOfBlockWantToMoveY;
            else //如果玩家能量不夠
                REALnumOfBlockToMoveY = Math.floor(this.curEnergy / this.fps);
            //但是，目前的REALnumOfBlockToMoveY還不是真正的REALnumOfBlockToMoveY！因為我們還沒有判定是否會超出邊界
            //cc.log(REALnumOfBlockToMoveY);

            var sign = (this.dir == 0) ? 1 : -1;//用dir來判斷等下的加減號
            destY = (REALnumOfBlockToMoveY * this.blockSpanY * sign + this.mouseLastDownPos.y < this.upBound) ?
                ((REALnumOfBlockToMoveY * this.blockSpanY * sign + this.mouseLastDownPos.y > this.downBound) ? REALnumOfBlockToMoveY * this.blockSpanY * sign + this.mouseLastDownPos.y : this.downBound) : this.upBound;
            REALnumOfBlockToMoveY = Math.floor(Math.abs(destY - this.mouseLastDownPos.y) / this.blockSpanY);
            //終於把真正的REALnumOfBlockToMoveY(其實更準確講，是真正會到的位置a.k.a. destY)算好了！

            //計算真正花費後的剩餘能量
            cc.log("Costing Energy!!!");
            this.calculateEnergy(REALnumOfBlockToMoveY);

            //真正的物理移動
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, REALnumOfBlockToMoveY * this.blockSpanY * sign * 5/*0.2秒跑到定點*/);
            this.isChonging = true;

            //製造跑步的動畫
            if (this.mouseDownedForCollecting_Ji) {
                if (sign == 0) {//往上跑
                    if (REALnumOfBlockToMoveX != 0) this.animState = this.anim.play("ninjaUpRun");
                    else this.animState = this.anim.play("ninjaUpStill");

                    this.scheduleOnce(() => {
                        this.animState = this.anim.play("ninjaUpStill");

                        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0/*0.2秒後，速度要馬上歸零*/);
                        this.isChonging = false;
                    }, 0.2);
                }
                else {
                    if (REALnumOfBlockToMoveX != 0) this.animState = this.anim.play("ninjaDownRun");
                    else this.animState = this.anim.play("ninjaDownStill");

                    this.scheduleOnce(() => {
                        this.animState = this.anim.play("ninjaDownStill");

                        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0/*0.2秒後，速度要馬上歸零*/);
                        this.isChonging = false;
                    }, 0.2);
                }
            }

        }





        //不管是上下左右哪種方位的移動，都可以蒐集「魂」
        var numOfBlockPlayerMoved = (REALnumOfBlockToMoveX != 0) ? REALnumOfBlockToMoveX : REALnumOfBlockToMoveY;
        this.hunCollect(this.constantForHunWhenPlayerMoving * numOfBlockPlayerMoved);

        //計算並且告知enemy是否有被player衝到
        this.chongRay(numOfBlockPlayerMoved);

    }



    public playerLoseBlood(howMuch: number) {
        if (!this.isWUDI_EachTimePlayerResurrect) this.curBlood -= howMuch;

        cc.log(this.curBlood);

        if (this.curBlood <= 0) this.loseLife();
        else /*損血可以蒐集魂*/ this.hunCollect(howMuch);



        this.calculateAndChangeWidthOfHidebarOfTi();
    }

    public loseLife(howMuch: number = 1) {
        this.curNumOfLives--;

        if (this.curNumOfLives > 0) this.playerResurrect();
        else this.playerLose();
    }

    public playerResurrect() {
        this.curBlood = this.maxBlood;
        this.isWUDI_EachTimePlayerResurrect = true;

        //player復活的位置是
        this.selectRandomPos();

        //無敵狀態目前設定是5秒
        this.scheduleOnce(() => { this.isWUDI_EachTimePlayerResurrect = false; }, 5);

    }

    //playerLose待完成
    public playerLose() {
        //呼叫李彥璋寫的code
        cc.find("Canvas/map1").getComponent("map1").loseing();
    }

    private hunCollect(howMuch: number) {
        //cc.log("Before's Hun: " + this.curHun);

        this.curHun += howMuch;
        if (this.curHun > this.maxHun) this.curHun = this.maxHun;

        this.calculateAndChangeWidthOfShowbarOfHun();

        //cc.log("After's Hun: " + this.curHun);
    }






    private calculateAndChangeWidthOfHidebarOfTi() {
        //cc.log("Ti_before: x = " + cc.find("Ti_HideBar").x + "; y = " + cc.find("Ti_HideBar").y + "; width = " + cc.find("Ti_HideBar").width);

        var percOfPlayer = this.curBlood / this.maxBlood;
        if (percOfPlayer <= 0) percOfPlayer = 0;

        var percOfHidebarOfTi = 1 - percOfPlayer;
        

        //計算HideBar的寬度
        this.Ti_hideBar_actualWidth = percOfHidebarOfTi * this.Ti_entireWidth;
        //計算HideBar的中心點位置。x座標會一直隨著perOfHidebarOfTi更動，但y座標不會。
        this.Ti_hideBar_pos = cc.v2(this.Ti_botRightPos.x - 0.5 * (this.Ti_hideBar_actualWidth), 0.5 * (this.Ti_topLeftPos.y + this.Ti_botRightPos.y));
        //記得計算偏移量
        this.Ti_hideBar_pos = cc.v2(this.Ti_hideBar_pos.x + this.x_shift, this.Ti_hideBar_pos.y + this.y_shift);

        //上面已經計算好hideBar的新的中心點位置和新的寬度了，所以現在要去cocos的架構裡面把那個node抓出來，針對property去修改
        cc.find("Ti_HideBar").x = this.Ti_hideBar_pos.x;
        cc.find("Ti_HideBar").y = this.Ti_hideBar_pos.y;
        cc.find("Ti_HideBar").width = this.Ti_hideBar_actualWidth;

        //cc.log("Ti_after: x = " + cc.find("Ti_HideBar").x + "; y = " + cc.find("Ti_HideBar").y + "; width = " + cc.find("Ti_HideBar").width);
    }


    private calculateAndChangeWidthOfHidebarOfJi() {
        //cc.log("Ji_before: x = " + cc.find("Ji_HideBar").x + "; y = " + cc.find("Ji_HideBar").y + "; width = " + cc.find("Ji_HideBar").width);

        var percOfPlayer = this.curEnergy / this.energyMax;
        var percOfHidebarOfJi = 1 - percOfPlayer;

        //計算HideBar的寬度
        this.Ji_hideBar_actualWidth = percOfHidebarOfJi * this.Ji_entireWidth;
        //計算HideBar的中心點位置。x座標會一直隨著perOfHidebarOfJi更動，但y座標不會。
        this.Ji_hideBar_pos = cc.v2(this.Ji_botRightPos.x - 0.5 * (this.Ji_hideBar_actualWidth), 0.5 * (this.Ji_topLeftPos.y + this.Ji_botRightPos.y));
        //記得計算偏移量
        this.Ji_hideBar_pos = cc.v2(this.Ji_hideBar_pos.x + this.x_shift, this.Ji_hideBar_pos.y + this.y_shift);

        //上面已經計算好hideBar的新的中心點位置和新的寬度了，所以現在要去cocos的架構裡面把那個node抓出來，針對property去修改
        cc.find("Ji_HideBar").x = this.Ji_hideBar_pos.x;
        cc.find("Ji_HideBar").y = this.Ji_hideBar_pos.y;
        cc.find("Ji_HideBar").width = this.Ji_hideBar_actualWidth;

        //cc.log("Ji_after: x = " + cc.find("Ji_HideBar").x + "; y = " + cc.find("Ji_HideBar").y + "; width = " + cc.find("Ji_HideBar").width);
    }


    private calculateAndChangeWidthOfShowbarOfHun() { //和上面兩個函式不同，這個是向「左」對齊！而且是「Show」bar！
        var percOfShowbarOfHun = this.curHun / this.maxHun;

        //計算ShowBar的寬度
        this.Hun_showBar_actualWidth = percOfShowbarOfHun * this.Hun_entireWidth;
        //計算ShowBar的中心點位置。x座標會一直隨著percOfShowbarOfHun更動，但y座標不會。
        this.Hun_showBar_pos = cc.v2(this.Hun_topLeftPos.x + 0.5 * (this.Hun_showBar_actualWidth), 0.5 * (this.Hun_topLeftPos.y + this.Hun_botRightPos.y));
        //記得計算偏移量
        this.Hun_showBar_pos = cc.v2(this.Hun_showBar_pos.x + this.x_shift, this.Hun_showBar_pos.y + this.y_shift);

        //上面已經計算好showBar的新的中心點位置和新的寬度了，所以現在要去cocos的架構裡面把那個node抓出來，針對property去修改
        cc.find("Hun_ShowBar").x = this.Hun_showBar_pos.x;
        cc.find("Hun_ShowBar").y = this.Hun_showBar_pos.y;
        cc.find("Hun_ShowBar").width = this.Hun_showBar_actualWidth;

        //cc.log(percOfShowbarOfHun);
        //cc.log(this.Hun_showBar_actualWidth);
        //cc.log(this.Hun_showBar_pos);
    }



    // private resetParticle() {
    //     this.WUDI_particleSys.resetSystem();
    // }


    onBeginContact(contact, self, other) {

    }

    public IncreaseCurBlood(number) { //治癒部分生命
        this.curBlood += number;
        if (this.curBlood >= this.maxBlood)
            this.curBlood = this.maxBlood;
        this.calculateAndChangeWidthOfHidebarOfTi();
    }

    public IncreaseToMaxBlood() { //治癒全部生命
        this.curBlood = this.maxBlood;
        this.calculateAndChangeWidthOfHidebarOfTi();
    }

    public WuDi(time) { //無敵多少時間
        this.isWUDI_EachTimePlayerResurrect = true;
        this.scheduleOnce(() => { this.isWUDI_EachTimePlayerResurrect = false; }, time);
    }

    public IncreaseToMaxEnergy() { //加滿所有技
        this.curEnergy = this.energyMax;
        this.calculateAndChangeWidthOfHidebarOfJi();
    }

    public WuDiEnergy(time) { //此時間不會扣技
        this.DontWasteTheEnergy = true;
        this.scheduleOnce(() => { this.DontWasteTheEnergy = false; }, time)
        this.calculateAndChangeWidthOfHidebarOfJi();
    }

    public DisplaceDeffend(value) { //位移防禦力
        this.deffend += value;
    }

    public Purify(time) {
        //TODO: 淨化
    }


    private chongRay/*「衝」光波*/(numOfBlockThePlayerMoved: number) {
        var monsArr = cc.find("Canvas/monsters").children;
        var recOfChongDao = false;

        //cc.log(monsArr);
        for (var i = 0; i < cc.find("Canvas/monsters").childrenCount; i++) {

            var x = monsArr[i].x + cc.find("Canvas").anchorX * cc.find("Canvas").width;
            var y = monsArr[i].y + cc.find("Canvas").anchorY * cc.find("Canvas").height;

            var disBetweenThisMonsAndTheLine;// Line可以是垂直線，也可以是水平線
            if (this.dir == 0 || this.dir == 2 /*如果現在player是上下移動(a.k.a. 垂直線移動)*/) {
                disBetweenThisMonsAndTheLine = Math.abs(x - (this.node.x + cc.find("Canvas").anchorX * cc.find("Canvas").width));

                //如果距離小於35，我就認為是衝到。 //為啥常數取35？我也不知道，就是憑感覺。但是怪物蠻大隻的，所以要取大一點。// 那不如就用怪物的size來判定即可
                if (disBetweenThisMonsAndTheLine <= /*35*/ Math.abs(monsArr[i].width * monsArr[i].scaleX / 2)) {
                    //上面那個if只是先確認這個怪物是在想要走的直線上，但還沒判定是否player真的會衝到，因為可能怪物在player行進路線的反方向，或者怪物距離太遠也衝不到
                    if (this.dir == 0) { //如果player是往上走
                        var goalY = (this.node.y + cc.find("Canvas").anchorY * cc.find("Canvas").height) + numOfBlockThePlayerMoved * this.blockSpanY;

                        if (goalY + /*20*//*加上常數20是因為如果沒有經過monster的center的話就會判定成沒有衝到，這樣會是錯的*/Math.abs(monsArr[i].height * monsArr[i].scaleY / 2) >= y && /*除了確定goalY>=y以外，還需要確保原本的player的y是小於y的*/ (this.node.y + cc.find("Canvas").anchorY * cc.find("Canvas").height) + (Math.abs(monsArr[i].height * monsArr[i].scaleY / 2)) <= y) {
                            monsArr[i].getComponent(this.enemyScript).enemyOut();// call「衝到」的函式
                            cc.log("往上衝到第 " + i + " 隻怪物");
                            recOfChongDao = true;
                        }

                    }
                    else { //如果player是往下走
                        var goalY = (this.node.y + cc.find("Canvas").anchorY * cc.find("Canvas").height) - numOfBlockThePlayerMoved * this.blockSpanY;

                        if (goalY - Math.abs(monsArr[i].height * monsArr[i].scaleY / 2) <= y && (this.node.y + cc.find("Canvas").anchorY * cc.find("Canvas").height) + (Math.abs(monsArr[i].height * monsArr[i].scaleY / 2)) >= y) {
                            monsArr[i].getComponent(this.enemyScript).enemyOut();// call「衝到」的函式
                            cc.log("往下衝到第 " + i + " 隻怪物");
                            recOfChongDao = true;
                        }
                    }


                }


            }
            else {
                disBetweenThisMonsAndTheLine = Math.abs(y - (this.node.y + cc.find("Canvas").anchorY * cc.find("Canvas").height));

                if (disBetweenThisMonsAndTheLine <= /*35*/ Math.abs(monsArr[i].height * monsArr[i].scaleY / 2)) {
                    if (this.dir == 1) { //如果player是往右走
                        var goalX = (this.node.x + cc.find("Canvas").anchorX * cc.find("Canvas").width) + numOfBlockThePlayerMoved * this.blockSpanX;

                        if (goalX + Math.abs(monsArr[i].width * monsArr[i].scaleX / 2) >= x && (this.node.x + cc.find("Canvas").anchorX * cc.find("Canvas").width) + (Math.abs(monsArr[i].width * monsArr[i].scaleX / 2)) <= x) {

                            monsArr[i].getComponent(this.enemyScript).enemyOut();// call「衝到」的函式
                            cc.log("往右衝到第 " + i + " 隻怪物");
                            recOfChongDao = true;
                        }
                    }
                    else { //如果player是往左走
                        var goalX = (this.node.x + cc.find("Canvas").anchorX * cc.find("Canvas").width) - numOfBlockThePlayerMoved * this.blockSpanX;

                        if (goalX - Math.abs(monsArr[i].width * monsArr[i].scaleX / 2) <= x && (this.node.x + cc.find("Canvas").anchorX * cc.find("Canvas").width) + (Math.abs(monsArr[i].width * monsArr[i].scaleX / 2)) >= x) {
                            monsArr[i].getComponent(this.enemyScript).enemyOut();// call「衝到」的函式
                            cc.log("往左衝到第 " + i + " 隻怪物");
                            recOfChongDao = true;
                        }
                    }


                }
            }


            if (!recOfChongDao) cc.log("沒有衝到");
            if (this.dir == 0 || this.dir == 2) cc.log("x: " + x + "; y: " + y + "; dis: " + disBetweenThisMonsAndTheLine + "; IF result : " + (disBetweenThisMonsAndTheLine <= Math.abs(monsArr[i].width * monsArr[i].scaleX / 2)));
            else cc.log("x: " + x + "; y: " + y + "; dis: " + disBetweenThisMonsAndTheLine + "; IF result : " + (disBetweenThisMonsAndTheLine <= /*35*/ Math.abs(monsArr[i].height * monsArr[i].scaleY / 2)));



        }
    }



    public canAttack() {
        return this.mouseDownedForAttacking;
    }

    public playerChonged() {
        cc.log("Player is chonged by monster!");
        this.isChonged = true;
        this.node.opacity = 0;
        this.playerLoseBlood(Math.floor(this.maxBlood / 30));
        this.selectRandomPos();

        this.scheduleOnce(() => {
            this.isChonged = false;
            this.node.opacity = 255;
        }, 5);
    }

    public WasteHun(hun: number) {
        if (this.curHun >= hun) {
            this.curHun -= hun;
            this.calculateAndChangeWidthOfShowbarOfHun();
            return true;
        }
        else
            return false;
    }

    public CanUseHun(hun: number) {
        if (this.curHun >= hun)
            return true;
        else
            return false;
    }



    private selectRandomPos() {
        //random()出來是0~1，所以20倍之後就是0~20。ex：0.00000, 0.01, 8.7, 15.6, 19.9，20.0000000。
        //如果是頭尾的0或20的話（其實尾還好，你馬上就懂了），我不想要，這樣可能會有bug的風險，所以採用去頭去尾，如果是0或20，就重抽。
        //而這樣randX出來就是1~19，減0.5之後變成0.5~18.5，這樣就可以得到正確的網格中間的x座標
        var randX = 0, randY = 0;
        for (; (randX == 0 || randX == 1 || randX == this.numCol || randX == this.numCol - 1) || (randY == 0 || randY == 1 || randY == this.numRow || randY == this.numRow - 1);) {
            randX = Math.floor(Math.random() * (this.numCol - 1));
            randY = Math.floor(Math.random() * (this.numRow - 1));
        }
        //randX -= 0.5; randY -= 0.5;


        this.node.x = this.leftBound + randX * this.blockSpanX;
        this.node.y = this.downBound + randY * this.blockSpanY;
    }

    private chooseCorrespondingMapData() {
        //先去fetch到正確的mapIP, 並且儲存在this.mapID裡面。this.mapID只能是0或1，所以如果周那個函式會return非0或1的值，要記得自己改
        this.mapID = cc.find("Canvas").getComponent("map_position").map_number;//周是寫1或2/3，所以改成0或1需要經過「減一」

        cc.log("現在是地圖" + this.mapID);

        this.blockSpanX = this.mapData[this.mapID][0];
        this.blockSpanY = this.mapData[this.mapID][1];
        this.rightBound = this.mapData[this.mapID][2];
        this.leftBound = this.mapData[this.mapID][3];
        this.upBound = this.mapData[this.mapID][4];
        this.downBound = this.mapData[this.mapID][5];
        this.numCol = this.mapData[this.mapID][6];
        this.numRow = this.mapData[this.mapID][7];

        this.changeMapID();

    }



    public playerHitByMonsterUsingRenShu2(howMuch: number) {
        this.animState = this.anim.play("fire_skill_2");
        this.playerLoseBlood(howMuch);


        //cc.log();
    }


    private changeMapID() {
        // if (this.mapID == 1) this.trueMapID = 3;
        // else if (this.mapID == 2) this.trueMapID = 2;
        // else if (this.mapID == 3) this.trueMapID = 1;
        // 被改成用string去儲存

    }


}
