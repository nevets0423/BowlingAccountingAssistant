import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, debounceTime, skip, Subscription } from 'rxjs';
import { GridComponentDebounceTime } from '../grid-component-debounce-time';

@Component({
  selector: 'app-numeric-array-input-cell-renderer',
  template: `
    <input type="number" name="points" step="1" [min]="0" [(ngModel)]="value" (ngModelChange)="onChange(value)" [style.width.px]="width">
  `,
  styles: [
  ]
})
export class NumericArrayInputCellRendererComponent implements OnInit {
  private _params: any;
  private _debounceAbleValue: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _subscribtion: Subscription|undefined = undefined;
  private _index: number = 0;
  public width: number = 100;
  public value: number = 0;

  constructor(private _debounceTime: GridComponentDebounceTime){}

  ngOnInit(): void {
  }

  agInit(params: any): void {
    this._params = params;
    this.width = this._params.width || 100;
    this._index = this._params.index || 0;
    this.value = this._params.data[this._params.column.colId].length < this._index ? 0 : this._params.data[this._params.column.colId][this._index];
    if(this.value == undefined){
      this.value = 0
    }

    this._debounceAbleValue.next(this.value);

    if(this._subscribtion){
      this._subscribtion.unsubscribe();
    }

    this._subscribtion = this._debounceAbleValue.pipe(skip(1), debounceTime(this._debounceTime.MilliSeconds)).subscribe((value: number) => { 
      this._params.api.refreshCells();
      this.CallOnChanged(value);
    });
  }

  refresh(params: any): boolean {
    return false;
  }

  onChange(value: number){
    if(value < 0){
      value = 0;
    }

    while(this._params.node.data[this._params.column.colId].length < this._index + 1){
      this._params.node.data[this._params.column.colId].push(0);
    }

    this._params.node.data[this._params.column.colId][this._index] = value;
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
