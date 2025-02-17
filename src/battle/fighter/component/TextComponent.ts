import { jk } from "../../../interface";
import { AttributeComponent } from "./AttributeComponent";

export class TextComponent extends Laya.Script {
    private text: Laya.Text
    private attribute: AttributeComponent
    init(host: jk.fighter, attribute: AttributeComponent) {
        this.attribute = attribute
        this.text = new Laya.Text();
        this.text.color = "#ffffff"
        this.text.fontSize = 30;
        this.text.y=-30
        host.addChild(this.text)
    }
    onUpdate(): void {
        this.text.text = this.attribute.getAttr("x血量") + ""
    }
}