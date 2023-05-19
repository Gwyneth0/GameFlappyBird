import { _decorator, Component, Node, director, Contact2DType, Collider2D, IPhysics2DContact, Button, EventKeyboard, KeyCode, find, Color, Sprite } from 'cc';
const { ccclass, property } = _decorator;

import { Results } from './Results';
import { Bird } from './Bird';
import { PipePool } from './PipePool';
import { BirdAudio } from './BirdAudio';
import { BirdColor } from './OptionScript/BirdColor';

@ccclass('GameCtrl')
export class GameCtrl extends Component {
  @property
  private Speed: number = 200;

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

  private isOver: boolean;

  // Things to do when the game loads
  protected onLoad() {
    this.initListener();
    this.result.resetScore();
    this.isOver = true;
    director.pause();

    // Bird color
    const nodeColor = find('Color');
    const colerParam = nodeColor.getComponent(BirdColor);

    const sprite = this.bird.getComponent(Sprite);
    if (colerParam.Green) {
      sprite.color = Color.GREEN;
    } else if (colerParam.Red) {
      sprite.color = Color.RED;
    }
  }

  // Initialize event listener
  protected initListener() {
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
  protected gameOver() {
    this.result.showResult();
    this.isOver = true;
    this.clip.onAudioQueue(3);
    director.pause();
  }

  // Reset the game state
  protected resetGame() {
    this.result.resetScore();
    this.pipeQueue.reset();
    this.isOver = false;
    this.startGame();
  }

  // Start the game
  protected startGame() {
    this.result.hideResult();
    director.resume();
  }

  // Handle logic when a pipe is passed
  protected passPipe() {
    this.result.addScore();
    this.clip.onAudioQueue(2);
  }

  // Create a new pipe
  protected createPipe() {
    this.pipeQueue.addPool();
  }

  // Set up contact detection between the bird and objects
  protected contactGroundPipe() {
    const collider = this.bird.getComponent(Collider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }

  // Handle collision detection
  protected onBeginContact(_selfCollider: Collider2D, _otherCollider: Collider2D, _contact: IPhysics2DContact | null) {
    this.bird.hitSomething = true;
    this.clip.onAudioQueue(1);
  }

  // Check if the bird has been hit and trigger game over if necessary
  protected birdStruck() {
    this.contactGroundPipe();
    if (this.bird.hitSomething) {
      this.gameOver();
    }
  }

  // Update function called every frame
  protected update() {
    if (!this.isOver) {
      this.birdStruck();
    }
  }
  // pause game
  btnpauseGame(){
    director.pause();
    this.btnPauseGame.active = true;
    this.btnResume.active =false;
  }
  btnResumePlay(){
    director.resume();
    this.btnResume.active = true;
    this.btnPauseGame.active = false;

  }
}
