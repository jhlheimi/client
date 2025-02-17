import { jk } from "../../../interface"
/**旋转 */
export class RotationComponent extends Laya.Script {
    public host:Laya.Sprite
    public 当前角度: number = 0
    private _期望角度: number = 0
    public 是否旋转: boolean = false
    private _逆时方向: boolean = false
    public 旋转速度: number = 1
    public init(host: Laya.Sprite) {
        this.host = host
        // this.期望角度 = -5
    }
    get 角度() { return this.host.rotation }
    set 角度(value: number) {
        this.host.rotation = value
    }
    /**旋转方向 */
    get 逆时方向() { return this._逆时方向 }
    get 期望角度() { return this._期望角度 }
    set 期望角度(value: number) {
        this.是否旋转 = true;
        this._期望角度 = value
        if ((value - this.当前角度 + 360) % 360 < (this.当前角度 - value + 360) % 360) {
            this._逆时方向 = true
        } else {
            this._逆时方向 = false;
        }
        this.rotate(this._期望角度)
    }
    // onUpdate(): void {
    //     if (this.是否旋转) {
    //         if (this.逆时方向) {
    //             this.角度 += 1
    //             if (this.期望角度 <= this.角度) {
    //                 this.是否旋转 = false;

    //             }
    //         } else {
    //             this.角度 -= 1
    //             if (this.期望角度 >= this.角度) {
    //                 this.是否旋转 = false;
    //             }
    //         }
    //     }
    // }
    /**旋转 */
    public rotate(角度: number): Promise<boolean> {
        Laya.timer.clear(this, this._statr)
        return new Promise((ok, no) => {
            this.期望角度 = 角度
            Laya.timer.loop(20, this, this._statr, [ok])
        });
    }
    private _statr(ok: any) {
        if (this.逆时方向) {
            this.角度 += this.旋转速度
            if (this.期望角度 <= this.角度) {
                this.是否旋转 = false;
                ok(true)
                Laya.timer.clear(this, this._statr)
            }
        } else {
            this.角度 -= this.旋转速度
            if (this.期望角度 >= this.角度) {
                this.是否旋转 = false;
                ok(true)
                Laya.timer.clear(this, this._statr)
            }
        }
    }
}