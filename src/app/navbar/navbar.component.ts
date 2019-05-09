import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private gameService: GameService) { }

  ngOnInit() {
  }

  startNewGame() {
    this.gameService.newGame.emit(true);
  }

}
