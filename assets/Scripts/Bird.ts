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
    public hitSomething: boolean;

    protected onLoad() {
        // Initialize the initial position and state of the bird
        this.resetBird();
        // Get the Animation component
        this.birdAnimation = this.getComponent(Animation);
    }

    public resetBird() {
        // Set the initial position and reset hitSomething to false
        this.birdLocation = new Vec3(0, 0, 0);
        this.node.setPosition(this.birdLocation);
        this.hitSomething = false;
    }

    public fly() {
        // Stop the Animation from playing
        this.birdAnimation.stop();
        // Create a tween to move the bird upwards
        tween(this.node)
            .to(this.jumpDuration, { position: new Vec3(this.node.position.x, this.node.position.y + this.jumpHeight, 0) }, { easing: 'smooth' })
            .start();
        // Play the Animation
        this.birdAnimation.play();
    }
}
