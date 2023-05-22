import { _decorator, Component, Node, Prefab, NodePool, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipePool')
export class PipePool extends Component {
    
    @property(Prefab)
    private prefabPipes: Prefab = null;

   @property(Node)
    private pipePoolHome: Node = null;

    private pool: NodePool = new NodePool();
    private createPipe: Node = null;

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

}
