import {
  Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef
} from '@angular/core';
import { IComponentMargin, PmComponentMargin } from '../../utils/pm-component-margin';
import { BannerType } from '../../components/pm-banner/pm-banner.shared';
import { TextType } from '../../components/pm-text/pm-text.shared';
import { EPmInputType } from '../../components/pm-input/pm-input.component';
import { Icon } from '../../components/pm-icon/pm-icon.shared';
import { DefaultMargins } from '../../utils/pm-component-margin';
import {
  IFileNameByCategory, IFileUploadLocalisations, FileCategory, uploadLocalisations
} from './pm-file-upload.shared';


@Component({
  selector: 'pm-file-upload',
  templateUrl: './pm-file-upload.component.html',
  styleUrls: ['./pm-file-upload.component.scss']
})

export class PmProductFileUploadComponent implements OnInit {
    protected readonly BannerType: typeof BannerType = BannerType;
    protected readonly TextType: typeof TextType = TextType;
    protected readonly EPmInputType: typeof EPmInputType = EPmInputType;
    protected readonly DefaultMargins: typeof DefaultMargins = DefaultMargins;
    protected readonly Icon: typeof Icon = Icon;

    @Input()
    public value: string = '';

    @Input()
    public sharepointLink: string = '';

    @Input()
    public productDescription: string = '';

    @Input()
    public fileData: IFileNameByCategory[] = [];

    @Input()
    public localisations: IFileUploadLocalisations = uploadLocalisations;

    @Input()
    public isAdminView: boolean = false;

    @Output()
    public sharepointLinkChange: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    public productDescriptionChange: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    public onFileDelete: EventEmitter<number> = new EventEmitter<number>();

    @ContentChildren(TemplateRef)
    protected uploadTemplates: QueryList<TemplateRef<Element>> = new QueryList<TemplateRef<Element>>();

    protected visibleNote: boolean = true;

    protected titleMargin: IComponentMargin = new PmComponentMargin(DefaultMargins.Large, 0, DefaultMargins.XSmall, 0);

    protected titleMarginWithoutDescription: PmComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.Medium, 0);

    protected descriptionMargin: IComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.XLarge, 0);

    protected readonly categories: string[] = Object.keys(FileCategory).filter((item) => isNaN(Number(item)));

    /** @ignore */
    ngOnInit() {
      this.visibleNote = !this.isAdminView;
    }

    protected onCLoseBanner(): void {
      this.visibleNote = false;
    }

    protected onFileTagClose(file: IFileNameByCategory) : void {
      this.onFileDelete.emit(file.fileId);
    }
}
