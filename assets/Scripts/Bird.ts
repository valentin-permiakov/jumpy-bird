// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Bird extends cc.Component {
  @property({
    type: cc.Float,
    tooltip: 'how hight the bird can fly',
  })
  public jumpHeight: number = 3.5;

  @property({
    type: cc.Float,
    tooltip: 'how long the bird can fly',
  })
  public jumpDuration: number = 3.5;

  public birdAnimation: cc.Animation;
  public birdLocation: cc.Vec3;

  protected onLoad(): void {
    this.resetBird();

    this.birdAnimation = this.getComponent(cc.Animation);
  }

  resetBird() {
    this.birdLocation = new cc.Vec3(0, 0, 0);

    this.node.setPosition(this.birdLocation);
  }

  fly() {
    this.birdAnimation.stop();

    cc.tween(this.node)
      .to(
        this.jumpDuration,

        {
          position: cc.v3(
            this.node.position.x,
            this.node.position.y + this.jumpHeight,
            0
          ),
        },
        { easing: 'smooth' }
      )
      .start();

    this.birdAnimation.play();
  }
}
