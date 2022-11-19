import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular'

@Component({
  selector: 'app-check-box-cell-renderer',
  template: `
  <label class="checkbox">
    <mat-checkbox type="checkbox" [(ngModel)]="state" (ngModelChange)="onChange(state)"> </mat-checkbox>
  </label>
  `,
  styles: [
  ]
})
export class CheckBoxCellRendererComponent implements ICellRendererAngularComp {
  private params: any;
  public state: boolean = false;

  agInit(params: any): void {
    this.params = params;
    this.state = this.params.data[this.params.column.colId] || false;
  }

  refresh(params: any): boolean {
    return false;
  }

  onChange(value: any){
    this.params.node.data[this.params.column.colId] = value;
    if (this.params.onChange instanceof Function) {
      const params = {
        value: value,
        rowData: this.params.node.data
      }

      if(this.params['onChange']){
        this.params.onChange(params);
      }
    }
  }
}
