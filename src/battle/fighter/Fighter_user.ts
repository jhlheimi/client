import { jk } from "../../interface";
import { Fighter } from "./Fighter";
import { RigidBodyComponent } from "./component/RigidBodyComponent";
export class Fighter_user extends Fighter {
    public rigidbody: RigidBodyComponent
    public init(param: jk.fighterInitParam): Promise<this> {
        return new Promise((ok, on) => {
            this.init2(param).then(() => {
                this.rigidbody = this.body.addComponent(RigidBodyComponent)
                this.rigidbody.init("userBody", this.sceneID, this.body)
                ok(this)
            })
        })
    }
}