import { jk } from "../interface"
import { Root } from "./Root"
import { FighterManage } from "./fighter/FighterManage"
import { Fighter_npc } from "./fighter/Fighter_npc"

export class NpcManage {
    private b波次: number
    private b波次间隔时间: number
    private y一组怪数量: number
    private j阶段: number
    private j阶段间隔时间: number
    private s剩余时间: number
    private sceneIDnum: number
    private root: Root
    constructor() {
        this.sceneIDnum = 0;
        this.b波次 = 0
        this.b波次间隔时间 = 0
        this.y一组怪数量 = 0
        this.j阶段 = 0
        this.j阶段间隔时间 = 0
        this.s剩余时间 = 0
    }
    public init(data: any, root: Root) {
        this.root = root
        if (data.g关卡 === 1) {
            this.b波次 = data.b波次
            this.j阶段 = data.j阶段
            this.s剩余时间 = data.s剩余时间
            //其他数据读表
            this.z增加物怪(20000, "npc", { x: this.root.d道路列表[Math.floor(Math.random() * 5)].x + Math.random() * 24, y: 350 });
            // Laya.timer.loop(5000, null, () => {
            //     let num = Math.floor(Math.random() * 10)
            //     for (let i = 0; i < num; i++) {
            //         this.z增加物怪(20000, "npc", { x: this.root.d道路列表[Math.floor(Math.random() * 5)].x + Math.random() * 24, y: 150 });
            //     }
            // })
            // this.k开始刷怪();


        }
    }
    public z增加物怪(typeID: number, camp: jk.camp, xy: jk.position): Promise<Fighter_npc> {
        return new Promise((ok, no) => {
            let npc = FighterManage.createFighter(Fighter_npc)
            FighterManage.addList(npc)
            npc.init({ xy: xy, typeID: typeID,collisinoType:"npcBody" }).then(() => {
                ok(npc)
            })
            // let obj = Laya.Pool.getItemByClass("Npc", AvFighterNpc)
            // obj.init(typeID, camp, objType, xy).then(() => {
            //     Root.aerocraftAdd(obj)
            //     Root.node("npc").addChild(obj)
            //     ok(obj)
            // })
        })
    }
}