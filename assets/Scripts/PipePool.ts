// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class PipePool extends cc.Component {
  @property({ type: cc.Prefab })
  public prefabPipes: cc.Prefab = null;

  @property({
    type: cc.Node,
  })
  public pipePoolHome: cc.Node;

  public pool = new cc.NodePool();

  public createPipe: cc.Node;

  initPool() {
    let initialCount = 3;

    for (let i = 0; i < initialCount; i++) {
      this.createPipe = cc.instantiate(this.prefabPipes);

      if (i === 0) {
        this.pipePoolHome.addChild(this.createPipe);
      } else {
        this.pool.put(this.createPipe);
      }
    }
  }

  addPool() {
    if (this.pool.size() > 0) {
      this.createPipe = this.pool.get();
    } else {
      this.createPipe = cc.instantiate(this.prefabPipes);
    }

    this.pipePoolHome.addChild(this.createPipe);
  }

  reset() {
    this.pipePoolHome.removeAllChildren();
    this.pool.clear();
    this.initPool();
  }
}
