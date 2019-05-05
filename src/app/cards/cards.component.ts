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
  public player4Cards = [];
  public added = 1;
  public i = 0;
  constructor() {
  }

  ngAfterViewInit() {
    const newdeck = new Deck();

    const container = this.container.nativeElement;
    container.addEventListener('mouseup', (e) => { this.getCard(e); }, false)
    newdeck.mount(container);
    this.createPlayerCards(newdeck);

  }

  getLastDealtCardForPlayer(){
    switch(this.added) { 
      case 1: { 
        return 1;
      } 
      case 2: { 
        return 2;
      }
      case 3: { 
        return 3;
      } 
      case 4: { 
         return 4;
      }  
      default: { 
         console.log("Invalid choice"); 
         break;              
      } 
   } 
  }

  getCard = (event) => {
    console.log(event);
  }

  AnimateCard = (card) => {
    if (this.added === 1 && this.player1Cards.length < 7) {
      console.log(1)
      this.player1Cards.push(card)
      card.animateTo({
        delay: 1000 +  this.player1Cards.length * 10  * 10,
        duration: 500,
        ease: 'quartOut',
        x: 250 + this.player1Cards.length * 10,
        y: 0
      });
      this.added = 2
      return;
    }
    if (this.added === 2 && this.player2Cards.length < 7) {
      this.player2Cards.push(card)
      card.animateTo({
        delay: 1000 +  this.player2Cards.length * 10  * 10,
        duration: 500,
        ease: 'quartOut',
        x: -10 + this.player2Cards.length * 10,
        y: window.innerHeight - window.innerHeight + 250
      });
      this.added = 3;
      return;
    }
   if (this.added === 3 && this.player3Cards.length < 7) {
      this.player3Cards.push(card)
      card.animateTo({
        delay: 1000 +  this.player3Cards.length * 10,
        duration: 500,
        ease: 'quartOut',
        x: window.innerHeight - window.innerHeight - 250 + this.player3Cards.length * 10,
        y: 0
      });
      this.added = 4;
      return;
    }
    if(this.added === 4 && this.player4Cards.length < 7) {
      this.player4Cards.push(card)
      card.animateTo({
        delay: 1000 + this.player4Cards.length  * 10,
        duration: 500,
        ease: 'quartOut',
        x: -10 + this.player4Cards.length * 10,
        y: window.innerHeight - window.innerHeight - 250
      });
      this.added = 1;
      return;
    }
  }

  createPlayerCards = (newDeck) => {
    // for(let cardId in newDeck.cards){
    //   console.log(newDeck.cards[card])
    // }
    for( let cardId in newDeck.cards) {
      const card = newDeck.cards[cardId];
      this.i = this.i++;
      card.setSide('front');
      card.enableDragging();

     this.AnimateCard(card);



    };
  }

}
