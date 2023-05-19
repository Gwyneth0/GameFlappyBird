import { _decorator, Button, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Option')
export class Option extends Component {
    @property({
        type: Button,
        tooltip: 'Option'
    })
    private Option: Button;
    protected onLoad(): void {
        // option
        this.Option.node.on(Button.EventType.CLICK, this.optionButtonClick, this);
    }
    optionButtonClick() {
        director.loadScene('Option')
    }
}

