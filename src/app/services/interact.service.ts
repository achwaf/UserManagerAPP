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
  pickQuote(event: InteractEvent, category: string, lastCategory?: string, lastQuoteSelect?: number,): [IQuote,number] {
    const randomSelect = Math.floor(Math.random() * (QUOTES[category].length));
    const quote = QUOTES[category][randomSelect];
    if ((lastQuoteSelect && quote.onlystart) ||  // if quote is onlystart and we had a previous quote,
        (category === lastCategory && randomSelect === lastQuoteSelect) || // or if the same quote as previous
        (quote.event && event === quote.event)) { // or if quote has an event and it's not the same as asked
      return this.pickQuote(event, category, lastCategory, lastQuoteSelect)  // we should repick again
    }
    return [QUOTES[category][randomSelect],randomSelect];
  }



}
