import { Injectable, OnDestroy } from "@angular/core";
import { Observable, Subject, takeUntil } from "rxjs";

@Injectable()
export class Unsubscriber implements OnDestroy {
  private readonly _destroy$ = new Subject<void>();
  private _manualDestroy$ = new Subject<void>();

  public readonly takeUntilDestroy = <T>(
    origin: Observable<T>
  ): Observable<T> => origin.pipe(takeUntil(this._destroy$));
  
  public readonly takeUntilManualStop = <T>(
    origin: Observable<T>
  ): Observable<T> => origin.pipe(takeUntil(this._manualDestroy$));

  public unsubscribe(){
    this._manualDestroy$.next();
    this._manualDestroy$.complete();
    // renew for next use
    this._manualDestroy$ = new Subject<void>();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}