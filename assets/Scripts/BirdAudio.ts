import { _decorator, Component, Node, AudioClip, AudioSource, assert, Button, Label, EventHandler } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("BirdAudio")
export class BirdAudio extends Component {

  @property([Audio])
  private clips: AudioClip[] = [];

  @property(AudioSource)
  private audioSource: AudioSource = null!;

  @property(Node)
  private Mute: Node;
  
  @property(Node)
  private unMute: Node;
  
  public onAudioQueue(index: number) {
    let clip: AudioClip = this.clips[index];
    this.audioSource.playOneShot(clip);
  }
  
  // turn on volume
  protected onSoundButtonClick() {
    this.audioSource.volume = 1;
    this.unMute.active = false;
    this.Mute.active = true;
  
  }

  // turn off volume
  protected offSoundButtonClick() {
    this.audioSource.volume = 0;
    this.Mute.active = false;
    this.unMute.active = true;
  }

}
