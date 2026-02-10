import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
  signal,
  Signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import { ColumnConfig, ColumnDirective } from '../../shared/directives/column.directive';
import { LoaderComponent } from '../../shared/components/loader';

@Component({
  selector: 'app-table',
  imports: [FontAwesomeModule, CommonModule, LoaderComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements AfterContentInit {
  constructor() {
    library.add(faEllipsisVertical);
  }

  faEllipsisVertical = faEllipsisVertical;

  @Input() contentToRender: any[] = [];
  @Input() isLoading: Signal<boolean> = signal(false);

  @ContentChildren(ColumnDirective) columnDefs!: QueryList<ColumnDirective>;
  columns: ColumnConfig[] = [];

  ngAfterContentInit() {
    this.columns = this.columnDefs.map(col => ({
      key: col.key,
      title: col.title,
      width: col.width,
      template: col.template
    }));
  }
}
