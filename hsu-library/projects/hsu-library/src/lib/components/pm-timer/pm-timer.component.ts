import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  ButtonType
} from '../pm-button/pm-button.component';
import {
  Icon
} from '../pm-icon/pm-icon.shared';
import {
  COUNTDOWN_INTERVAL,
  MS_PER_SEC,
  OnResetFn,
  SEC_PER_MIN,
  TIMER_DISPLAY_SIZE
} from './pm-timer.shared';


@Component({
  selector: 'pm-timer',
  templateUrl: './pm-timer.component.html',
  styleUrls: ['./pm-timer.component.scss']
})

export class PmTimerComponent implements OnInit {
  @Input()
  countdown: number = 0;

  @Input()
  targetDate: Date = new Date();

  @Input()
  timeRemaining: string = '';

  @Input()
  interval: ReturnType<typeof setInterval> | null = null;

  @Input()
  disabled: boolean = false;

  @Output()
  onReset: EventEmitter<OnResetFn> = new EventEmitter();

  @Output()
  timerFinished: EventEmitter<void> = new EventEmitter();

  /** @ignore */
  protected readonly EIcon: typeof Icon = Icon;

  /** @ignore */
  protected readonly EButtonType: typeof ButtonType = ButtonType;


  ngOnInit() {
    if (this.disabled || this.countdown === 0) {
      this.timeRemaining = this.format(0);
      return;
    }
    this.resetTimer();
  }

  /** @ignore */
  onUpdate (){
    const diff: number = Math.round((this.targetDate.getTime() - (new Date()).getTime())/ MS_PER_SEC);

    this.timeRemaining = this.format(diff);

    if (this.interval && diff <= 0) {
      clearInterval(this.interval);

      this.timerFinished.emit();
    }
  }

  /** @ignore */
  resetTimer() {
    this.targetDate = new Date();
    this.targetDate.setSeconds(this.targetDate.getSeconds() + this.countdown);

    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(this.onUpdate.bind(this), COUNTDOWN_INTERVAL);
    this.onUpdate();
  }

  /** @ignore */
  handleResetTimer() {
    if (!this.disabled) {
      this.resetTimer();
      this.onReset.emit();
    }
  }

  /** @ignore */
  pad(num: number, size: number){
    let res: string = num.toString();
    while (res.length < size) {
      res = '0' + res;
    }
    return res;
  }

  /** @ignore */
  format(remaining: number) {
    const absRemaining: number = Math.abs(remaining);
    const minutes: number = Math.floor(absRemaining / SEC_PER_MIN);
    const seconds: number = absRemaining % SEC_PER_MIN;


    const template: string = '{min}:{sec} Minuten';
    return template
      .replace('{min}', this.pad(minutes, TIMER_DISPLAY_SIZE ))
      .replace('{sec}', this.pad(seconds, TIMER_DISPLAY_SIZE ));
  }
}

