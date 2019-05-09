import {Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import {GameService} from '../services/game.service';

declare let Deck: any;

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @ViewChild('container') container: ElementRef;
  @Input() newGame: boolean;

  public cards1 = [];
  public cards2 = [];
  public cards3 = [];
  public cards4 = [];
  public cardsPlayed = [];
  public activeCard = null;
  public added = 1;
  public activePlayer = 1;
  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.startNewGame().subscribe((newGame: boolean) => {
      const newdeck = new Deck();
      const container = this.container.nativeElement;
      if (newGame) {
        // newdeck.unmount();
        // console.log(newdeck.getElementsByClassName("deck"))
        container.addEventListener('dblclick', (e) => { this.playCard(e); }, false);
        newdeck.mount(container);
        newdeck.shuffle();
        this.dealPlayerCards(newdeck);
      }
    });
  }

  setNextPlayer = () => {
    this.activePlayer = this.activePlayer < 4 ? this.activePlayer++ : this.activePlayer = 1;
  }

  // Does the card meet all the prerequisites to be played
  isCardPlayable(selectedCard, card, cards) {
    if (this.isCardFromActivePlayer(selectedCard, cards)) {
      return (selectedCard.classList[1] === card.$el.classList[1]) || (selectedCard.classList[2] === card.$el.classList[2]);
    }
  }

  // Check if the doubleclicked card is also from the active player
  isCardFromActivePlayer(selectedCard, cards) {
    for (const card in cards) {
      if ( cards.hasOwnProperty(card)) {
        return cards[card].card.$el.className === selectedCard.className;
      }
    }
  }

  // Handle card doubleclick and check if the card can be played according to rules
  playCard = (event) => {
    const cards = this.cardsPlayed.filter(card => card.player === this.activePlayer);

    if (this.isCardPlayable(event.target.parentElement, this.activeCard, cards)) {
      this.setNextPlayer();
      this.activeCard = cards.find(card => card.card.$el.className === event.target.parentElement.className).card;
      this.activeCard.animateTo({
        delay: 500,
        duration: 500,
        ease: 'quartOut',
        x: 100,
        y: 0
      });
    }
  };

  // Deal the startcard from stockpile with a small delay
  DealStartCard = (card) => {
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
  AnimateCard = (card) => {
    card.enableDragging();
    if (this.added === 1 && this.cards1.length < 7) {
      this.cards1.push(card)
      this.cardsPlayed.push({player : 1, card})
      card.animateTo({
        delay: 1000 +  this.cards1.length * 10  * 10,
        duration: 500,
        ease: 'quartOut',
        x: 250 + this.cards1.length * 10,
        y: 0
      });
      this.added = 2;
      return;
    }
    if (this.added === 2 && this.cards2.length < 7) {
      this.cards2.push(card);
      this.cardsPlayed.push({player : 2, card});
      card.animateTo({
        delay: 1000 +  this.cards2.length * 10  * 10,
        duration: 500,
        ease: 'quartOut',
        x: -10 + this.cards2.length * 10,
        y: window.innerHeight - window.innerHeight + 250
      });
      this.added = 3;
      return;
    }
    if (this.added === 3 && this.cards3.length < 7) {
      this.cards3.push(card);
      this.cardsPlayed.push({player : 3 , card})
      card.animateTo({
        delay: 1000 +  this.cards3.length * 10,
        duration: 500,
        ease: 'quartOut',
        x: window.innerHeight - window.innerHeight - 250 + this.cards3.length * 10,
        y: 0
      });
      this.added = 4;
      return;
    }
    if (this.added === 4 && this.cards4.length < 7) {
      this.cards4.push(card);
      this.cardsPlayed.push({player : 4, card});
      card.animateTo({
        delay: 1000 + this.cards4.length  * 10,
        duration: 500,
        ease: 'quartOut',
        x: -10 + this.cards4.length * 10,
        y: window.innerHeight - window.innerHeight - 250
      });
      this.added = 1;
      return;
    }

  }

  // Start dealing the cards on start
  dealPlayerCards = (newDeck) => {
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
  }

}
