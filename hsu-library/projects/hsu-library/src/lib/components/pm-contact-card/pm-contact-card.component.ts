import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Icon, IconSize } from '../pm-icon/pm-icon.shared'
import {
  contactCardContacts,
  contactCardLocalisation,
  IContactCardContacts,
  IContactCardContact,
  IContactCardLocalisation,
  IContactCardEvent,
  IContactCardLink,
} from './pm-contact-card.shared'

@Component({
  selector: 'pm-contact-card',
  templateUrl: './pm-contact-card.component.html',
  styleUrls: ['./pm-contact-card.component.scss']
})
export class PmContactCardComponent<T> implements OnInit {
  @Input()
  contacts: IContactCardContacts = contactCardContacts;

  @Input()
  contactCardLinks: IContactCardLink<T>[] = [];

  @Input()
  localisationStrings: IContactCardLocalisation = contactCardLocalisation;

  @Output()
  onContactCardItemSelect: EventEmitter<IContactCardEvent<T>> = new EventEmitter<IContactCardEvent<T>>();

  /** @ignore */
  readonly IconSize: typeof IconSize = IconSize;

  /** @ignore */
  readonly Icon: typeof Icon = Icon;

  /** @ignore */
  protected contactCardContacts: IContactCardContact[] = [];

  /** @ignore */
  ngOnInit() {
    this.contactCardContacts = [
      {
        text: this.contacts.emailAddress,
        href: 'mailto:' + this.contacts.emailAddress,
        icon: Icon.MAIL,
      },
      {
        text: this.contacts.phoneNumber,
        href: 'tel:' + this.contacts.phoneNumber,
        icon: Icon.PHONE,
      }
    ];
  }

  onContactCardLinkClicked(item: IContactCardLink<T>) {
    this.onContactCardItemSelect.emit({
      item: item
    });
  }
}
