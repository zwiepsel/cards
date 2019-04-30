import {Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';

declare let Deck: any;


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements AfterViewInit  {
  @ViewChild('container') container: ElementRef;
  public player1Cards = [];
  public player2Cards = [];
  public player3Cards = [];
  constructor() {
  }

  ngAfterViewInit() {
    const newdeck = new Deck();

    const container = this.container.nativeElement;
    container.addEventListener('mouseup', (e) => { this.getCard(e); }, false)
    newdeck.mount(container);
    this.createPlayerCards(newdeck);

  }

  getCard = (event) => {
    console.log(event);
  }

  createPlayerCards = (newDeck) => {
    newDeck.cards.forEach((card, i) => {
      card.setSide('front');
      card.enableDragging();

      if (i % 4 === 0 && this.player1Cards.length < 8) {
        this.player1Cards.push(card)
        card.animateTo({
          delay: 1000 + i  * 10,
          duration: 500,
          ease: 'quartOut',
          x: 500 + i * 5,
          y: 0
        });
      }
      if (i % 3 === 0 && this.player2Cards.length < 8) {
        console.log(window.innerHeight)
        this.player2Cards.push(card)
        card.animateTo({
          delay: 1000 + i  * 10,
          duration: 500,
          ease: 'quartOut',
          x: i * 5,
          y: window.innerHeight - window.innerHeight + 250
        });
      }
      if (i % 2 === 0 && this.player3Cards.length < 8) {
        this.player3Cards.push(card)
        card.animateTo({
          delay: 1000 + i  * 10,
          duration: 500,
          ease: 'quartOut',
          x: i * 5,
          y: window.innerHeight + window.innerHeight + 250
        });
      }
      // if (i % 1 === 0 && this.player1Cards.length < 8) {
      //   this.player1Cards.push(card)
      //   card.animateTo({
      //     delay: 1000 + i  * 10,
      //     duration: 500,
      //     ease: 'quartOut',
      //     x: 500 + i * 5,
      //     y: 0
      //   });
      // }
    });
  }

}
