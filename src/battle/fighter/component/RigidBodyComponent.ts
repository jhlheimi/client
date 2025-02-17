import { jk } from "../../../interface"
import { FighterManage } from "../FighterManage"



/**碰撞检测 模块 
 * 碰撞设置
 * 对敌子弹  group=-1 category=2 mask=1
 * 对敌n机体 group=-1 category=1 mask=-1
 * user子弹 group=-2 category=2 mask=-1
 * user机体 group=-2 category=1 mask=-1
*/
export class RigidBodyComponent extends Laya.Script {
    private rigidBody: Laya.RigidBody
    private boxCollider: Laya.BoxCollider
    public init(collisionType: jk.collisionType, hostSceneID: string, node: Laya.Sprite) {
        this.rigidBody = node.addComponent(Laya.RigidBody)
        this.boxCollider = node.addComponent(Laya.BoxCollider)
        if (collisionType === "userBullet") {
            //user子弹
            this.rigidBody.group = -2
            this.rigidBody.category = 2
            this.rigidBody.mask = -1
        } else if (collisionType === "npcBullet") {
            //npc子弹
            this.rigidBody.group = -1
            this.rigidBody.category = 2
            this.rigidBody.mask = 1
        } else if (collisionType === "npcBody") {
            //npc机体
            this.rigidBody.group = -1
            this.rigidBody.category = 1
            this.rigidBody.mask = -1
        } else if (collisionType === "userBody") {
            this.rigidBody.group = -2
            this.rigidBody.category = 1
            this.rigidBody.mask = -1
        }
        this.g刚体类型("kinematic")

        //设置碰撞刚体
        this.rigidBody.allowRotation = false;

        //设置碰撞机
        this.boxCollider.width = node.width
        this.boxCollider.height = node.height
        this.boxCollider.x = 0;
        this.boxCollider.y = 0;
        this.boxCollider.label = hostSceneID
        this.boxCollider.isSensor = true;
        
    }
    onDisable(): void {
        this.s死亡();
    }
    // onReset(): void {
    //     this.boxCollider.x = 0;
    // }
    public g刚体类型(type: "kinematic" | "static" | "dynamic") {
        this.rigidBody.type = type
    }
    public s死亡() {
        this.boxCollider.destroy()
        this.rigidBody.destroy();
    }
}