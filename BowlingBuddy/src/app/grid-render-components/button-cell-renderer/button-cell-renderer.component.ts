import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { buttonRendererParams } from './button-renderer-params';

@Component({
  selector: 'app-button-cell-rendere',
  template: `
    <button mat-raised-button class='formatedButton' (click)="onClick()">{{rendererParameters.Name}}</button>
  `,
  styleUrls: ['./button-cell-renderer.component.scss']
})
export class ButtonCellRendereComponent implements ICellRendererAngularComp {
  private _params: ICellRendererParams<any, any> | undefined;
  rendererParameters: buttonRendererParams = {
    Name: "",
    onClick: function (params: ICellRendererParams<any, any> | undefined): void {}
  };

  constructor() { }
  
  agInit(params: ICellRendererParams<any, any>): void {
    this._params = params;
    this.rendererParameters = params.colDef?.cellRendererParams;
  }
  
  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }

  onClick(){
    if (this.rendererParameters?.onClick instanceof Function) {
      this.rendererParameters?.onClick(this._params);
    }
  }

}
