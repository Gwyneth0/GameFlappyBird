import { _decorator, Component, Node, director, Contact2DType, Collider2D, IPhysics2DContact, Button, EventKeyboard, KeyCode, find, Color, Sprite, AudioSource, assert } from 'cc';
const { ccclass, property } = _decorator;

import { Results } from './Results';
import { Bird } from './Bird';
import { PipePool } from './PipePool';
import { BirdAudio } from './BirdAudio';
import { BirdColor } from './OptionScript/BirdColor';

@ccclass('GameCtrl')
export class GameCtrl extends Component {

  @property
  private pipeSpeed: number = 200;

  @property(Results)
  private result: Results;

  @property(Bird)
  private bird: Bird;

  @property(PipePool)
  private pipeQueue: PipePool;

  @property(BirdAudio)
  private clip: BirdAudio;

  @property(Node)
  private btnPauseGame: Node;

  @property(Node)
  private btnResume: Node;

  @property(Node)
  private Mute: Node;

  @property(Node)
  private unMute: Node;

  @property(AudioSource)
  private audioSource: AudioSource;


  private isOver: boolean;
  static Speed: number;

  // Things to do when the game loads
  protected onLoad(): void {
    this.initListener();
    this.result.resetScore();
    this.isOver = true;
    director.pause();

    // Bird color
    const colerParam = find('Color').getComponent(BirdColor);
    const sprite = this.bird.getComponent(Sprite);
    if (colerParam.Green) {
      sprite.color = Color.GREEN;
    } else if (colerParam.Red) {
      sprite.color = Color.RED;
    }
  }

  // Initialize event listener
  protected initListener(): void {
    this.node.on(Node.EventType.TOUCH_START, () => {
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

  // Game over logic
  protected gameOver(): void {
    this.result.showResult();
    this.isOver = true;
    this.clip.onAudioQueue(3);
    director.pause();
  }

  // Reset the game state
  protected resetGame(): void {
    this.result.resetScore();
    this.pipeQueue.reset();
    this.isOver = false;
    this.startGame();
  }

  // Start the game
  protected startGame(): void {
    this.result.hideResult();
    director.resume();
  }

  // Handle logic when a pipe is passed
  protected passPipe(): void {
    this.result.addScore();
    this.clip.onAudioQueue(2);
  }

  // Create a new pipe
  protected createPipe() {
    this.pipeQueue.addPool();
  }

  // Set up contact detection between the bird and objects
  protected contactGroundPipe(): void {
    const collider = this.bird.getComponent(Collider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }

  // Handle collision detection
  protected onBeginContact(_selfCollider: Collider2D, _otherCollider: Collider2D, _contact: IPhysics2DContact | null): void {
    this.bird.hitSomething = true;
    this.clip.onAudioQueue(1);
  }

  // Check if the bird has been hit and trigger game over if necessary
  protected birdStruck(): void {
    this.contactGroundPipe();
    if (this.bird.hitSomething) {
      this.gameOver();
    }
  }

  // Update function called every frame
  protected update(): void {
    if (!this.isOver) {
      this.birdStruck();
    }
  }

  // pause game
  protected btnpauseGame(): void {
    director.pause();
    this.btnPauseGame.active = false;
    this.btnResume.active = true;
  }

  // resume game 
  protected btnResumePlay(): void {
    director.resume();
    this.btnPauseGame.active = true;
    this.btnResume.active = false;
  }

  // turn offback ground music
  turnOffMusicBackground() {
    this.audioSource.volume = 0;
    this.Mute.active = false;
    this.unMute.active = true;
  }

  //turn on back ground music
  turnonMusicBackground() {
    this.audioSource.volume = 1;
    this.unMute.active = false;
    this.Mute.active = true;
  }

}
