import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { AvatarBehavior } from '../model/avatar-behavior-enum';
import { AvatarCharacter } from '../model/avatar-character-enum';
import { INotifiable } from '../model/i-notifiable';
import { InteractionName, InteractEvent } from '../model/interact-event-enum';
import { GUIDED_INTERACTIONS, IQuote, IScriptQuote, QUOTES } from '../utils/interactions';
import { Unsubscriber } from '../utils/unsubscriber';

@Injectable({
  providedIn: 'root'
})
export class InteractService {

  private avatars: Map<string, {
    avatar: INotifiable,
    character: AvatarCharacter,
    behavior: AvatarBehavior
  }> = new Map();

  private avatarLoggedIn?: INotifiable;

  constructor(private unsubscriber: Unsubscriber) { }

  /**
   * pick a quote different from the last one
   */
  pickQuote(event: InteractEvent, category?: string, lastQuote?: IQuote): IQuote | undefined {
    // input check
    if (!category) {
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
      return [AvatarCharacter.NOT_REACTIVE, AvatarBehavior.COMMON];
    }
  }

  unregister(avatar: INotifiable) {
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
    // lack of time to implement all
    return AvatarBehavior.COMMON;
  }

  guideInteraction(animator: INotifiable, interaction: InteractionName) {
    this.unsubscriber.unsubscribe();
    if (interaction === InteractionName.STARTUP) {
      this.playInteraction(animator, interaction, ['The best you said?', '..', 'It\'s Cascade of course!', '.', 'keep up the work']);
    } else if (interaction === InteractionName.VOTE) {
      const yes = this.playInteraction(animator, interaction, ['yo', 'let\'s do a vote', 'ah', '..', 'there is no one!']);
      const no=this.avatars.size - yes;
      const hanger='                                             ' // this is to hold count in display longer
      // anounce final count of vote
      timer(13000).pipe(this.unsubscriber.takeUntilManualStop).subscribe(() =>
        animator.pushToSay([
          'ok',
          'the result of the vote is',
          '...',
          `YES(${yes}) and NO(${no})${hanger}`,
          'thanks everyone']));
    }
  }

  // a very poor implementation because of lack of time
  private playInteraction(animator: INotifiable, interaction: InteractionName, animatorOnlyQuote: string[]): number {
    const entry = InteractionName[interaction];
    const guidedInteraction = GUIDED_INTERACTIONS[entry];
    // animator quote
    if (this.avatars.size) {
      animator.pushToSay(guidedInteraction.animator);
    } else {
      animator.pushToSay(animatorOnlyQuote);
    }
    // public quotes
    let repeatableReplies = guidedInteraction.public.replies.filter(r => r.repeatable);
    let nonRepeatableReplies = guidedInteraction.public.replies.filter(r => !r.repeatable);
    let sumValues = 0;
    this.avatars.forEach(avatarProfile => {
      let scriptQuote = this.pickQuoteFromScript(repeatableReplies, nonRepeatableReplies);
      sumValues += scriptQuote?.value || 0;
      // if a quote is picked from the nonRepeatable array
      // it should get removed so the next call wont pick it
      const index = nonRepeatableReplies.indexOf(scriptQuote!);
      if (index > -1) {
        nonRepeatableReplies.splice(index, 1);
      }
      // say the quote after delay
      timer(5500).pipe(this.unsubscriber.takeUntilManualStop)
        .subscribe(() => avatarProfile.avatar.pushToSay(scriptQuote?.quote, false));
      ;
    });
    return sumValues;
  }

  private pickQuoteFromScript(repeatableReplies: IScriptQuote[], nonRepeatableReplies: IScriptQuote[]) {
    // merge the 2 arrays and pick a quote
    const mergedReplies = repeatableReplies.concat(nonRepeatableReplies);
    const randomSelect = Math.floor(Math.random() * (mergedReplies.length));
    const scriptQuote = mergedReplies.at(randomSelect);

    return scriptQuote;
  }






}
