// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import GameCtrl from './GameCtrl';

const { ccclass, property } = cc._decorator;

const random = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

@ccclass
export default class Pipes extends cc.Component {
  @property({ type: cc.Node, tooltip: 'top pipe' })
  public topPipe: cc.Node = null;

  @property({ type: cc.Node, tooltip: 'bottom pipe' })
  public bottomPipe: cc.Node = null;

  public tempStartLocationTop: cc.Vec3 = new cc.Vec3(0, 0, 0);
  public tempStartLocationBottom: cc.Vec3 = new cc.Vec3(0, 0, 0);
  public scene = cc.winSize;

  public game: GameCtrl; // speed of the pipes from GameCtrl
  public pipeSpeed: number; // final speed
  public tempSpeed: number; // temp pipe speed

  isPass: boolean;

  protected onLoad(): void {
    this.game = cc.find('Canvas').getComponent('GameCtrl');
    this.pipeSpeed = this.game.pipeSpeed;
    this.initPosition();
    this.isPass = false;
  }

  initPosition() {
    this.tempStartLocationTop.x = this.topPipe.width + this.scene.width;
    this.tempStartLocationBottom.x = this.bottomPipe.width + this.scene.width;

    let gap = random(90, 100);
    let topHeight = random(0, 450);

    this.tempStartLocationTop.y = topHeight;
    this.tempStartLocationBottom.y = topHeight - gap * 10;

    this.bottomPipe.setPosition(this.tempStartLocationBottom);
    this.topPipe.setPosition(this.tempStartLocationTop);
  }

  protected update(deltaTime: number): void {
    this.tempSpeed = this.pipeSpeed * deltaTime;

    this.tempStartLocationBottom = this.bottomPipe.position;
    this.tempStartLocationTop = this.topPipe.position;

    this.tempStartLocationBottom.x -= this.tempSpeed;
    this.tempStartLocationTop.x -= this.tempSpeed;

    this.bottomPipe.setPosition(this.tempStartLocationBottom);
    this.topPipe.setPosition(this.tempStartLocationTop);

    if (!this.isPass && this.topPipe.position.x <= 0) {
      this.isPass = true;
      this.game.passPipe();
    }

    if (this.topPipe.position.x < 0 - this.scene.width) {
      this.game.createPipe();
      this.destroy();
    }
  }
}
