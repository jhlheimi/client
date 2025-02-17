import { FighterManage } from "../FighterManage";
import { RigidBodyComponent } from "./RigidBodyComponent";
export class RigidBodyComponent_Npc extends RigidBodyComponent {
    onTriggerEnter(other: Laya.ColliderBase, self: Laya.ColliderBase, contact?: any): void {
        if (other.label !== "obstacle") {
            console.log(`${FighterManage.getFighter(other.label).collisinoType}`)
            if (FighterManage.getFighter(other.label).collisinoType === "userBody") {
                //撞击伤害
                FighterManage.popFighter(self.label)
            }
        } else {
            FighterManage.popFighter(self.label)
        }
    }
}