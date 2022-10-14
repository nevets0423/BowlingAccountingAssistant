import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { BehaviorSubject, debounceTime, skip, Subscription } from 'rxjs';
import { InputCellRedererParameters } from './input-cell-rederer-parameters';

@Component({
  selector: 'app-generic-input-cell-renderer',
  template: `
    {{label}}<input type="number" step="1" [min]="min" [max]="max" [(ngModel)]="value" (ngModelChange)="onChange(value)" [style.width.px]="width" [readonly]="readOnly">
  `,
  styles: [
  ]
})
export class GenericInputCellRendererComponent implements ICellRendererAngularComp {
  private _params: ICellRendererParams<any, any> | undefined;
  private _redererParameters: InputCellRedererParameters | undefined;
  private _debounceAbleValue: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _subscribtion: Subscription|undefined = undefined;
  
  public value: number = 0;
  public width: number = 100;
  public min: number = Number.NEGATIVE_INFINITY;
  public max: number = Number.POSITIVE_INFINITY;
  public readOnly: boolean = false;
  public label: string = '';

  constructor() { }

  agInit(params: ICellRendererParams<any, any>): void {
    this._params = params;
    this._redererParameters = params.colDef?.cellRendererParams;

    this.value = this._redererParameters?.getValue(params) || this.value;
 
    this.readOnly = this._redererParameters?.readonly || this.readOnly;
    this.label = this._redererParameters?.label || this.label;
    this.width = this._redererParameters?.width || this.width;
    if(this._redererParameters?.getMin){
      this.min = this._redererParameters.getMin(params);
    }
    if(this._redererParameters?.getMax){
      this.max = this._redererParameters.getMax(params);
    }

    if(this._subscribtion){
      this._subscribtion.unsubscribe();
    }

    this._subscribtion = this._debounceAbleValue.pipe(skip(1), debounceTime(800)).subscribe((value: number) => { 
      this._params?.api.refreshCells();
      this.CallOnChanged(value);
    });
  }

  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }

  onChange(value: number){
    if(value > this.max){
      this.value = this.max;
      value = this.max;
    }

    if(value < this.min){
      this.value = this.min;
      value = this.min;
    }

    if(this._params && this._redererParameters?.updateData){
      this._params.node.data = this._redererParameters.updateData(value, this._params?.node.data);
    }

    this._debounceAbleValue.next(value);
  }

  private CallOnChanged(value: number){
    if (this._redererParameters?.onChange instanceof Function) {
      this._redererParameters?.onChange(value, this._params?.node.data);
    }
  }
}
