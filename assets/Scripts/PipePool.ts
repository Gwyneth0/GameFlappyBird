import { _decorator, Component, Node, Prefab, NodePool, instantiate, math } from 'cc';
import { Results } from './Results';
import { Bird } from './Bird';
const { ccclass, property } = _decorator;

@ccclass('PipePool')
export class PipePool extends Component {

    @property(Prefab)
    private prefabPipes: Prefab = null;

    @property(Node)
    private pipePoolHome: Node = null;

    private pool: NodePool = new NodePool();
    private createPipe: Node = null;

    pipeNode: Node = null;

    // pipe: Node[] = [null, null, null];

    // @property({
    //     type: Results,
    //     tooltip: 'Result'
    // })
    // public result: Results;

    // @property({
    //     type: Bird,
    //     tooltip: 'Bird'
    // })
    // public BirdCtr: Bird

    //Initialize the object pool with initial pipes
    protected initPool(): void {
        for (let i = 0; i < 3; i++) {
            const createPipe = instantiate(this.prefabPipes);
            if (i == 0) {
                this.pipePoolHome.addChild(createPipe);
            } else {
                this.pool.put(createPipe);
            }
        }
    }

    //Add a new pipe to the pool or instantiate a new one if the pool is empty
    public addPool(): void {
        if (this.pool.size() > 0) {
            this.createPipe = this.pool.get();
        } else {
            this.createPipe = instantiate(this.prefabPipes);
        }
        this.pipePoolHome.addChild(this.createPipe);
    }

    //Reset the pipe pool by removing all pipes and clearing the pool
    public reset(): void {
        this.pipePoolHome.removeAllChildren();
        this.pool.clear();
        this.initPool();
    }

    // protected createPipes(): void {
    //     for (let i = 0; i < this.pipe.length; i++) {

    //         this.pipe[i] = instantiate(this.prefabPipes);
    //         this.pipeNode.addChild(this.pipe[i]);

    //         var posX = this.pipe[i].position.x;
    //         var posY = this.pipe[i].position.y;

    //         posX = 500 + (400 * i);

    //         var minY = -360;
    //         var maxY = -720;

    //         posY = math.randomRangeInt(minY, maxY);

    //         this.pipe[i].setPosition(posX, posY, 0);
    //     }
    // }

    // protected movePipes(): void {
    //     for (let i = 0; i < this.pipe.length; i++) {

    //         var posX = this.pipe[i].position.x;
    //         var posY = this.pipe[i].position.y;

    //         posX -= 1.0;

    //         //check pass pipe, add score
    //         var posBird = this.BirdCtr.node.position.x

    //         if (posX === posBird) {
    //             this.result.addScore();
    //         }
    //         if (posX <= -610) {
    //             posX = 520;

    //             var minY = -360;    //old: -360
    //             var maxY = -720;    //old: -600

    //             posY = math.randomRangeInt(minY, maxY)
    //         }

    //         this.pipe[i].setPosition(posX, posY, 0);
    //     }
    // }

}
