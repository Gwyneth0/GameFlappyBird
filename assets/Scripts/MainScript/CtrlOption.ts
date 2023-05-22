import { _decorator, Button, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CtrlOption')
export class CtrlOption extends Component {

    @property(Button)
    private playButton: Button;

    onLoad() {
        this.playButton.node.on(Node.EventType.TOUCH_END, this.onPlayButtonClick, this);
    }
    
    onPlayButtonClick() {
        // Switch scenes when the "Play" button is pressed
        director.loadScene('Main');
    }
}

