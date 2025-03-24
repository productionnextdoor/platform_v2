import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {
  Icon,
  IconSize
} from '../pm-icon/pm-icon.shared';
import {
  ButtonType,
  IconPosition
} from '../pm-button/pm-button.component';
import {IUploadFiles} from './pm-upload.shared';

@Component({
  selector: 'pm-upload',
  templateUrl: './pm-upload.component.html',
  styleUrls: ['./pm-upload.component.scss']
})

export class PmUploadComponent implements AfterViewInit {

  @Input()
  uploadText: string = '';

  @Input()
  uploadTextLabel: string = '';

  @Input()
  fileTag: string = '';

  @Input()
  uploadId: string = this.uploadText;

  @Input()
  uploadLabel: string = '';

  @Input()
  required: boolean = false;

  @Input()
  active: boolean = false;

  @Input()
  hovered: boolean = false;

  @Input()
  disabled: boolean = false;

  @Output()
  onFilesSelected: EventEmitter<IUploadFiles> = new EventEmitter<IUploadFiles>();

  /** @ignore */
  readonly Icon: typeof Icon = Icon;

  /** @ignore */
  readonly IconSize: typeof IconSize = IconSize

  /** @ignore */
  readonly IconPosition: typeof IconPosition = IconPosition;

  /** @ignore */
  readonly ButtonType: typeof ButtonType = ButtonType;

  /** @ignore */
  @ViewChild('label', {
    static: true
  }) labelElement!: ElementRef;

  /** @ignore */
  @ViewChild('urlLabel', {
    static: true
  }) labelUrlElement!: ElementRef;

  // This is a standard response from file input change event that gives us access to files.
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  onFileInputChange(event: any) {
    this.onFilesSelected.emit({
      files: event.target.files,
      uploadId: this.uploadId
    })
  }

  /** @ignore */
  ngAfterViewInit(): void {

    const labelElement:HTMLElement = this.labelElement?.nativeElement;
    if (!labelElement) {
      return;
    }

    this.labelElement.nativeElement.innerHTML = this.uploadText.replace(
      '{0}',
      this.labelUrlElement.nativeElement.innerHTML
    )
  }
}
