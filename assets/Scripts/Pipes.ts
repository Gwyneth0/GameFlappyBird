import { _decorator, Component, Node, Vec3, screen, find, UITransform, math } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Pipes')
export class Pipes extends Component {
    @property(Node)
    private topPipe: Node;

    @property(Node)
    private bottomPipe: Node;

    private tempStartLocationUp: Vec3 = new Vec3(0, 0, 0);
    private tempStartLocationDown: Vec3 = new Vec3(0, 0, 0);
    private scene = screen.windowSize;
    private game;

    private pipeSpeed: number;
    private tempSpeed: number;

    isPass: boolean;

    //what to do when the pipes load
    onLoad() {
        this.game = find('GameCtrl').getComponent('GameCtrl')
        this.pipeSpeed = this.game.pipeSpeed;
        this.initPos();
        this.isPass = false;
    }

    //initial positions of the grounds
    initPos() {
        this.tempStartLocationUp.x = this.topPipe.getComponent(UITransform).width + this.scene.width;
        this.tempStartLocationDown.x = this.bottomPipe.getComponent(UITransform).width + this.scene.width;

        let gap = math.randomRangeInt(90, 100);
        let topHeight = math.randomRangeInt(0, 450);

        this.tempStartLocationUp.y = topHeight;
        this.tempStartLocationDown.y = (topHeight - (gap * 10));

        this.topPipe.setPosition(this.tempStartLocationUp.x, this.tempStartLocationUp.y);
        this.bottomPipe.setPosition(this.tempStartLocationDown.x, this.tempStartLocationDown.y);
    }

    //move the pipes as we update the game
    update(deltaTime: number) {
        this.tempSpeed = this.pipeSpeed * deltaTime;

        this.tempStartLocationDown = this.bottomPipe.position;
        this.tempStartLocationUp = this.topPipe.position;
        this.tempStartLocationDown.x -= this.tempSpeed;
        this.tempStartLocationUp.x -= this.tempSpeed;

        this.bottomPipe.setPosition(this.tempStartLocationDown);
        this.topPipe.setPosition(this.tempStartLocationUp);

        if (this.isPass == false && this.topPipe.position.x <= 0) {
            this.isPass = true;
            this.game.passPipe();
        };
        if (this.topPipe.position.x < (-640)) {
            this.destroy();
            this.game.createPipe();
        };
    }
}


