// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Ground from './Ground';
import Results from './Results';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameCtrl extends cc.Component {
  @property({ type: Ground, tooltip: 'this is ground' })
  public ground: Ground;

  @property({ type: Results, tooltip: 'results here' })
  public result: Results;

  @property({ type: cc.Integer })
  public speed: number = 300;

  @property({ type: cc.Integer })
  public pipeSpeed: number = 200;

  protected onLoad(): void {
    this.initListener();
    this.result.resetScore();
    cc.director.pause();
  }

  initListener() {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
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
