import {
  Constructor
} from './constructor.mixin';
import {
  Observable,
  ObservableInput,
  ObservedValueOf,
  of,
  OperatorFunction,
  Subject
} from 'rxjs';
import {
  OnDestroy
} from '@angular/core';
import {
  switchMap,
  takeUntil
} from 'rxjs/operators';

//eslint disabled because mixins always inherit from an empty class
// eslint-disable-next-line max-lines-per-function
export function WithRx<C extends Constructor<{}>>(Base: C = (class {} as never)) { // eslint-disable-line @typescript-eslint/ban-types
  return class extends Base implements OnDestroy {
    protected componentIsDestroyed$ = new Subject<boolean>();

    ngOnDestroy() {
      this.componentIsDestroyed$.next(true);
      this.componentIsDestroyed$.complete();
    }

    cancelOnDestroy<T>(): (source$: Observable<T>) => Observable<T> {
      return source$ =>
        source$
          .pipe(
            takeUntil(this.componentIsDestroyed$),
          );
    }

    switchMapCancelable<T, I, O extends ObservableInput<I>>(project: (value: T, index: number) => O,
    ): OperatorFunction<T, ObservedValueOf<O>> {
      return (source: Observable<T>) => source.pipe(
        this.cancelOnDestroy(),
        switchMap(project)
      );
    }

    createCancelableSwitchMap<I, O extends ObservableInput<I>>(project: (value: boolean, index: number) => O,
    ): Observable<ObservedValueOf<O>> {
      return of(true)
        .pipe(
          this.switchMapCancelable(project),
        );
    }
  }
}
