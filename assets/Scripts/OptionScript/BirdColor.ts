import { _decorator, Component, director, Node } from 'cc';
const { ccclass } = _decorator;

@ccclass('BirdColor')
export class BirdColor extends Component {
    
    public Green : Boolean = false;
    public Red : Boolean = false;

    butonClickGreen() {
        this.Green = true;
        director.addPersistRootNode(this.node);
        director.loadScene('Scene');
    }

    buttonClickRed() {
        this.Red = true;
        director.addPersistRootNode(this.node);
        director.loadScene('Scene');
    }
}

