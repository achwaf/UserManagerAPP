import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { QuotePosition } from 'src/app/model/quote-position-enum';
import { AnimalService } from 'src/app/services/animal.service';
import { concat, concatMap, delay, from, Observable, of, timer } from 'rxjs';
import { Unsubscriber } from 'src/app/utils/unsubscriber';
import { AvatarCharacter } from 'src/app/model/avatar-character-enum';
import { AvatarBehavior } from 'src/app/model/avatar-behavior-enum';
import { AvatarState } from 'src/app/model/avatar-state-enum';
import { InteractService } from 'src/app/services/interact.service';
import { IQuote, STOP } from 'src/app/utils/interactions';
import { InteractEvent } from 'src/app/model/interact-event-enum';

const MAX_FIRST_DELAY = 1000;
const MAX_DELAY = 6000;
const MIN_DELAY = 1000;
const IDLE_DELAY = 5000;
const STOP_UNIT_DELAY = 300;
@Component({
  selector: 'app-talking-avatar',
  templateUrl: './talking-avatar.component.html',
  styleUrls: ['./talking-avatar.component.scss'],
  providers: [Unsubscriber]
})
export class TalkingAvatarComponent implements OnInit {

  @Input() position: QuotePosition = QuotePosition.NONE;
  @Input() disabled: boolean = false;
  @ViewChild('abovequote') abovequote!: ElementRef<HTMLElement>;
  @ViewChild('underquote') underquote!: ElementRef<HTMLElement>;
  private _animal!: number;
  get animal() { return this._animal }
  @Input()
  set animal(value: number) {
    this._animal = value;
    this.setAnimalImageSrc();
  }

  private idleTimer: Observable<number> = timer(IDLE_DELAY, IDLE_DELAY);
  private character: AvatarCharacter;
  private behavior: AvatarBehavior;
  private category: string;
  private quote?: IQuote;
  private event?: InteractEvent;
  private state: AvatarState = AvatarState.READY_TO_REACT;
  private keepGoing: boolean = false;

  animalImageSrc!: String;
  private _text?: string;
  get text() { return this._text }


  constructor(private animalService: AnimalService, private interactService: InteractService, private readonly unsubscriber: Unsubscriber) {
    this.character = AvatarCharacter.MORE_REACTIVE;
    this.behavior = AvatarBehavior.NORMAL;
    this.category = AvatarBehavior[this.behavior];
  }

  ngOnInit(): void {
    this.setAnimalImageSrc();
    // tick avery second
    this.idleTimer.pipe(this.unsubscriber.takeUntilDestroy).subscribe(/*(x) => console.log(x)*/);
  }

  setAnimalImageSrc() {
    if (!this.animal || this.animal < 1 || this.animal > this.animalService.animalsCount) {
      // display this specific animal (star) when the animal selected is not valid
      this.animalImageSrc = `/assets/animals/0.png`;
    } else {
      this.animalImageSrc = `/assets/animals/${this.animal}.png`;
    }
  }

  isUnder(): Boolean {
    return QuotePosition.UNDER === this.position;
  }

  isAbove(): Boolean {
    return QuotePosition.ABOVE === this.position;
  }

  /*
   * interaction logic
   */

  notify(event: InteractEvent) {
    // keep the event for later use
    this.event = event;
    // stop interactions from keep going
    this.keepGoing = false;
    // react
    if (this.decidesToReact()) {
      // stop current interactions
      this.unsubscriber.unsubscribe();
      // create new one
      this.reactTo(event);
    }
  }

  private reactTo(event: InteractEvent) {
    if (event === InteractEvent.CONFIRM_DISABLE) {
      // do nothing, the avatar was disabled
    } else {
      // react to the event
      this.state = AvatarState.REACTING;
      // choose quote from interact service
      this.quote = this.interactService.pickQuote(event, this.category, this.quote);
      // say it
      this.say(this.firstDelay(), this.quote);
      // keep going after that
      this.keepGoing = true;
    }
  }

  private firstDelay() {
    // the delay before the avatar starts talking, a minimum delay
    return Math.floor(Math.random() * (MAX_FIRST_DELAY)) + 300;
  }

  private inBetweenDelay() {
    // the normal delay between main quotes
    return Math.floor(Math.random() * (MAX_DELAY)) + MIN_DELAY;
  }

  private decidesToReact() {
    // probability to react to the event depending on the character
    let randomPick = Math.random() * (this.character);
    return 0 < randomPick && randomPick <= 1;
    //return true; //always react
  }

  private say(predelay: number, quote?: IQuote,) {
    if (quote && !this.disabled) {
      // process the parts to make the flow
      let flow = from(quote.parts).pipe(
        delay(predelay),
        concatMap(parts => this.processPart(parts)))
        .pipe(this.unsubscriber.takeUntilManualStop);
      // subscribe to the flow
      flow.subscribe(this.flowSubscriber(quote));
    }
  }

  private flowSubscriber(quote: IQuote) {
    return {
      next: (text: string) => {
        this._text = text
        if (this._text) {
          this.animateQuote();
        }
      },
      complete: () => {
        this._text = '';
        this.state = AvatarState.READY_TO_REACT
        // prepare the next interaction or halt
        if (!quote.end && this.keepGoing) {
          timer(this.inBetweenDelay()).pipe(this.unsubscriber.takeUntilManualStop)
            .subscribe(() => this.reactTo(this.event!))
        }
      },
      error: (err: any) => {
        this._text = '';
        this.state = AvatarState.READY_TO_REACT
      }
    }
  }

  private processPart(part: string) {

    if (STOP.SHORT === part) {
      return of('').pipe(delay(2 * STOP_UNIT_DELAY));
    } else if (STOP.MEDIUM === part) {
      return of('').pipe(delay(4 * STOP_UNIT_DELAY));
    } else if (STOP.LONG === part) {
      return of('').pipe(delay(6 * STOP_UNIT_DELAY));
    } else {
      // adapt the emitting on the part length
      return concat(of(part), of('').pipe(delay(((part.length / 6) + 1) * STOP_UNIT_DELAY)));
    }
  }

  private animateQuote() {
    if (this.position === QuotePosition.ABOVE) {
      this.abovequote.nativeElement.animate([{ transform: 'translateY(10px)' }, { transform: 'translateY(0px)' }], { duration: 250, easing: 'ease-out' });
    } else if (this.position === QuotePosition.UNDER) {
      this.underquote.nativeElement.animate([{ transform: 'translateY(-10px)' }, { transform: 'translateY(0px)' }], { duration: 250, easing: 'ease-out' });
    }
  }

}
