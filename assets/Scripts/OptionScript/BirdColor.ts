import { _decorator, Component, director, Node } from 'cc';
const { ccclass } = _decorator;

@ccclass('BirdColor')
export class BirdColor extends Component {
    
    private _Green: Boolean = false;

    public get Green(): Boolean {
        return this._Green;
    }
    
    public set Green(value: Boolean) {
        this._Green = value;
    }

    private _Red: Boolean = false;

    public get Red(): Boolean {
        return this._Red;
    }

    public set Red(value: Boolean) {
        this._Red = value;
    }

    protected butonClickGreen(): void {
        this.Green = true;
        this.Red = false;
        director.addPersistRootNode(this.node);
        director.loadScene('Scene');
    }

    protected buttonClickRed(): void {
        this.Red = true;
        this.Green = false;
        director.addPersistRootNode(this.node);
        director.loadScene('Scene');
    }
}

