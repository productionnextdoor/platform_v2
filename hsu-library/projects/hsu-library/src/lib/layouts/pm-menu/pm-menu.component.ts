import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { IMenuItem, IMenuSelectEvent } from './pm-menu.shared';
import { IconSize } from '../../components/pm-icon/pm-icon.shared';
import {
  IContactCardContacts,
  IContactCardLocalisation,
  contactCardContacts,
  contactCardLocalisation,
  IContactCardLink,
  IContactCardEvent
} from '../../components/pm-contact-card/pm-contact-card.shared';

@Component({
  selector: 'pm-menu',
  templateUrl: './pm-menu.component.html',
  styleUrls: ['./pm-menu.component.scss']
})
export class PmMenuComponent<T> {
  @Input()
  activeMenuId: number = 0;

  @Input()
  menuItems: IMenuItem<T>[] = [];

  @Input()
  contactCardLinks: IContactCardLink<T>[] = [];

  @Input()
  contactCardContacts: IContactCardContacts = contactCardContacts

  @Input()
  contactCardLocalisation: IContactCardLocalisation = contactCardLocalisation

  @Output()
  onSelectMenuItem: EventEmitter<IMenuSelectEvent> = new EventEmitter<IMenuSelectEvent>();

  @Output()
  onSelectContactCardItem: EventEmitter<IContactCardEvent<T>> = new EventEmitter<IContactCardEvent<T>>();

  /** @ignore */
  itemClicked(item: IMenuItem<T>) {
    this.onSelectMenuItem.emit({
      activeId: item.menuId
    });
  }

  /** @ignore */
  protected readonly EIconSize: typeof IconSize = IconSize;
}
