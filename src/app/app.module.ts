import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards.component';
import { NavbarComponent } from './navbar/navbar.component';
import {Routes} from '@angular/router';

const appRoutes: Routes = [
  {path: '' , component: AppComponent},
  {path: 'Cards', component: CardsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
