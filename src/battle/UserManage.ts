import { jk } from "../interface"
import { utils } from "../utils"
import { Root } from "./Root"
import { FighterManage } from "./fighter/FighterManage"
import { Fighter_user } from "./fighter/Fighter_user"

export class UserManage {
    private root: Root
    private j交换对象1: j交换框 | null
    private j交换对象2: j交换框 | null
    public j交换框List: j交换框[]
    constructor() {
        this.j交换对象1 = null
        this.j交换对象2 = null
        this.j交换框List = []
    }
    public init(root: Root, fighterID: number[]) {
        this.root = root;
        this.j交换框List = []
        for (let i = 0; i < this.root.d道路列表.length; i++) {
            let sp: j交换框 = new j交换框(i)
            // console.log(111111111111)
            sp.loadImage("resources/ui/common/xuanzekuang1.png", Laya.Handler.create(null, () => {
                sp.anchorX = 0.5;
                sp.anchorY = 0.5
                sp.x = this.root.d道路列表[i].x
                sp.positionID = i
                sp.y = Laya.stage.height - 230;
                sp.on(Laya.Event.MOUSE_DOWN, this, this.mouseEvent, [sp])
                this.j交换框List.push(sp)
                this.root.owner.getChildByName("npc").addChild(sp)
            }))
        }


        //=========================基地=========================
        //=========================基地=========================

        // let base = Laya.Pool.getItemByClass("user", AvFighterBase)
        // base.init(10099, "user", "fighter", { x: 0, y: 0 }).then(() => {
        //     base.x = Laya.stage.width / 2
        //     base.y = Laya.stage.height - base.height / 2
        //     Root.aerocraftAdd(base)
        //     Root.node("npc").addChild(base)
        // })
        // let user_fighter = FighterManage.createFighter(Fighter_user)
        // // console.log("user_fighter",)
        // FighterManage.addList(user_fighter, "user")
        //=========================基地=========================
        //=========================基地=========================

        //============战斗战机=============
        Laya.timer.once(100, null, () => {
            for (let i = 0; i < fighterID.length; i++) {
                this.z增加战机(fighterID[i]);
            }
            let user_fighter = FighterManage.createFighter(Fighter_user)
            // console.log("user_fighter",)
            FighterManage.addList(user_fighter)
            user_fighter.init({ xy: { x: 0, y: 0 }, typeID: 10000, collisinoType: "userBody" }).then((ent) => {
                ent.x = this.root.d道路列表[1].x
                ent.y = 1000
            })
        })
    }
    private c查找空位(): j交换框 {
        let xx: j交换框 | null = null
        for (let i = 0; i < this.j交换框List.length; i++) {
            if (!this.j交换框List[i].npc) {
                xx = this.j交换框List[i]
                break;
            }
        }
        return xx;
    }
    public z增加战机(typeID: number): Promise<Fighter_user> {
        return new Promise((ok, no) => {
            let jhk = this.c查找空位()
            if (jhk) {
                let user_fighter = FighterManage.createFighter(Fighter_user)
                FighterManage.addList(user_fighter)
                user_fighter.init({ xy: { x: 0, y: 0 }, typeID: typeID, collisinoType: "userBody" }).then((ent) => {
                    ent.x = jhk.x
                    ent.y = jhk.y
                })
                jhk.npc = user_fighter
                ok(user_fighter)
            }
        })
    }
    private j交换位置() {
        console.log("j交换位置")
        if (this.j交换对象1 && this.j交换对象2) {
            let j1 = this.j交换对象1
            let j2 = this.j交换对象2
            let id1 = this.j交换对象1.positionID
            let id2 = this.j交换对象2.positionID
            this.j交换对象1.positionID = id2
            this.j交换对象2.positionID = id1
            let speed = Math.floor(utils.distance(j1.x, j1.y, j2.x, j2.y) * 2)
            j1.off(Laya.Event.MOUSE_DOWN, this, this.mouseEvent, [j1])
            j2.off(Laya.Event.MOUSE_DOWN, this, this.mouseEvent, [j1])
            // j1.t停止攻击()
            // j2.t停止攻击()

            j1.moveStart()
            Laya.Tween.to(j1, { x: this.root.d道路列表[id2].x }, speed, null, Laya.Handler.create(null, () => {
                j1.on(Laya.Event.MOUSE_DOWN, this, this.mouseEvent, [j1])
                j1.moveStop()
                // j1.alpha = 0.5
                // j1.k开始攻击()
            }))
            j2.moveStart()
            Laya.Tween.to(j2, { x: this.root.d道路列表[id1].x }, speed, null, Laya.Handler.create(null, () => {
                j2.on(Laya.Event.MOUSE_DOWN, this, this.mouseEvent, [j2])
                j2.moveStop()
                // j2.k开始攻击()
                // j2.alpha = 0.5
            }))

            this.j交换对象1 = null
            this.j交换对象2 = null
        }
    }
    private mouseEvent(sp: j交换框) {
        if (this.j交换对象1) {
            if (this.j交换对象1 === sp) {
                this.j交换对象1 = null
                // sp.body.alpha = 0.5
            } else {
                this.j交换对象2 = sp
                // sp.body.alpha = 1;
            }
        } else {
            this.j交换对象1 = sp
            // sp.body.alpha = 1
            // this.x选择框
        }
        this.j交换位置();
        console.log("点击了:", sp.positionID)
    }
}
class j交换框 extends Laya.Sprite {
    positionID: number
    npc: Fighter_user | null
    constructor(positionID: number) {
        super()
        this.positionID = positionID
        this.npc = null
    }
    public loop() {
        if (this.npc) {
            this.npc.x = this.x
            this.npc.y = this.y
        }
    }
    public moveStart() {
        Laya.timer.loop(16, this, this.loop)
    }
    public moveStop() {
        Laya.timer.clear(this, this.loop)
        if (this.npc) {
            this.npc.x = this.x
            this.npc.y = this.y
        }
    }
}