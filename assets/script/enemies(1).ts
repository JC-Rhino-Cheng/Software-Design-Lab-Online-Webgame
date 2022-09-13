const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemies extends cc.Component {

    @property({type: cc.Node})
    mapNode: cc.Node = null;

    @property({type: cc.Node})
    tmpPlayerNode: cc.Node = null;

    @property({type: cc.Node})
    dieNode: cc.Node = null;

    @property({type: cc.Node})
    recoverHP: cc.Node = null;

    @property({type: cc.Node})
    recoverMP: cc.Node = null;

    @property({type: cc.Node})
    atkSkill: cc.Node = null;

    @property({type: cc.Node})
    defSkill: cc.Node = null;

    @property({type: cc.Node})
    HP_barNode: cc.Node = null;
/*
    @property({type: cc.ParticleSystem})
    ninjutsuStart: cc.ParticleSystem = null;
*/
    @property(cc.SpriteFrame)
    frog: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    frogRight: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    frogLeft: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    frogUp: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    XsuWuRight: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    XsuWuLeft: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    XsuWuUp: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    XsuWu: cc.SpriteFrame = null;

    @property enemyHP: number = 500;

    private map: number[][]=[ // row: 9, col: 20
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    private path: cc.Vec2[] = [];

    private preHP: number = 500;

    // States for enemy: 
    // 0: rest
    // 1: move
    // 2: ninjutsuStart
    // 3: 忍術失效
    // 4: wait
    private enemyState: number = 0;
    
    private anim = null;

    private animateState = null;

    private playerX: number;

    private playerY: number;

    private px: number;

    private py: number;

    private ex: number;

    private ey: number;

    private cando: number = 1;

    private isFrog = false;

    private isMoving = false;

    private isDie = false;

    private isOut = false;

    private isPlayerOut = false;

    private timer: number = 0;

    private mapOffsetX: number = 68.75;

    private mapOffsetY: number = 65.55;

    private mapStartX: number = 60; // 100 ~ 1395 (若角色置中)

    private mapStartY: number = 255; // 295 ~ 856 (若角色置中)

    private enemyOffsetX: number = 40;

    private enemyOffsetY: number = 41;

    private face: number = 4; // 0 1 2 3 --> down right up left

    onLoad(){
        this.anim = this.getComponent(cc.Animation);
        this.setMap();
        
    }

    start(){

        this.schedule(()=>{
            this.timer += 1;
        }, 1);
        //this.moveToDes(68.75, 0);
        
        /*
        this.scheduleOnce(()=>{
            this.fireFrog();
        }, 5);
        */

    }

    update(dt){

        if(this.isDie) return;

        if(this.enemyHP <= 0) {
            this.enemyDie();
        }
        if(this.isOut) return;

        this.playerX = this.tmpPlayerNode.x;
        this.playerY = this.tmpPlayerNode.y;

        this.px = this.getMapPos('x', this.playerX); // player 的 網格位置 x
        this.py = this.getMapPos('y', this.playerY); // player 的 網格位置 y

        this.ex = this.getMapPos('x', this.node.x); // enemy 的 網格位置 x
        this.ey = this.getMapPos('y', this.node.y); // enemy 的 網格位置 y
        if(this.isFrog && this.enemyState == 1){
            if(this.face == 0){
                if(!this.anim.getAnimationState("firefrog_stay").isPlaying)
                this.anim.play("firefrog_stay");
            }
            else if(this.face == 1){
                if(!this.anim.getAnimationState("firefrog_stay_right").isPlaying)
                this.anim.play("firefrog_stay_right");
            }
            else if(this.face == 2){
                if(!this.anim.getAnimationState("firefrog_stay_up").isPlaying)
                this.anim.play("firefrog_stay_up");
            }
            else if(this.face == 3){
                if(!this.anim.getAnimationState("firefrog_stay_left").isPlaying)
                this.anim.play("firefrog_stay_left");
            }    
        }
        

        if(this.cando > 0 && !this.isDie) this.makeChoice();
        cc.log(this.enemyState);
    }

    getMapPos(dir: string, n: number){
        if(dir == 'x') return Math.floor(Number(n - this.enemyOffsetX - this.mapStartX) / this.mapOffsetX);
        else return Math.floor(Number(n - this.enemyOffsetY - this.mapStartY) / this.mapOffsetY);
    }

    findPath(posX: number, posY: number){
        // DFS??
        let path_arr = [];
        let desC = Math.floor(Number(posX-60) /68.75);
        let desR = Math.floor(Number(posY-255) /65.55);
        //while(this.getEnemyPos() != [desR, desC]){

        //}
        return path_arr;
    }

    setMap(){
        // 從map1拿到map的資訊(包括障礙物位置等等)

    }

    setRebornPos(){
        let r = Math.floor(Math.random() * 100);
        let x: number, y: number;
        x = r%20;
        y = r%9;
        this.node.x = this.mapStartX + this.enemyOffsetX + this.mapOffsetX * this.ex;
        this.node.x = this.mapStartY + this.enemyOffsetY + this.mapOffsetY * this.ey;
    }

    fireFrog(){
        
        //this.ninjutsuStart.resetSystem();
        this.enemyState = 2;
        this.scheduleOnce(()=>{
            this.enemyState = 1;
            this.face = 0;
            this.isFrog = true;
            this.getComponent(cc.Sprite).spriteFrame = this.frog;
            if(!this.anim.getAnimationState("firefrog_stay").isPlaying)
            this.anim.play("firefrog_stay");
            //this.HP_barNode.scale /= 1.5;
        }, 1.1);
        if(!this.anim.getAnimationState("ninjutsuStart").isPlaying){
            this.animateState = this.anim.play("ninjutsuStart");
        }
        
        //this.scheduleOnce(()=> { this.ninjutsuStart.stopSystem()}, 2);
        
        this.scheduleOnce(()=> {
            this.isFrog = false;
            //this.getComponent(cc.Sprite).spriteFrame = this.XsuWu;
            
            //this.scheduleOnce(()=>{this.enemyState = 0;this.face = 4;}, 2);
            this.enemyState = 0;
            this.face = 4;
            //this.HP_barNode.scale *= 1.5;
            //this.node.scaleX = 0.1;
            //this.node.scaleY = 0.1;
        }, 12);
        //this.ninjutsuStart.getComponent(cc.ParticleSystem).
    }

    moveToDes(posX: number, posY: number){
        
        let numOfBlockPlayerMoved, dir;
        /*
        if(posX < this.mapStartX){
            posX = this.mapStartX;
        }
        else if(posX > 18*this.mapOffsetX + this.enemyOffsetX){
            posX = 18*this.mapOffsetX + this.enemyOffsetX;
        }

        if(posY < this.mapStartY){
            posY = this.mapStartY;
        }
        else if(posY > 7*this.mapOffsetY + this.enemyOffsetY){
            posY = 7*this.mapOffsetY + this.enemyOffsetY
        }
        */
        this.isMoving = true;
        this.face += 4;
        if(this.node.x < posX){
            numOfBlockPlayerMoved = this.px - this.ex;
            dir = 1;
            
            if(!this.anim.getAnimationState("firefrog_moveright").isPlaying)
                this.anim.play("firefrog_moveright");
        }
        else if(this.node.x > posX){
            numOfBlockPlayerMoved = this.ex - this.px;
            dir = 3;
            if(!this.anim.getAnimationState("firefrog_moveleft").isPlaying)
                this.anim.play("firefrog_moveleft");
        }
        else if(this.node.y < posY){
            numOfBlockPlayerMoved = this.py - this.ey;
            dir = 2;
            if(!this.anim.getAnimationState("firefrog_stay_up").isPlaying)
                this.anim.play("firefrog_stay_up");
        }
        else if(this.node.y > posY){
            numOfBlockPlayerMoved = this.ey - this.py;
            dir = 0;
            if(!this.anim.getAnimationState("firefrog_stay").isPlaying)
                this.anim.play("firefrog_stay");
        }

        let action = cc.sequence(
            //cc.delayTime(1),
            cc.moveTo(0.3, posX, posY).easing(cc.easeInOut(2.0)),
            cc.delayTime(1)
            //cc.moveTo(0.3, -1 * posX, posY).easing(cc.easeInOut(2.0)),
            //cc.delayTime(1)
        );
        this.node.runAction(action);
        this.scheduleOnce(()=> { this.face -= 4;}, 0.3);
        this.scheduleOnce(()=> { this.isMoving = false;}, 1.3);
        //this.schedule(()=>{
            this.chongRay(numOfBlockPlayerMoved, dir);
        //}, 0.05);
        
    }

    
    

    makeChoice(){

        // 決定下一步要做甚麼
        if(this.enemyState == 0 && !this.isMoving){
            this.getComponent(cc.Sprite).spriteFrame = this.XsuWu;
            let waitTime = Math.floor(Math.random() * 10) % 5;
            this.enemyState = 7;
            //cc.log("waitTime = " + String(waitTime));
            
            this.scheduleOnce(()=>{
                this.fireFrog();
                //if(this.enemyState == 7) this.enemyState = 1;
            }, 4);
        }
        // move to the line where the player is
        else if(this.enemyState == 1 && !this.isMoving){

            if(this.px == this.ex && this.py != this.ey){
                if(this.ey < this.py){
                    //if(!this.anim.getAnimationState(""))
                    this.face = 2;
                }
                else if(this.ey > this.py){
                    this.face = 0;
                }
                this.moveToDes(this.node.x, this.playerY);
            }
            else if(this.py == this.ey && this.px != this.ex){
                if(this.ex < this.px){
                    //if(!this.anim.getAnimationState(""))
                    this.face = 1;
                }
                else if(this.ex > this.px){
                    this.face = 3;
                }
                this.moveToDes(this.playerX, this.node.y);
            }
            else if(this.px != this.ex && this.py != this.ey){
                let randomNum = Math.floor(Math.random() * 100);
                if(randomNum % 2){
                    if(this.px > this.ex){
                        this.face = 1;
                        randomNum %= 20;
                        if(this.ex + randomNum < 20) this.moveToDes(this.node.x + randomNum*this.mapOffsetX, this.node.y);
                        else this.moveToDes(this.playerX, this.node.y);
                    }
                    else if(this.px < this.ex){
                        this.face = 3;
                        randomNum %= 20;
                        if(this.ex > randomNum) this.moveToDes(this.node.x - randomNum*this.mapOffsetX, this.node.y);
                        else this.moveToDes(this.playerX, this.node.y);
                    }
                }
                else {
                    if(this.py > this.ey){
                        this.face = 2;
                        randomNum %= 9;
                        if(this.ey + randomNum < 9) this.moveToDes(this.node.x, this.node.y + randomNum*this.mapOffsetY);
                        else this.moveToDes(this.node.x, this.playerY);
                    }
                    else if(this.py < this.ey){
                        this.face = 0;
                        if(this.ey - randomNum > 0) this.moveToDes(this.node.x, this.node.y - randomNum*this.mapOffsetY);
                        else this.moveToDes(this.node.x, this.playerY);
                    }
                }
            }
            else if(this.px == this.ex && this.py == this.ey){
                //this.isPlayerOut = true;
                //this.tmpPlayerNode.getComponent(cc.Sprite).enabled = false;
                this.enemyState = 1;
            }
            
            // 如果不是火蛙就要變火蛙
            if(!this.isFrog  && !this.isMoving && this.enemyState == 3){
                this.enemyState = 0;
            }
        }
        
    }

    enemyHurt(p: number){
        this.enemyHP -= p;
        let m = 80 * p/500;
        if(this.HP_barNode.width > m){
            this.HP_barNode.width -= m;
        }
        else {
            //this.isDie = true;       
            this.HP_barNode.width = 0;
        }
    }

    enemyOut(){
        cc.log(this.node.name + " is out!");
        this.isOut = true;
        this.node.opacity = 0;
        this.enemyHurt(20);
        this.setRebornPos();

        this.scheduleOnce(()=>{
            this.isOut = false;
            this.node.opacity = 255;
            cc.log("stop");
        }, 5);
    }

    enemyDie(){
        this.node.scaleX = 1;
        this.isDie = true;
        this.getComponent(cc.Sprite).enabled = false;
        if(!this.dieNode.getComponent(cc.Animation).getAnimationState("die").isPlaying)
            //this.dieNode.scaleX = 1;
            this.dieNode.getComponent(cc.Animation).play("die");
        this.scheduleOnce(()=>{
            this.node.removeFromParent();
            //cc.director.loadScene("hall");

            this.mapNode.getComponent("map1").win();

        }, 1.94);
        
    }

    private chongRay/*「衝」光波*/(numOfBlockThePlayerMoved: number, dir: number) {
        //if(Math.abs(this.playerX-this.node.x-40) < 80 && Math.abs(this.playerY-this.node.y-40) < 80){
            cc.log(this.playerX);
            cc.log(this.playerY);
            cc.log(this.node.x);
            cc.log(this.node.y);
        //    this.tmpPlayerNode.getComponent("player").playerLoseBlood(1000);
        //}
        
        
        if(this.ex == this.px){
            if(dir == 0){
                if(this.ey - this.py <= numOfBlockThePlayerMoved+1){
                    // 有衝到
                    //this.tmpPlayerNode.opacity = 0;
                    this.isPlayerOut = true;
                    // 要改直接死亡
                    this.tmpPlayerNode.getComponent("player").playerLoseBlood(1000);
                    this.scheduleOnce(()=>{
                        this.isPlayerOut = false;
                    }, 5);
                }
            }
            else if(dir == 2){
                if(this.py - this.ey <= numOfBlockThePlayerMoved+1){
                    // 有衝到
                    //this.tmpPlayerNode.opacity = 0;
                    this.isPlayerOut = true;
                    // 要改直接死亡
                    this.tmpPlayerNode.getComponent("player").playerLoseBlood(1000);
                    this.scheduleOnce(()=>{
                        this.isPlayerOut = false;
                    }, 5);
                }
            }
        }
        else if(this.ey == this.py){
            if(dir == 1){
                if(this.px - this.ex <= numOfBlockThePlayerMoved+1){
                    // 有衝到
                    //this.tmpPlayerNode.opacity = 0;
                    this.isPlayerOut = true;
                    // 要改直接死亡
                    this.tmpPlayerNode.getComponent("player").playerLoseBlood(1000);
                    this.scheduleOnce(()=>{
                        this.isPlayerOut = false;
                    }, 5);
                }
            }
            
            else if(dir == 3){
                if(this.ex - this.px <= numOfBlockThePlayerMoved+1){
                    // 有衝到
                    //this.tmpPlayerNode.opacity = 0;
                    this.isPlayerOut = true;
                    // 要改直接死亡
                    this.tmpPlayerNode.getComponent("player").playerLoseBlood(1000);
                    this.scheduleOnce(()=>{
                        this.isPlayerOut = false;
                    }, 5);
                }
            }
        }
        
    }
}
