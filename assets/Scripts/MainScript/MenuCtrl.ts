import { _decorator, builtinResMgr, Button, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MenuCtrl')
export class MenuCtrl extends Component {

    @property(Button)
    private playButton: Button;

    @property(Button)
    private Option: Button;

    // @property(Button)
    // private Exit: Button;

    protected onLoad(): void {
        // Button play
        this.playButton.node.on(Node.EventType.TOUCH_END, this.onPlayButtonClick, this);
        this.Option.node.on(Button.EventType.CLICK, this.optionButtonClick, this);
        // this.Exit.node.on(Node.EventType.TOUCH_END, this.onExitButton, this);
    }
    
    protected onPlayButtonClick(): void {
        // Switch scenes when the "Play" button is pressed
        director.loadScene('Scene');
    }

    protected optionButtonClick(): void {
        director.loadScene('Option')
    }
    // onExitButton() {
    //     // Switch scenes when the "Play" button is pressed
    //     director.loadScene('Main');
    // }
}

