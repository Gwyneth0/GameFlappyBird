import { _decorator, Component, Node, Vec3, UITransform, director, Canvas } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {
  
  @property(Node)
  ground1: Node;

  @property(Node)
  ground2: Node;

  @property(Node)
  ground3: Node;

  private groundWidths: number[] = [];
  private tempStartLocations: Vec3[] = [];
  private gameSpeed: number;
  
  protected onLoad(): void {
    this.startUp();
  }

  protected startUp(): void {
    this.groundWidths.push(this.ground1.width);
    this.groundWidths.push(this.ground2.width);
    this.groundWidths.push(this.ground3.width);

    this.tempStartLocations[0] = new Vec3(0, 0, 0);
    this.tempStartLocations[1] = new Vec3(this.groundWidths[0], 0, 0);
    this.tempStartLocations[2] = new Vec3(this.groundWidths[0] + this.groundWidths[1], 0, 0);

    this.ground1.setPosition(this.tempStartLocations[0]);
    this.ground2.setPosition(this.tempStartLocations[1]);
    this.ground3.setPosition(this.tempStartLocations[2]);
  }

  protected update(deltaTime: number): void {
    const canvas = director.getScene().getComponentInChildren(Canvas);
    const canvasWidth = canvas.getComponent(UITransform).width;
    this.gameSpeed = 200;
    for (let i = 0; i < 3; i++) {
      this.tempStartLocations[i].x -= this.gameSpeed * deltaTime;
      if (this.tempStartLocations[i].x <= - this.groundWidths[i]) {
        this.tempStartLocations[i].x = canvasWidth;
      }
      this[`ground${i + 1}`].setPosition(this.tempStartLocations[i]);
    }
  }
}
