import { _decorator, Component, Node, Vec3, screen, find, math } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('Pipes')
export class Pipes extends Component {
    @property(Node)
    private topPipe: Node;

    @property(Node)
    private bottomPipe: Node;

    private scene = screen.windowSize;
    private game: any;

    private pipeSpeed = 200;

    isPass: boolean;

    //what to do when the pipes load
    protected onLoad(): void {
        this.Find();
        this.pipeSpeed = this.game.pipeSpeed;
        this.initPos();
        this.isPass = false;
    }

    //initial positions of the grounds
    protected initPos(): void {
        const pipeWidth = this.topPipe.width;
        const sceneWidth = this.scene.width;

        const gap = math.randomRangeInt(90, 100);
        const topHeight = math.randomRangeInt(0, 450);

        const topPipePosition = new Vec3(pipeWidth + sceneWidth, topHeight, 0);
        const bottomPipePosition = new Vec3(pipeWidth + sceneWidth, topHeight - (gap * 10), 0);

        this.topPipe.setPosition(topPipePosition);
        this.bottomPipe.setPosition(bottomPipePosition);

    }

    //move the pipes as we update the game
    protected update(deltaTime: number): void {
        const tempSpeed = this.pipeSpeed * deltaTime;

        const bottomPipePosition = this.bottomPipe.position.clone();
        bottomPipePosition.x -= tempSpeed;
        this.bottomPipe.setPosition(bottomPipePosition);

        const topPipePosition = this.topPipe.position.clone();
        topPipePosition.x -= tempSpeed;
        this.topPipe.setPosition(topPipePosition);


        if (this.isPass == false && this.topPipe.position.x <= 0) {
            this.isPass = true;
            this.game.createPipe();
            this.game.passPipe();
        }
        if (this.topPipe.position.x < (-640)) {
            this.destroy();

        }

    }
    private Find() {
        this.game = find('GameCtrl').getComponent('GameCtrl');
    }

}


