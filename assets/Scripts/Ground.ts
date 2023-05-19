import { _decorator, Component, Node, Vec3, UITransform, director, Canvas } from 'cc';
const { ccclass, property } = _decorator;

import { GameCtrl } from './GameCtrl';

@ccclass('Ground')
export class Ground extends Component {
    @property({
        type: Node,
        tooltip: 'First ground'
    })
    private ground1: Node;

    @property({
        type: Node,
        tooltip: 'Second ground'
    })
    private ground2: Node;

    @property({
        type: Node,
        tooltip: 'Third ground'
    })
    private ground3: Node;
    //Create ground width variables
    private groundWidth1: number;
    private groundWidth2: number;
    private groundWidth3: number;
    //make temporary starting locations
    private tempStartLocation1 = new Vec3;
    private tempStartLocation2 = new Vec3;
    private tempStartLocation3 = new Vec3;
    //get the gamespeeds
    private gameCtrlSpeed = new GameCtrl;
    private gameSpeed: number;
    //all the things we want to happen when we start the script
    onLoad() {
        this.startUp()
    }
    //preparing the ground locations
    startUp() {
        this.groundWidth1 = this.ground1.getComponent(UITransform).width;
        this.groundWidth2 = this.ground2.getComponent(UITransform).width;
        this.groundWidth3 = this.ground3.getComponent(UITransform).width;

        this.tempStartLocation1.x = 0;
        this.tempStartLocation2.x = this.groundWidth1;
        this.tempStartLocation3.x = this.groundWidth1 + this.groundWidth2;

        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);
    }
    //everytime the game updates, move the ground
    update(deltaTime: number) {

        this.gameSpeed = this.gameCtrlSpeed.Speed;

        this.tempStartLocation1 = this.ground1.position;
        this.tempStartLocation2 = this.ground2.position;
        this.tempStartLocation3 = this.ground3.position;

        this.tempStartLocation1.x -= this.gameSpeed * deltaTime;
        this.tempStartLocation2.x -= this.gameSpeed * deltaTime;
        this.tempStartLocation3.x -= this.gameSpeed * deltaTime;
        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);
        if (this.tempStartLocation1.x <= (0 - this.groundWidth1)) {
            this.tempStartLocation1.x = canvas.getComponent(UITransform).width;
        }
        if (this.tempStartLocation2.x <= (0 - this.groundWidth2)) {
            this.tempStartLocation2.x = canvas.getComponent(UITransform).width;
        }
        if (this.tempStartLocation3.x <= (0 - this.groundWidth3)) {
            this.tempStartLocation3.x = canvas.getComponent(UITransform).width;
        }
        //place new locations back into ground nodes     
        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);
    }
}


