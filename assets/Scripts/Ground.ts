// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
const { ccclass, property } = cc._decorator;

@ccclass
export default class Ground extends cc.Component {
  @property(cc.Node)
  public ground1: cc.Node = null;
  @property(cc.Node)
  public ground2: cc.Node = null;
  @property(cc.Node)
  public ground3: cc.Node = null;

  // create ground width
  public groundWidth1: number;
  public groundWidth2: number;
  public groundWidth3: number;

  public tempStartLocarion1 = new cc.Vec3();
  public tempStartLocarion2 = new cc.Vec3();
  public tempStartLocarion3 = new cc.Vec3();

  public gameSpeed: number = 50;

  protected onLoad(): void {
    this.startUp();
  }

  startUp() {
    this.groundWidth1 = this.ground1.width;
    this.groundWidth2 = this.ground2.width;
    this.groundWidth3 = this.ground3.width;

    this.tempStartLocarion1.x = 0;
    this.tempStartLocarion2.x = this.groundWidth1;
    this.tempStartLocarion3.x = this.groundWidth1 + this.groundWidth2;

    this.ground1.setPosition(this.tempStartLocarion1);
    this.ground2.setPosition(this.tempStartLocarion2);
    this.ground3.setPosition(this.tempStartLocarion3);
  }

  update(deltaTime: number) {
    this.tempStartLocarion1 = this.ground1.position;
    this.tempStartLocarion2 = this.ground2.position;
    this.tempStartLocarion3 = this.ground3.position;

    // get the speed and subtract it
    this.tempStartLocarion1.x -= this.gameSpeed * deltaTime;
    this.tempStartLocarion2.x -= this.gameSpeed * deltaTime;
    this.tempStartLocarion3.x -= this.gameSpeed * deltaTime;

    const scene = cc.director.getScene();
    const canvas = scene.getComponentInChildren(cc.Canvas);

    if (this.tempStartLocarion1.x <= 0 - this.groundWidth1) {
      this.tempStartLocarion1.x = canvas.node.width;
    }

    if (this.tempStartLocarion2.x <= 0 - this.groundWidth2) {
      this.tempStartLocarion2.x = canvas.node.width;
    }

    if (this.tempStartLocarion3.x <= 0 - this.groundWidth3) {
      this.tempStartLocarion3.x = canvas.node.width;
    }

    this.ground1.setPosition(this.tempStartLocarion1);
    this.ground2.setPosition(this.tempStartLocarion2);
    this.ground3.setPosition(this.tempStartLocarion3);
  }
}
