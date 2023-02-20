
import { InteractEvent } from './interact-event-enum';

export interface INotifiable{
    notify(event:InteractEvent):void;
    getUsername():string|undefined;
    pushToSay(quote?:string[],shortDelay?:boolean):void;
}