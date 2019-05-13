import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class GameService {
    newGame = new EventEmitter();

    startNewGame() {
        this.newGame.emit();
        return this.newGame;
    }
}
