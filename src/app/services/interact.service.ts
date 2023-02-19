import { Injectable } from '@angular/core';
import { InteractEvent } from '../model/interact-event-enum';
import { IQuote, QUOTES } from '../utils/interactions';

@Injectable({
  providedIn: 'root'
})
export class InteractService {

  constructor() { }


  /**
   * pick a quote different from the last one
   */
  pickQuote(event: InteractEvent, category: string, lastQuote?:IQuote): IQuote | undefined {
    // filter on event and category
    const quotes = QUOTES[category].filter(q => !q.event.length || q.event.includes(event));
    if(!quotes.length){
      return;
    }
    // select randomly
    const randomSelect = Math.floor(Math.random() * (quotes.length));
    const quote = quotes[randomSelect];
    if (
       // if quote is onlystart and we had a previous quote
      (lastQuote && quote.onlystart) || 
      // or if the quote is same as previous 
      (lastQuote===quote)) { 
      return this.pickQuote(event, category, lastQuote)  // we should repick again
    }
    return quote;
  }



}
