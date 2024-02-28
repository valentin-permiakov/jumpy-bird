// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Bird from './Bird';
import Ground from './Ground';
import Results from './Results';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameCtrl extends cc.Component {
  @property({ type: Ground, tooltip: 'this is ground' })
  public ground: Ground = null;

  @property({ type: Results, tooltip: 'results here' })
  public result: Results = null;
  @property({ type: Bird, tooltip: 'this is the bird' })
  public bird: Bird = null;

  @property({ type: cc.Integer })
  public speed: number = 300;

  @property({ type: cc.Integer })
  public pipeSpeed: number = 200;

  protected onLoad(): void {
    this.initListener();
    this.result.resetScore();
    cc.director.pause();

    const physicsManager = cc.director.getPhysicsManager();
    physicsManager.enabled = true;
    physicsManager.debugDrawFlags =
      // 0;
      // cc.PhysicsManager.DrawBits.e_aabbBit |
      // cc.PhysicsManager.DrawBits.e_pairBit |
      // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
      cc.PhysicsManager.DrawBits.e_jointBit |
      cc.PhysicsManager.DrawBits.e_shapeBit;
  }

  initListener() {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

    this.node.on(
      cc.Node.EventType.MOUSE_DOWN,
      function () {
        this.bird.fly();
      },
      this
    );
  }

  //   testing method, delete me in final version
  onKeyDown(event: KeyboardEvent) {
    switch (event.keyCode) {
      case cc.macro.KEY.a:
        this.gameOver();
        break;

      case cc.macro.KEY.p:
        this.result.addScore();
        break;

      case cc.macro.KEY.q:
        this.resetGame();
        this.bird.resetBird();
    }
  }

  startGame() {
    this.result.hideResults();
    cc.director.resume();
  }

  gameOver() {
    this.result.showResults();
    cc.director.pause();
  }

  resetGame() {
    this.result.resetScore();
    this.startGame();
  }
}
