import { _decorator, Component, Node, CCFloat, Vec3, Animation, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {

    @property(CCFloat)
    private jumpHeight: number = 1.5;

    @property(CCFloat)
    private jumpDuration: number = 1.5;

    private birdAnimation: Animation;
    private birdLocation: Vec3;

    private _hitSomething: boolean;

    public get hitSomething(): boolean {
        return this._hitSomething;
    }

    public set hitSomething(value: boolean) {
        this._hitSomething = value;
    }

    private originalRotation: number = 0;
    private headDownRotation: number = 20;

    protected onLoad(): void {
        // Initialize the initial position and state of the bird
        this.resetBird();
        // Get the Animation component
        this.birdAnimation = this.getComponent(Animation);
        this.originalRotation = this.node.angle;
    }

    //
    protected update(): void {
        if (this.node.angle !== this.originalRotation && this.node.position.y <= -1000) {
            this.node.angle = this.originalRotation; // Return to the original angle when falling
        }
    }

    public resetBird(): void {
        // Set the initial position and reset hitSomething to false
        this.birdLocation = new Vec3(0, 0, 0);
        this.node.setPosition(this.birdLocation);
        this.hitSomething = false;
    }

    public fly(): void {
        // Stop the Animation from playing
        this.birdAnimation.stop();
        tween(this.node)
            .to(this.jumpDuration, { position: new Vec3(this.node.position.x, this.node.position.y + this.jumpHeight, 0) })
            .start();
        // Play the Animation
        this.node.angle = this.headDownRotation; // Nod as you ascend
        this.birdAnimation.play();
    }
}
