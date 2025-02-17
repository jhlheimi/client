import { jk } from "../../interface"
import { Root } from "../Root";
import { Fighter_bullet145 } from "./Fighter_bullet145";
import { Fighter_npc } from "./Fighter_npc";
import { Fighter_user } from "./Fighter_user";
// let allFighter = {
//     Fighter_npc: Fighter_npc,
//     Fighter_user: Fighter_user,
//     Fighter_bullet145: Fighter_bullet145
// }
type cls = Fighter_npc | Fighter_user | Fighter_bullet145

export class FighterManage {
    private static _sceneID: number = 10000
    private static showNode: Laya.Sprite
    private static fighterList: {
        npcBody: { [sceneID: string]: cls },
        userBody: { [sceneID: string]: cls },
        all: { [sceneID: string]: cls }
    }
    /**创建飞行器
     * 
     * @param cls 
     * @returns 
     */
    public static createFighter<T extends new (...args: any[]) => any>(cls: T, ...args: ConstructorParameters<T>): InstanceType<T> {
        this._sceneID++;
        let fig = Laya.Pool.getItemByClass(cls.name, cls)
        fig.sceneID = this._sceneID + ""
        // console.log("fig.sceneID",fig.sceneID)
        Root.node("npc").addChild(fig)
        return fig
    }
    public static addList(npc: cls) {
        if (npc.collisinoType === "npcBody" || npc.collisinoType === "userBody") {
            this.fighterList[npc.collisinoType][npc.sceneID] = npc
        }
        this.fighterList.all[npc.sceneID] = npc
    }

    public static getFighterAll(collisinoType: jk.collisionType) {
        if (collisinoType === "npcBody" || collisinoType === "userBody") {
            return this.fighterList[collisinoType]
        }
    }
    public static getFighter(sceneID: string) {
        if (this.fighterList.all[sceneID]) return this.fighterList.all[sceneID]
        return null
    }
    /**删除飞行器
     * 
     * @param sceneID 
     */
    public static popFighter(sceneID: string) {
        if (this.fighterList.all[sceneID]) {
            if (this.fighterList.all[sceneID].collisinoType === "npcBody") {
                delete this.fighterList["npcBody"][sceneID]
            } else if (this.fighterList.all[sceneID].collisinoType === "userBody") {
                delete this.fighterList["userBody"][sceneID]
            }
            this.fighterList.all[sceneID].state = "die"
            delete this.fighterList.all[sceneID]
        }

    }
    public static init(node: Laya.Sprite) {
        this.showNode = node
        this._sceneID = 10000
        this.fighterList = { npcBody: {}, userBody: {}, all: {} }
    }
}