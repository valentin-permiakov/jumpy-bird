// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class BirdAudio extends cc.Component {
  @property({ type: [cc.AudioClip] })
  public clips: cc.AudioClip[] = [];

  onAudioQueue(index: number) {
    const clip: cc.AudioClip = this.clips[index];
    cc.audioEngine.play(clip, false, 1);
  }

  protected onLoad(): void {
    const clip: cc.AudioClip = this.clips[4];
    cc.audioEngine.playMusic(clip, true);
  }

  onMute() {
    console.log(cc.audioEngine.isMusicPlaying());
    if (cc.audioEngine.isMusicPlaying()) cc.audioEngine.stopAll();
    else cc.audioEngine.playMusic(this.clips[4], true);
  }
}
