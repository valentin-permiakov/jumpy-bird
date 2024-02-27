// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Results extends cc.Component {
  @property({ type: cc.Label })
  public scoreLabel: cc.Label;

  @property({ type: cc.Label })
  public highScore: cc.Label;

  @property({ type: cc.Label })
  public resultEnd: cc.Label;

  maxScore: number = 0;
  currentScore: number;

  updateScore(num: number) {
    this.currentScore = num;

    this.scoreLabel.string = '' + this.currentScore;
  }

  resetScore() {
    this.updateScore(0);
    this.hideResults();
  }

  addScore() {
    this.updateScore(this.currentScore + 1);
  }

  showResults() {
    this.maxScore = Math.max(this.maxScore, this.currentScore);
    this.highScore.string = 'High score ' + this.maxScore;

    this.resultEnd.node.active = true;
    this.highScore.node.active = true;
  }

  hideResults() {
    this.highScore.node.active = false;
    this.resultEnd.node.active = false;
  }
}
