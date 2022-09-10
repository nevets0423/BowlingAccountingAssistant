import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { skip } from 'rxjs/internal/operators/skip';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-numeric-input-cell-renderer',
  template: `
    <input type="number" name="points" step="1" [min]="min" [max]="max" [(ngModel)]="value" (ngModelChange)="onChange(value)" [style.width.px]="width">
  `,
  styles: [
  ]
})
export class NumericInputCellRendererComponent implements ICellRendererAngularComp {
  private _params: any;
  private _debounceAbleValue: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _subscribtion: Subscription|undefined = undefined;
  public width: number = 100;
  public value: number = 0;
  public min: number = 0;
  public max: number = 100;
  
  agInit(params: any): void {
    this._params = params;
    this.width = this._params.width || 100;
    this.min = (this._params?.min != undefined) ? this._params?.min : this._params.data[this._params.minColumnName] ||  0;
    this.max = this._params?.max || this._params.data[this._params.maxColumnName] ||  100;
    this.value = this._params.data[this._params.column.colId] || 0;
    this._debounceAbleValue.next(this.value);

    if(this._subscribtion){
      this._subscribtion.unsubscribe();
    }

    this._subscribtion = this._debounceAbleValue.pipe(skip(1), debounceTime(500)).subscribe((value: number) => { 
      this._params.api.refreshCells();
      this.CallOnChanged(value);
    });
  }

  refresh(params: any): boolean {
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

    this._params.node.data[this._params.column.colId] = value;
    this._debounceAbleValue.next(value);
  }

  private CallOnChanged(value: number){
    if (this._params.onChange instanceof Function) {
      const params = {
        value: value,
        rowData: this._params.node.data
      }

      if(this._params['onChange']){
        this._params.onChange(params);
      }
    }
  }
}
