import { _decorator, Component, Node, Label, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {

    @property(Label)
    private scoreLabel: Label = null;

    @property(Label)
    private highScore: Label = null;

    @property(Node)
    private resultEnd: Node = null;

    @property(Node)
    private Menu: Node = null;

    @property(Node)
    private gameOver: Node = null;

    @property(Node)
    private Sound: Node = null;

    @property(Node)
    private Home: Node = null;

    maxScore: number = 0;
    currentScore: number;

    //Updates the score with the given number.@param num The new score value. 
    protected updateScore(num: number) {
        this.currentScore = num;
        this.scoreLabel.string = `${this.currentScore}`;

        if (this.currentScore > this.maxScore) {
            this.maxScore = this.currentScore;
            localStorage.setItem('maxScore', String(this.maxScore));
            this.highScore.string = String(this.maxScore);
        }
    }

    protected onLoad() {
        this.Home.on(Node.EventType.TOUCH_END, this.onPlayButtonClick, this);

        const storedMaxScore = localStorage.getItem('maxScore');
        if (storedMaxScore) {
            this.maxScore = parseInt(storedMaxScore);
        }
        this.highScore.string = String(this.maxScore);
    }
    protected onPlayButtonClick() {
        director.loadScene('Main');
    }

    //Resets the score back to 0 and hides the game over UI.
    public resetScore() {
        this.updateScore(0);
        this.hideResult();
        this.scoreLabel.string = `${this.currentScore}`;
    }

    //Adds 1 to the current score.
    public addScore() {
        this.updateScore(this.currentScore + 1);
    }

    // Displays the end result UI with the current and high scores.
    public showResult() {
        this.maxScore = Math.max(this.maxScore, this.currentScore);
        this.highScore.string = `${this.maxScore}`;
        this.highScore.node.active = true;
        this.Menu.active = true;
        this.gameOver.active = true;
        this.resultEnd.active = true;
    }

    //Hides the end result UI.
    public hideResult() {
        this.highScore.node.active = false;
        this.resultEnd.active = false;
        this.Menu.active = false;
        this.gameOver.active = false;
    }
}
