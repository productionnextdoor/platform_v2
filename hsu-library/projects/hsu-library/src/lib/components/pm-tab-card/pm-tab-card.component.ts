import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ITab, ITabButton } from './pm-tab-card.shared';
import {
  DefaultMargins,
  IComponentMargin,
  PmComponentMargin
} from '../../utils/pm-component-margin';

@Component({
  selector: 'pm-tab-card',
  templateUrl: './pm-tab-card.component.html',
  styleUrls: ['./pm-tab-card.component.scss']
})
export class PmTabCardComponent<T> {

  @Input()
  tabs: ITab<T>[] = [];

  @Input()
  buttons: ITabButton[] = [];

  @Output()
  onTabChange: EventEmitter<T> = new EventEmitter();

  @Output()
  onButtonClicked: EventEmitter<string> = new EventEmitter();

  protected margin: IComponentMargin = new PmComponentMargin(0, 0, 0, DefaultMargins.Medium);

  onTabClick(tab: ITab<T>) {
    this.tabs.forEach(item => item.active = false);
    tab.active = true;
    this.onTabChange.emit(tab.value);
  }
}
