import { Component } from '@angular/core';
import {GameService} from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GameService]
})
export class AppComponent {
  public activePlayer = 1;
  public skipTurn = 0;
  public homescreen = true;
  public gameOver = false;

  gameStarted(){
    this.homescreen = false;
  }

  checkPlayer(activePlayer){
    this.activePlayer = activePlayer;
  }

  doSkipTurn(){
    this.skipTurn = this.skipTurn + 1;
  }

  setWinningPlayer(){
    console.log('hoofscherm game over')
    this.gameOver = true;
  }
}
