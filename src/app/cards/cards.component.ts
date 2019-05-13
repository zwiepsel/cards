import {Component, OnInit, ViewChild, ElementRef, Input, Output,EventEmitter, OnChanges, SimpleChanges, SimpleChange  } from '@angular/core';
import {GameService} from '../services/game.service';
import * as animate from '../helpers/animate';

declare let Deck: any;

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, OnChanges {
  @ViewChild('container') container: ElementRef;
  @Input() newGame: boolean;
  @Input() skipTurn: boolean;
  @Output() playerChanged: EventEmitter<number> = new EventEmitter();
  @Output() gameStarted: EventEmitter<boolean> = new EventEmitter();
  @Output() gameOver: EventEmitter<boolean> = new EventEmitter();

  public cards1 = [];
  public cards2 = [];
  public cards3 = [];
  public cards4 = [];
  public cardsPlayed = [];
  public activeCard = null;
  public added = 1;
  public activePlayer = 1;
  public newDeck = new Deck();
  public showButtons = false;
  public finished = false;
  public winningPlayer = 0;
  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    // Subscribe to navbar button event
    this.gameService.startNewGame().subscribe((newGame: boolean) => {
      if (newGame) {
        this.startNewGame();
      }
    });
  }

  // Start a new game, also set all the used variables to empty again to prevent unwanted actions
  startNewGame(){
    const container = this.container.nativeElement;
    this.cards1 = [];
    this.cards2 = [];
    this.cards3 = [];
    this.cards4 = [];
    this.cardsPlayed = [];
    this.added = 1;
    this.activePlayer = 1;

    if(this.container.nativeElement.children.length > 0)
    {
      this.newDeck.unmount();
    }

    this.newDeck = new Deck();
    this.showButtons = true;
    this.gameStarted.emit(true);

    container.addEventListener('dblclick', (e) => { this.playCard(e); }, false);
    this.newDeck.mount(container);
    this.newDeck.shuffle();
    this.dealPlayerCards(this.newDeck);
  }

  // Quick reload after the game has been won
  resetGame(){
    location.reload();
  }

  ngOnChanges(changes: SimpleChanges){
    // Check if the button is pressed to skip the turn
    for (let propName in changes) {
      if(propName === "skipTurn" &&  !changes[propName].firstChange ){
        this.setNextPlayer();
      }
    }
  }

  // Start dealing the cards on start
  dealPlayerCards = newDeck => {
    let i = 0;
    for (const cardId in newDeck.cards) {
      if (newDeck.cards.hasOwnProperty(cardId)) {
        const card = newDeck.cards[cardId];
        if (i < 28) {
          card.setSide('front');
          card.enableDragging();
          this.AnimateCard(card);
        } else if (i === 28) {
          this.DealStartCard(card);
        } else {
          card.disableDragging();
        }
        i++;
      }
    }
  };

  // Make the next player active, also let the parent component know it is updated
  setNextPlayer = () => {
    this.activePlayer < 4 ? this.activePlayer++ : this.activePlayer = 1;
    this.playerChanged.emit(this.activePlayer);
  };

  // Does the card meet all the prerequisites to be played
  isCardPlayable = (selectedCard, card, cards) => {
    if (this.isCardFromActivePlayer(selectedCard, cards)) {
      return (selectedCard.classList[1] === card.$el.classList[1]) || (selectedCard.classList[2] === card.$el.classList[2]);
    }
  }

  // Check if the doubleclicked card is also from the active player
  isCardFromActivePlayer = (selectedCard, cards) => {
    for (const card in cards) {
      console.log(cards[card]);
      if ( cards.hasOwnProperty(card)) {
        if (cards[card].card.$el.className === selectedCard.className) {
          return true;
        }
      }
    }
    return false;
  }

  // Take a card from stock when you cant play a card;
  takeCardFromStock = event => {
    let card = this.newDeck.cards.find(selectedcard => selectedcard.$el.className === event.parentElement.className);

    switch (this.activePlayer) {
      case 1:
        if (this.cards1.length < 7) {
          this.handleCardFromStock(this.cards1, 1, card);
        }
      break;
      case 2:
        if (this.cards2.length < 7) {
          this.handleCardFromStock(this.cards2, 2, card);
        }
      break;
      case 3:
        if (this.cards3.length < 7) {
          this.handleCardFromStock(this.cards3, 3, card);
        }
      break;
      case 4:
        if (this.cards4.length < 7) {
          this.handleCardFromStock(this.cards4, 4, card);
        }
      break;
    }
  }

  // Handle the new drawn card and make card visible and dragable
  handleCardFromStock = (playerCards, player, card) => {
    playerCards.push(card);
    this.cardsPlayed.push({player: player, card});
    animate.animatePlayer(card, playerCards.length, player);
    card.setSide('front');
    card.enableDragging();
    this.setNextPlayer();
    this.added = player;

  }

  // Update the array which holds the card, remove a card from the hand
  removeCardFromPlayerHand = (card) => {
    switch (this.activePlayer) {
      case 1:
        this.cards1.splice(this.cards1.indexOf(card), 1)
        break;
      case 2:
        this.cards2.splice(this.cards2.indexOf(card), 1)
        break;
      case 3:
        this.cards3.splice(this.cards3.indexOf(card), 1)
        break;
      case 4:
        this.cards4.splice(this.cards4.indexOf(card), 1) 
        break;
    }
  }

  // Is this the last card being played, so yes this is the winner
  isWinningCard = () => {
    switch (this.activePlayer) {
      case 1:
        return this.cards1.length === 1;
      case 2:
        return this.cards2.length === 1;
      case 3:
        return this.cards3.length === 1;
      case 4:
        return this.cards4.length === 1;
    }
  }

  // Handle card doubleclick and check if the card can be played according to rules
  playCard = event => {
    const cards = this.cardsPlayed.filter(card => card.player === this.activePlayer);
    if (this.isCardPlayable(event.target.parentElement, this.activeCard, cards)) {
      this.activeCard = cards.find(card => card.card.$el.className === event.target.parentElement.className).card;
      if(this.isWinningCard())
      {
        this.finished = true;
        this.winningPlayer = this.activePlayer;
        return;
      }
      animate.animatePlayingCard(this.activeCard);
      this.removeCardFromPlayerHand(this.activeCard);
      this.setNextPlayer();
    }
    if (event.target.className === 'back') {
      this.takeCardFromStock(event.target);
    }
  };

  // Deal the startcard from stockpile with a small delay
  DealStartCard = card => {
    setTimeout(() => {
      card.animateTo({
        delay: 1000,
        duration: 500,
        ease: 'quartOut',
        x: 100,
        y: 0
      });
      card.setSide('front');}, 1000);
    this.activeCard = card;
  };

  // Animate the first 7 cards dealt to all players
  AnimateCard = card => {
    card.enableDragging();
    if (this.added === 1 && this.cards1.length < 7) {
      this.cards1.push(card)
      this.cardsPlayed.push({player : 1, card});
      animate.animatePlayer(card, this.cards1.length, 1);
      this.added = 2;
      return;
    }
    if (this.added === 2 && this.cards2.length < 7) {
      this.cards2.push(card);
      this.cardsPlayed.push({player : 2, card});
      animate.animatePlayer(card, this.cards2.length, 2);
      this.added = 3;
      return;
    }
    if (this.added === 3 && this.cards3.length < 7) {
      this.cards3.push(card);
      this.cardsPlayed.push({player : 3 , card});
      animate.animatePlayer(card, this.cards3.length,3);
      this.added = 4;
      return;
    }
    if (this.added === 4 && this.cards4.length < 7) {
      this.cards4.push(card);
      this.cardsPlayed.push({player : 4, card});
      animate.animatePlayer(card, this.cards4.length,4);
      this.added = 1;
      return;
    }
  }
}
