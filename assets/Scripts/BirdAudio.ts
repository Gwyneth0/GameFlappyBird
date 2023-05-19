import { _decorator, Component, Node, AudioClip, AudioSource, assert, Button, Label, EventHandler } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("BirdAudio")
export class BirdAudio extends Component {
  @property({
    type: [AudioClip],
    tooltip: "place audio clip here",
  })
  private clips: AudioClip[] = [];
  @property({
    type: AudioSource,
    tooltip: "place audio node here",
  })
  private AudioSource: AudioSource;
  @property(AudioSource)
  private audioSource: AudioSource = null!;
  @property({
    type: Button,
    tooltip: 'Sound Button'
  })
  private soundButton: Button;
  onAudioQueue(index: number) {
    let clip: AudioClip = this.clips[index];
    this.audioSource.playOneShot(clip);
  }
  // turn off / turn on mute
  onLoad() {
    // assert(this.audioSource);
    // this.audioSource = this.audioSource;
  }
  onSoundButtonClick() {
    this.audioSource.volume = 1;
  }
  offSoundButtonClick() {
    this.audioSource.volume = 0;
  }

}
