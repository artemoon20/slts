import { Directive, Input, TemplateRef } from '@angular/core';

export interface ColumnConfig {
  key: string;
  title: string;
  width?: string;
  template: TemplateRef<any>;
}

@Directive({
  selector: 'ng-template[appColumn]'
})
export class ColumnDirective {
  @Input() key!: string;
  @Input() title!: string;
  @Input() width?: string;

  constructor(public template: TemplateRef<any>) {}
}
