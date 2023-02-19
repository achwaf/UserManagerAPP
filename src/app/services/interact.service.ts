import { Injectable } from '@angular/core';
import { TalkingAvatarComponent } from '../common/talking-avatar/talking-avatar.component';
import { AvatarBehavior } from '../model/avatar-behavior-enum';
import { AvatarCharacter } from '../model/avatar-character-enum';
import { INotifiable } from '../model/i-notifiable';
import { InteractEvent } from '../model/interact-event-enum';
import { IQuote, QUOTES } from '../utils/interactions';

@Injectable({
  providedIn: 'root'
})
export class InteractService {

  private avatars: Map<string, {
    avatar: INotifiable,
    character: AvatarCharacter,
    behavior: AvatarBehavior
  }> = new Map();

  private avatarLoggedIn?:INotifiable;

  constructor() { }

  /**
   * pick a quote different from the last one
   */
  pickQuote(event: InteractEvent, category?: string, lastQuote?: IQuote): IQuote | undefined {
    // input check
    if(!category){
      return;
    }
    // filter on event and category
    const quotes = QUOTES[category].filter(q => !q.event.length || q.event.includes(event));
    if (!quotes.length) {
      return;
    }
    // select randomly
    const randomSelect = Math.floor(Math.random() * (quotes.length));
    const quote = quotes[randomSelect];
    if (
      // if quote is onlystart and we had a previous quote
      (lastQuote && quote.onlystart) ||
      // or if the quote is same as previous 
      (lastQuote === quote)) {
      return this.pickQuote(event, category, lastQuote)  // we should repick again
    }
    return quote;
  }

  register(avatar: INotifiable): [AvatarCharacter, AvatarBehavior] {
    let username = avatar.getUsername();
    if (username) {
      // look for the user if it exists already
      let existingAvatar = this.avatars.get(username);
      if (existingAvatar) {
        // no need to assign character and behavior
        // just update the new avatar
        existingAvatar.avatar = avatar;
        return [existingAvatar.character, existingAvatar.behavior];
      } else {
        // create a new avatar profile : character + behavior
        let character = this.chooseCharacter();
        let behavior = this.chooseBehavior();
        // register the avatar
        this.avatars.set(username, { avatar, character, behavior });
        return [character, behavior];
      }
    } else {
      return [AvatarCharacter.NOT_REACTIVE,AvatarBehavior.NORMAL];
    }
  }

  unregister(avatar:INotifiable){
    this.avatars.delete(avatar.getUsername()!);
  }

  private chooseCharacter() {
    const rnd = Math.random();
    if (rnd < 0.33) {
      return AvatarCharacter.LESS_REACTIVE  // 1/3 chance to choose
    } else {
      return AvatarCharacter.MORE_REACTIVE  // 2/3 chance to choose
    }
  }

  private chooseBehavior() {
    /*let rnd = Math.random();
    if (rnd < 0.6) {
      return AvatarBehavior.NORMAL  // 60% chance
    } else if (rnd < 0.7) {
      return AvatarBehavior.STORY_TELLER  // 10% chance
    } else if (rnd < 0.8) {
      return AvatarBehavior.NEGOCIATOR  // 10% chance
    } else if (rnd < 0.85) {
      return AvatarBehavior.PHYLOSOPHE  // 5% chance
    } else if (rnd < 0.9) {
      return AvatarBehavior.AI  // 5% chance
    } else if (rnd < 0.95) {
      return AvatarBehavior.SUICIDER  // 5% chance
    } else if (rnd < 0.985) {
      return AvatarBehavior.STRANGER  // 3.5% chance
    } else {
      return AvatarBehavior.HACKER  // 1.5% chance
    }*/
    return AvatarBehavior.NORMAL;
  }







}
