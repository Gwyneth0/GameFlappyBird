import { _decorator, Button, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MenuCtrl')
export class MenuCtrl extends Component {

    @property(Node)
    private playButton: Node;

    onLoad() {
        // Button play
        this.playButton.on(Node.EventType.TOUCH_END, this.onPlayButtonClick, this);
    }
    
    onPlayButtonClick() {
        // Switch scenes when the "Play" button is pressed
        director.loadScene('Scene');
    }
}

