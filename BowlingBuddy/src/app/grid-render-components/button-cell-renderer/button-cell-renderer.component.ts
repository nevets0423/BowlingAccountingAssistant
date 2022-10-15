import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-button-cell-rendere',
  template: `
    <button >New League</button>
  `,
  styles: [
  ]
})
export class ButtonCellRendereComponent implements ICellRendererAngularComp {

  constructor() { }
  
  agInit(params: ICellRendererParams<any, any>): void {
    throw new Error('Method not implemented.');
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    throw new Error('Method not implemented.');
  }

}
