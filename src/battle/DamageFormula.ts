import { AttributeComponent } from "./fighter/component/AttributeComponent";

export class DamageFormula {
    public static physicalDamage(g攻: AttributeComponent, s受: AttributeComponent) {
        let num = g攻.getAttr("w物理伤害") - Math.floor((s受.getAttr("w物理抗性") * 0.23))
        num > 0 ? s受.setAttr("x血量", s受.getAttr("x血量") - num) : null
    }
    public static magicalDamage(g攻: AttributeComponent, s受: AttributeComponent) {
        let num = g攻.getAttr("m魔法伤害") - Math.floor((s受.getAttr("m魔法抗性") * 0.23))
        num > 0 ? s受.setAttr("x血量", s受.getAttr("x血量") - num) : null
    }
}