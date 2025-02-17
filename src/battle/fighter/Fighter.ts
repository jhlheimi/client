import { jk } from "../../interface";
import { Root } from "../Root";
import { AttributeComponent } from "./component/AttributeComponent";
import { BodyComponent } from "./component/BodyComponent";
import { MoveComponent } from "./component/MoveComponent";
import { RotationComponent } from "./component/RotationComponent";
import { Common } from "./Common";
import { TextComponent } from "./component/TextComponent";
import { Bullet145Component } from "./component/Bullet145Component";

export abstract class Fighter extends Common implements jk.fighter {
    // public camp: jk.camp
    public body: BodyComponent
    public attribute: AttributeComponent = new AttributeComponent();
    public move: MoveComponent
    public rotate: RotationComponent
    public init2(param: jk.fighterInitParam): Promise<this> {
        return new Promise((fulfilled, rejected) => {
            this.attribute.init(param.typeID)
            this.loadImage("resources/ui/common/xuanzekuang1_a.png")
            this.body = this.addChild(new BodyComponent())
            this.rotate = this.body.addComponent(RotationComponent)
            this.move = this.addComponent(MoveComponent)
            this.addChild(this.body)
            this.body.init(param.typeID).then(() => {
                this.collisinoType = param.collisinoType
                this.typeID = param.typeID
                this.anchorX = 0.5
                this.anchorY = 0.5
                // this.camp = param.camp
                this.typeID = param.typeID
                this.x = param.xy.x
                this.y = param.xy.y
                this.width = this.body.width
                this.height = this.body.height
                this.body.x = this.width / 2
                this.body.y = this.height / 2

                let text = this.addComponent(TextComponent)
                text.init(this, this.attribute)

                if (Root.config.npc[param.typeID].bulletID > 0) {
                    let bullet = this.addComponent(Bullet145Component.Generator)
                    bullet.init(Root.config.npc[param.typeID].bulletID, this)
                }
                this.rotate.init(this.body)
                this.move.init(this, 10)
                fulfilled(this)
            });
        });
    }
    public init(param: jk.fighterInitParam): Promise<this> {
        return new Promise((ok, on) => { })
    }
}