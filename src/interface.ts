/**
 * 接口
 */
export namespace jk {
    export interface position {
        x: number
        y: number
    }
    /**碰撞类型 */
    export type collisionType = "npcBody" | "npcBullet" | "userBody" | "userBullet"
    export type RootShowNode = "npc" | "bullet" | "map"
    export type camp = "user" | "npc"
    export type state = "idling" | "die" | "battle"
    export type attributeName =
        "x血量" |
        "x血量上限" |
        "x吸血" |
        "x血量恢复" |
        "n能量" |
        "n能量上限" |
        "n能量恢复" |
        "w物理抗性" |
        "m魔法抗性" |
        "m命中" |
        "s闪避" |
        "w物理伤害" |
        "m魔法伤害" |
        "y移动速度" |
        "h回血速度" |
        "j急速"
    export type attributeComponent = {
        [key in attributeName]: attributeName
    }
    export interface common extends Laya.Sprite {
        state: state;
        sceneID: string
        typeID: number
        collisinoType: jk.collisionType
    }
    export interface fighterInitParam {
        typeID: number
        // camp: jk.camp
        xy: jk.position
        collisinoType: jk.collisionType
    }
    export interface fighter extends common {

        // camp: camp
        body?: Laya.Sprite
        init(...args: any): void
    }

    export interface bullet extends common { }
}