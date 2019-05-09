import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class GameService {
    newGame = new EventEmitter();

    startNewGame() {
        this.newGame.emit();
        console.log('emit action')
        return this.newGame;
    }
}
