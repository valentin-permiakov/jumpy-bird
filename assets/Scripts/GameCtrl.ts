// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Bird from './Bird';
import BirdAudio from './BirdAudio';
import Ground from './Ground';
import PipePool from './PipePool';
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

  @property({ type: PipePool })
  public pipeQueue: PipePool;

  @property({ type: BirdAudio })
  public clip: BirdAudio;

  public isOver: boolean;

  protected onLoad(): void {
    this.initListener();
    this.result.resetScore();
    this.isOver = true;
    cc.director.pause();

    const physicsManager = cc.director.getPhysicsManager();
    physicsManager.enabled = true;
    physicsManager.debugDrawFlags =
      // 0;
      cc.PhysicsManager.DrawBits.e_aabbBit |
      // cc.PhysicsManager.DrawBits.e_pairBit |
      // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
      cc.PhysicsManager.DrawBits.e_jointBit |
      cc.PhysicsManager.DrawBits.e_shapeBit;

    const collisionManager = cc.director.getCollisionManager();
    collisionManager.enabled = true;
    collisionManager.enabledDebugDraw = true;
  }

  initListener() {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

    this.node.on(cc.Node.EventType.TOUCH_START, () => {
      if (this.isOver) {
        this.resetGame();
        this.bird.resetBird();
        this.startGame();
      } else {
        this.bird.fly();
        this.clip.onAudioQueue(0);
      }
    });
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
        break;

      case cc.macro.KEY.space:
        this.bird.fly();
        break;
    }
  }

  startGame() {
    this.result.hideResults();
    cc.director.resume();
  }

  gameOver() {
    this.result.showResults();
    this.isOver = true;
    this.clip.onAudioQueue(2);
    this.clip.onAudioQueue(3);
    cc.director.pause();
  }

  resetGame() {
    this.result.resetScore();
    this.pipeQueue.reset();
    this.isOver = false;
    this.startGame();
  }

  passPipe() {
    this.result.addScore();
    this.clip.onAudioQueue(1);
  }

  createPipe() {
    this.pipeQueue.addPool();
  }

  birdStruck() {
    if (this.bird.hitSomething) {
      this.gameOver();
    }
  }

  protected update(dt: number): void {
    if (!this.isOver) {
      this.birdStruck();
    }
  }
}
