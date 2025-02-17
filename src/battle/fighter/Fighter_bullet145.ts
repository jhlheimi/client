import { jk } from "../../interface";
import { Root } from "../Root";
import { Common } from "./Common";
import { MoveComponent } from "./component/MoveComponent";
import { RigidBodyComponent_Bullet } from "./component/RigidBodyComponent_Bullet";
import { RotationComponent } from "./component/RotationComponent";
/**145子弹 直线子弹 */
export class Fighter_bullet145 extends Common implements jk.bullet {
    private host: jk.fighter
    public move: MoveComponent
    private rotate: RotationComponent
    public rigidbody: RigidBodyComponent_Bullet
    public init(typeID: number, host: jk.fighter, collisinoType: jk.collisionType): Promise<Fighter_bullet145> {
        return new Promise((fulfilled, rejected) => {
            this.move = this.addComponent(MoveComponent)
            this.rotate = this.addComponent(RotationComponent)
            this.rigidbody = this.addComponent(RigidBodyComponent_Bullet)
            this.loadImage(Root.config.bullet[typeID].皮肤地址, Laya.Handler.create(this, () => {
                this.collisinoType = collisinoType
                this.host = host
                this.typeID = typeID
                this.anchorX = 0.5
                this.anchorY = 0.5
                this.typeID = typeID
                this.x = host.x
                this.y = host.y
                this.rigidbody.init(collisinoType, this.sceneID, this)
                this.rotate.init(this)
                // console.log(this.host)
                this.rotate.角度 = this.host.body.rotation;
                this.move.init(this, Root.config.bullet[typeID].移动速度)
                this.move.startAngleMove(this)
                fulfilled(this)
            }))
        });
    }

}